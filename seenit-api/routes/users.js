import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
dotenv.config();

const login = async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    if (usernameOrEmail && password) {
        try {
            const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
            if (!user) {
                return res.status(401).json({ success: false, message: "Invalid credentials" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ success: false, message: "Invalid credentials" });
            }

            const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "7d" });
            console.log(token)

            res.json({ success: true, message: "Login successful", token, user: { username: user.username, id: user.id } });
        } catch (err) {
            res.status(500).json({ success: false, message: "Server error", error: err });
        }
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
};

const register = async (req, res) => {
    const { username, email, password, isAdmin } = req.body;

    if (username && email && password) {
        try {
            console.log(username, email, password);
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                return res.status(400).json({ message: "Username or email already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, email, password: hashedPassword, isAdmin: isAdmin });
            console.log(newUser)
            await newUser.save();
            res.json({ success: true, message: "Registration successful", user: { username, email } });
        } catch (err) {
            res.status(500).json({ success: false, message: "Server error", error: err });
        }
    } else {
        res.status(400).json({ success: false, message: "All fields are required" });
    }
};

const getUserData = async (req, res) => {
    const { id } = req.params;

    if (id) {
        try {
            const user = await User.findById(id);
            console.log(user)
            const userData = {
                id: user.id,
                username: user.username,
                email: user.email,
                profileImg: user.profileImg,
                isAdmin: user.isAdmin,
                favorites: user.favorites,
                watchList: user.watchlist,
                reviews: user.reviews
            }
            console.log(userData)
            if (user) {
                return res.json({ message: "User found", user: userData });
            }
            return res.status(400).json({ message: "User not found" })
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    }
    else {
        res.status(400).json({ message: "Id is required" })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users && users.length > 0) {
            return res.json({ message: "Users found", users });
        }
        return res.status(400).json({ message: "No user data." })
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
}

router.post("/login", login);
router.post("/register", register);
router.get("/:id", getUserData);
router.get("/", getAllUsers)

export default router;
