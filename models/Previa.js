import mongoose, { Schema, models } from "mongoose";
const { v4: uuidv4 } = require('uuid');

const PreviaSchema = new Schema(
  {
    previa_id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
    },
    date: {
      type: Date,
    },
    startTime: {
      type: String,
    },
    participants: {
      type: Number,
    },
    pass_code: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    show_location: {
      type:Boolean, 
    },
    join_requests: {
      type: [String],
      default: []
    },
    place_details: {
      type: String,
    },
    images_previa_url: [{ type: String }],
  },
  { timestamps: true }
);

const Previa = models.Previa || mongoose.model("Previa", PreviaSchema);
export default Previa;