import mongoose from "mongoose";

// Create Schema
const ConsultingSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
    unique: true,
  },
  uan: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
}, { timestamps: true });

const ConsultOrder = mongoose.model("ConsultOrder", ConsultingSchema);
export default ConsultOrder;