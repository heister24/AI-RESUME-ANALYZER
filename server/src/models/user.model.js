import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Username already taken"],
      required: true,
    },
    email: {
      type: String,
      unique: [true, "Account already exist with this email address."],
      trim: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: [6, "Password should be atleast 6 characters long"],
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("UserModel", userSchema);
export default UserModel;
