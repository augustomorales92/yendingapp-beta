import mongoose, { Schema, Document, Model, models } from "mongoose";

// Define an interface representing a document in MongoDB.
export interface IPreviaComments extends Document {
    to_previa_id: string;
    from_user_id: string;
    comment: string;
}

// Create a Schema corresponding to the document interface.
const PreviaCommentsSchema: Schema<IPreviaComments> = new Schema(
    {
        to_previa_id: {
            type: String,
            required: true
        },
        from_user_id: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

// Create a Model.
const PreviaComments: Model<IPreviaComments> = models.PreviaComments || mongoose.model<IPreviaComments>("PreviaComments", PreviaCommentsSchema);

export default PreviaComments;
