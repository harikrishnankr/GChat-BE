import mongoose, { Model, Document } from 'mongoose';
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
    }
});

export const UserModel: Model<IUser> = mongoose.model("User", UserSchema);
