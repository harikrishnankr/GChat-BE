import mongoose, { Model } from 'mongoose';
import { IMessage, IRoom } from './chat.interface';

export const RoomSchema = new mongoose.Schema({
    messageId: {
        type: String,
        unique: true
    },
    from: {
        type: String,
        required: "Required"
    },
    isGroup: {
        type: Boolean,
        required: "Required"
    },
    to: {
        type: String,
        required: "Required"
    },
    message: {
        type: String,
        required: "Required"
    }
}, {
    timestamps: true, // Adds CreatedAt and UpdatedAt
    collection: "rooms", // Collection name
});

export const MessageSchema = new mongoose.Schema({
    fromId: {
        type: String,
        required: true
    },
    toId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    }
}, {
    timestamps: true, // Adds CreatedAt and UpdatedAt
    collection: "messages", // Collection name
});

export const RoomModel: Model<IRoom> = mongoose.model("Room", RoomSchema);
export const MessageModel: Model<IMessage> = mongoose.model("Message", MessageSchema);
