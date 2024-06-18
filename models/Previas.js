import mongoose, { Schema, models } from "mongoose";

const PreviaSchema = new Schema(
    {
      previa_id: {
        type: String,
        required: true,
        unique: true,
      },
      location: {
        type: String,
        required: true,
      },
      creator: {
        type: String, 
      },
      date:{
        type:Date, 
      },
      time: {
        type: String,
      },
      description:{
        type: String, 
      },
      img_prev_url: {
        type: String,
      },
      participants: {
        type: Number,
      }
    },
    { timestamps: true }
  );

const Previa = models.Previa || mongoose.model("Previa", PreviaSchema);
export default Previa;