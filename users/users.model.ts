import mongoose, { Model, Document } from 'mongoose';
import { IUser } from './users.interface';

export const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: "Required"
    },
    lastName: {
        type: String,
        required: "Required"
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    userId: {
        type: String,
        unique: true
    }
});

export const UserModel: Model<IUser> = mongoose.model("User", UserSchema);
