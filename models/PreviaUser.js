import mongoose, { Schema, models } from "mongoose";

const PreviaUserSchema = new Schema(
    {
      // id de la previa a la que se esta uniendo
      previa_id: {
        type: String,
      },
      // Id del usuario que solicita la union 
      user_id: {
        type: String,
      },
      attendands: {
        type: Number, 
      },
      intentions: {
        type: String, 
      },
      photos: [{ type: String }],
      status: {
        type: String,
        default: 'sent',
      }

    },
    { timestamps: true }
  );

const PreviaUser = models.PreviaUser || mongoose.model("PreviaUser", PreviaUserSchema);
export default PreviaUser;