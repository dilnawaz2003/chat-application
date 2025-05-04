import mongoose, { Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  name: string;
  userName: string;
  bio: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
