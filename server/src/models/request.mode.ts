import mongoose from "mongoose";

export type RequestStatusType = "pending" | "accepted" | "rejected";

export interface IRequest {
  status: RequestStatusType;
  sender: mongoose.Schema.Types.ObjectId;
  reciever: mongoose.Schema.Types.ObjectId;
}

const RequestSchema = new mongoose.Schema<IRequest>(
  {
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      required: true,
      default: "pending",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RequestModel = mongoose.model<IRequest>("Request", RequestSchema);

export default RequestModel;
