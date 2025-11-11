import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false,
            trim: true,
        },
        department: {
            type: String,
            required: false,
        },
        yearOfPassing: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        skills: {
            type: String,
            required: false,
        },
        role: {
            type: String,
            default: "student",
        },
        resumePath: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
