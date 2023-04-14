import express from "express";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
const router = express.Router();
import Order from "../models/order.js";
// import { MongoClient } from "mongodb";
import Grid from "gridfs-stream";
import crypto from 'crypto';
import mongoose from "mongoose";



//const URL = "mongodb://0.0.0.0:27017/computerzonedb";
//const client = await MongoClient.connect('mongodb://0.0.0.0:27017/computerzonedb');


const mongoURI = 'mongodb://0.0.0.0:27017/computerzonedb';
const conn = mongoose.createConnection(mongoURI)
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('orders');
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true); // Accept file
  } else {
    cb(
      new Error("Only PDF, PNG, JPG, and JPEG file types are allowed."),
      false
    ); // Reject file
  }
};

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'orders'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

router.post("/orders/create", upload.array('files',3), async (req, res) => {
  let files = [];
  if (req.files && req.files.length > 0) {
    files = req.files.map((file) => ({
      filename: file.filename,
      contentType: file.contentType,
    }));
  }
  const order = new Order({
    clientId: req.body.clientId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    middleName: req.body?.middleName ?? "",
    comments: req.body?.comments ?? "",
    dob: req.body.dob,
    gender: req.body.gender,
    email: req.body.email,
    clientId: req.body.clientId,
    phone: req.body.phone,
    amount: req.body.amount,
    work: req.body.work,
    files: files 
  });
  order.paymentStatus = "pending";
  order.paymentAmount = "";

  order
    .save()
    .then((savedOrder) => {
      console.log(savedOrder);
      res.status(200).json({
        message: "Details submitted successfully",
      });;
    })
    .catch((err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log("Multer_Error_occured:", err);
      } else if (err) {
        res.status(500).json({
          error: error
        });
        console.log(err.message); // An unknown error occurred when uploading.
      }
    });
});



// Initialize Multer middleware with file filter
// const upload = multer({
//   storage,
//   fileFilter,
  // limits: {
  //   fileSize: 5 * 1024 * 1024,
  // }
// }).array('files',5);






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
    const orders = await Order.find().populate("customerId").populate("files");
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
router.get("/orders/sales", async (req, res) => {
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
