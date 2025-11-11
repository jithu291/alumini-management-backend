import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/userSchema.js";

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to MongoDB");

        const existingAdmin = await User.findOne({ email: "admin@gmail.com" });
        if (existingAdmin) {
            console.log("Admin already exists!");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash("admin@123", 10);

        const adminUser = new User({
            name: "Super Admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "superadmin",
        });

        await adminUser.save();

        console.log("Super Admin created successfully!");
        console.log(adminUser);

        process.exit(0);
    } catch (error) {
        console.error("Error creating Super Admin:", error);
        process.exit(1);
    }
};

createAdmin();
