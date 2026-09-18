import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Username already taken"],
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: [true, "Account already exist with this email address."],
      trim: true,
      required: true,
      lowercase: true,
    },
    phoneNo: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    password: {
      type: String,
      minlength: [6, "Password should be atleast 6 characters long"],
      required: true,
      trim: true,
    },
    tokens: {
      type: Number,
      default: 3,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("UserModel", userSchema);
export default UserModel;
