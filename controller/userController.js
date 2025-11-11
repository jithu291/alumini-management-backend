import User from "../models/userSchema.js";

export const getUserData = async (req, res) => {
    try {
        const users = await User.find({}, "-password");

        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: users,
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
