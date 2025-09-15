import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profileImg: { type: String, default: "" },
        isAdmin: { type: Boolean, default: false },
        favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
        watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;