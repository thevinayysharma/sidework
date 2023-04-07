import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: String,
    lastName: String,
    middleName: String,
    age: Number,
    comments: String,
    dob: Number,
    gender: Number,
    email: String,
    phone: Number,
    files: {
      data: Buffer,
      contentType: String,
    },
    amount: Number,
    clientId: String,
    work: String,
    paymentStatus: {
      type: String,
      default: "pending",
    },
    paymentAmount: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

//todo add timestamps   https://mongoosejs.com/docs/timestamps.html

const Order = mongoose.model("Order", formSchema);
export default Order;

//delted mongo _id and _v
// formSchema.set("toJSON", {
//   transform: (document, returnedObj) => {
//     returnedObj.id = returnedObj._id.toString();
//     delete returnedObj._id;
//     delete returnedObj.__v;
//   },
// });

// const mongoose = require("mongoose");

// const orderSchema = mongoose.Schema(
//     {
//       user: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: false,
//         ref: "User",
//       },
//       orderItems: [
//         {
//           name: { type: String, required: true },
//           amount: { type: Number, required: true },
//           price: { type: Number, required: true },
//           product: {
//             type: mongoose.Schema.Types.ObjectId,
//             required: true,
//             ref: "Product",
//           },
//         },
//       ],
//       shippingAddress: {
//         address: { type: String, required: true },
//         city: { type: String, required: true },
//         postalCode: { type: String, required: true },
//         country: { type: String, required: true },
//       },
//       paymentMethod: {
//         type: String,
//         required: true,
//       },
//       paymentResult: {
//         id: { type: String },
//         status: { type: String },
//         update_time: { type: String },
//         email_address: { type: String },
//       },
//       shippingPrice: {
//         type: Number,
//         required: true,
//         default: 0.0,
//       },
//       totalPrice: {
//         type: Number,
//         required: true,
//         default: 0.0,
//       },
//       isPaid: {
//         type: Boolean,
//         required: true,
//         default: false,
//       },
//       paidAt: {
//         type: Date,
//       },
//       isDelivered: {
//         type: Boolean,
//         required: true,
//         default: false,
//       },
//       deliveredAt: {
//         type: Date,
//       },
//     },
//     {
//       timestamps: true,
//     }
//   );

//   module.exports = mongoose.model("Order", orderSchema);
