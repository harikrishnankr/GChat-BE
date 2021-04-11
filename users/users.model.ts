import mongoose, { Model } from 'mongoose';
import { IUser } from './users.interface';

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Required"
    },
    email: {
        type: String,
        unique: true
    },
    userId: {
        type: String,
        unique: true
    },
    onlineStatus: {
        type: Number
    }
}, {
    timestamps: true, // Adds CreatedAt and UpdatedAt
    collection: "users", // Collection name
});

export const UserModel: Model<IUser> = mongoose.model("User", UserSchema);
