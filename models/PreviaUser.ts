import mongoose, { Schema, Document, Model, models } from "mongoose";

// Define the possible values for the status field
enum Status {
    Sent = "sent",
    Accepted = "accepted",
    Rejected = "rejected"
}

// Define an interface representing a document in MongoDB.
export interface IPreviaUser extends Document {
    previa_id: string;
    user_id: string;
    attendands: number;
    intentions: string;
    photos: string[];
    status: Status;
}

// Create a Schema corresponding to the document interface.
const PreviaUserSchema: Schema<IPreviaUser> = new Schema(
    {
        previa_id: {
            type: String,
        },
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
            enum: Object.values(Status),
            default: Status.Sent,
        }
    },
    { timestamps: true }
);

// Create a Model.
const PreviaUser: Model<IPreviaUser> = models.PreviaUser || mongoose.model<IPreviaUser>("PreviaUser", PreviaUserSchema);

export default PreviaUser;
