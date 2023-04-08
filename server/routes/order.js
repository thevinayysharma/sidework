import express from "express";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { MongoClient } from "mongodb";

const url = process.env.MONGO_URL || "mongodb://localhost:27017/computerzonedb";
const router = express.Router();

// DATA IMPORTS
import Order from "../models/Order.js";

// Configure multer to store files in memory
// const storage = multer.memoryStorage();

 
const client = new MongoClient(url);
client.connect((err) => {
  if (err) {
    console.log(err.message);
    process.exit(1);
  }
});


//Create a storage object with a given configuration
const bucket = new GridFsStorage({
  url: url,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-docszone-${file.originalname}`;
      return filename;
    }

    return {
      filename: file.originalname,
    };
  },
});


const upload = multer({ storage: bucket,  limits: {
  fileSize: 5 * 1024 * 1024 // 5MB in bytes
}}).array(
  "files",
  3
);

//creating new_order
router.post("/orders/create-order", upload, (req, res) => {
  const order = new Order({
    customerId: req.body.clientId,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    middleName: req.body?.middleName ?? "",
    age: req.body.age,
    comments: req.body?.comments ?? "",
    dob: req.body.dob,
    gender: req.body.gender,
    email: req.body.email,
    phone: req.body.phone,
    files: req?.files.map((file) => file.id),
    amount: req.body.amount,
    work: req.body.work,
  });

  order.paymentStatus = "pending";
  order.paymentAmount = "";

  // Store the file in GridFSBucket
  req.files.forEach((file) => {
    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);
    const uploadStream = bucket.openUploadStream(file.originalname);
    const id = uploadStream.id;
    readableStream.pipe(uploadStream);
    order.files.push(id);
  });

  order
    .save()
    .then((savedOrder) => {
      res.json(savedOrder);
    })
    .catch((err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log("Multer_Error_occured:", err);
      } else if (err) {
        // An unknown error occurred when uploading.
        console.log(err.message);
      }
    });
});

// Get single order
router.get("/orders/:customerId", (req, res) => {
  Order.find({ customerId: req.query.clientId })
    .populate("files")
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Server error");
    });
});

//get all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customerId")
      .populate("files");
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// Delete order by ID
router.delete("/orders/:clientId", async (req, res) => {
  const customerId = req.headers.clientId;

  try {
    const order = await Order.findOne({ customerId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const paymentAmount = order.paymentAmount; // store payment amount
     // Delete the order by customerId
     await Order.findOneAndDelete({ customerId });
    // Update total sales by subtracting the payment amount of the deleted order
    await Sales.updateOne({}, { $inc: { totalSales: -paymentAmount } });

    res.json({ message: "Order and its related details deleted successfully" });
    
  
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get total sales
router.get("/orders/sales", async (req, res) =>   {
  try {
    const result = await orders.aggregate([
      { $match: { paymentStatus: true } },
      { $group: { _id: null, totalSales: { $sum: "$paymentAmount" } } },
    ]);
    const totalSales = result[0].totalSales;
    const salesOrder = new Order({
      customerId: "sales",
      paymentAmount: totalSales,
      paymentStatus: true,
    });
    await salesOrder.save();
    res.json(totalSales);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
