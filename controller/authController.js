import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('login data', req.body);

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found. Please register first.",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password.",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET || "123456",
            { expiresIn: "3h" }
        );

        res.status(200).json({
            success: true,
            message: "Login successful!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Error while logging in:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { name, department, yearOfPassing, email, password, skills } = req.body;
        const resume = req.file;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            department,
            yearOfPassing,
            email,
            password: hashedPassword,
            skills,
            role: "student",
            resumePath: resume?.path,
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully!",
            user: newUser,
        });
    } catch (error) {
        console.error("Error while registering user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
