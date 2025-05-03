import mongoose from "mongoose";

export interface IMessage {
  content: string;
  sender: mongoose.Schema.Types.ObjectId;
  attachment: {
    public_id: string;
    url: string;
  };
  chat: mongoose.Schema.Types.ObjectId;
}

const MessageSchmea = new mongoose.Schema<IMessage>(
  {
    content: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    attachment: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
  }
);
