import express from "express";
const router = express.Router();
import Razorpay from "razorpay";
import crypto from "crypto";
import { MongoClient } from "mongodb";

//instantiate razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

router.post("/payment", async (req, res) => {
  console.log(req.body);
  const { amount, clientId } = req.body;

  const options = {
    amount: (amount * 100).toString(),
    currency: "INR",
    receipt: "receipt" + Math.floor(Math.random() * 1000),
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    const orderId = response.id;
    res.json({
      orderId,
      clientId,
      amount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create order" });
  }
});

router.post("/verify-payment", async (req, res) => {      //verify payment signature
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
  const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);

  const digest = shasum.digest("hex");
  if (digest !== razorpay_signature)      // comaparing our digest with the actual signature
    return res.status(402).json({ error: "Transaction not legit!" });

  if (digest === razorpay_signature) {
    res.json({
      status: "success",          //chick got a hot pay
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } else {
    res.json({
      status: "failure",
    });
  }

  // db update | Get payment details from Razorpay
  const payment = await razorpay.payments.fetch(razorpay_payment_id);
  const paymentStatus = payment.status;
  const paymentAmount = payment.amount / 100;

  // TODO: Update the payment status in the database using the custom order ID
  async function updatePaymentStatus(clientId, paymentStatus, paymentAmount) {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URI);
      const database = client.db("computerzonedb");
      const collection = database.collection("orders");

      const result = await collection.updateOne(
        { clientId },
        { $set: { paymentStatus, paymentAmount} }
      );

      console.log(`Payment status updated: ${result.modifiedCount}`);
    } catch (error) {
      console.log("Payment status update error:", error);
      res.status(500).json({ error: "Could not update payment status" });
    } finally {
      client.close();
    }
  }
  await updatePaymentStatus(clientId, paymentStatus, paymentAmount);
});

export default router;
