import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { GridFsStorage } from "multer-gridfs-storage";
import { MongoClient } from "mongodb";
//import orderRoutes from "./routes/order.js";
import paymentRoutes from "./routes/payment.js";
import path from "path";
import Grid from "gridfs-stream";
import methodOverride from "method-override";
import crypto from "crypto";
import Order from "./models/order.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(methodOverride("_method"));

/* ROUTES */
//app.use("/order", orderRoutes);
app.use("/payment", paymentRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000; //9000 backup port
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));

/* MOGOOSE CONNECTION SETUP */
const mongoURI = "mongodb://0.0.0.0:27017/computerzonedb";
const conn = mongoose.createConnection(mongoURI);
let gfs;

conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("orders");
});


//Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "orders",
        };
        resolve(fileInfo);
      });
    });
  },
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

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

//ADMINS
/* POST: CREATE ORDER */
app.post("/orders/create", upload.array("files", 3), async (req, res) => {
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
    files: files,
  });
  order.paymentStatus = "pending";
  order.paymentAmount = 0;

  order
    .save()
    .then((savedOrder) => {
      console.log(savedOrder);
      res.status(200).json({
        message: "Details submitted successfully",
      });
    })
    .catch((err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log("Multer_Error_occured:", err);
      } else if (err) {
        res.status(500).json({
          error: error,
        });
        console.log(err.message); // An unknown error occurred when uploading.
      }
    });
});


/* GET:  ALL ORDERS */
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


/* DELETE:  SINGLE ORDER */


/* SALES:  TOTAL SALES */

//USER

/* GET:  SINGLE ORDER*/
// Get single order
app.get("/orders/:clientId", async (req, res) => {
  Order.find({ clientId: req.params.clientId })
    .populate("files")
    .then((order) => {
      res.json(order);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Server error");
    });
});