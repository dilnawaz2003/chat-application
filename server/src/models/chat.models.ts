import mongoose, { Model } from "mongoose";
import { ref } from "process";

export interface IChat {
  name: string;
  groupChat: boolean;
  creator: mongoose.Schema.Types.ObjectId;
  members: mongoose.Schema.Types.ObjectId[];
}

const ChatSchema = new mongoose.Schema<IChat>(
  {
    name: {
      type: String,
      required: true,
    },
    groupChat: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ChatModel: Model<IChat> = mongoose.model<IChat>("Chat", ChatSchema);

export default ChatModel;
