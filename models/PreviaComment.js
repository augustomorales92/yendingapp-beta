import mongoose, { Schema, models } from "mongoose";

const PreviaCommentsSchema = new Schema(
    {
      to_previa_id: {
        type: String,
      },
      from_user_id: {
        type: String,
      },
      comment: {
        type: String,
    },
    },
    { timestamps: true }
  );

const PreviaComments = models.PreviaComments || mongoose.model("PreviaComments", PreviaCommentsSchema);
export default PreviaComments;