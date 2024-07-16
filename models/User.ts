import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
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

const User = models.User || mongoose.model("User", userSchema);
export default User;