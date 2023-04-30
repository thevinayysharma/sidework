import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      default: "",
    },
    comments: {
      type: String,
      default: "",
    },
    dob: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    files: [
      {
        filename: String,
        contentType: String,
      }
    ],
    amount: {
      type: Number,
      required: true,
    },
    work: {
      type: String,
      required: true,
    },
    pan: {
      type: String,
      trim: true,
    },    
    paymentStatus: {
      type: String,
      default: "pending",
    },
    paymentAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);


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

//  files: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'File'
//   }],