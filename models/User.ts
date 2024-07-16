import mongoose, { Schema, models, Model } from "mongoose";

export interface IUser extends Document {
    user_id: string;
    name?: string;
    email: string;
    password: string;
    gender_identity?: GenderIdentity;
    previas_interest?: PreviasInterest;
    show_interest?: boolean;
    url_img?: string;
    previas_created?: string[];
    previas_requests?: string[];
    age?: number;
    dob_day?: string;
    dob_month?: string;
    dob_year?: string;
    about?: string;
}

// Define the possible values for gender_identity and previas_interest
enum GenderIdentity {
    Male = "Male",
    Female = "Female",
    NonBinary = "Non-binary",
    Other = "Other"
}

enum PreviasInterest {
    Sports = "Sports",
    Music = "Music",
    Reading = "Reading",
    Travel = "Travel",
    Other = "Other"
}

const userSchema: Schema<IUser> = new Schema(
    {
        user_id: {
            type: String,
            required: true,
            unique: true,
            default: null,
        },
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        gender_identity:{
            type: String, 
        }, 
        previas_interest: {
            type: String,
        },
        show_interest:{
            type:Boolean, 
        },
        url_img: {
            type: String,
        },
        previas_created: {
            type: [String],  
            default: []     
        },
        previas_requests: {
            type: [String],  
            default: []     
        },
        age: {
            type: Number,
        },
        dob_day: {
            type: String,
        },
        dob_month: {
            type: String,
        },
        dob_year: {
            type: String,
        },
        about: {
            type: String,
        }
    },
    { timestamps: true }
);

const User: Model<IUser> = models.User || mongoose.model<IUser>("User", userSchema);
export default User;
