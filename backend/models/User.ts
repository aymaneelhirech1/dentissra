import mongoose from "mongoose";

 interface IUser {
  fullname: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  cover: string;
  bio: string;
  specialization?: string;
  permissions?: {
    patients?: boolean;
    appointments?: boolean;
    invoices?: boolean;
    medicalFiles?: boolean;
    prescriptions?: boolean;
    inventory?: boolean;
    suppliers?: boolean;
    statistics?: boolean;
  };
}

const userSchema = new mongoose.Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    role: {
      type: String,
      enum: ["Admin", "Dentist", "Receptionist","user"],
      default: "user",
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dgagbheuj/image/upload/v1763194734/avatar-default-image_yc4xy4.jpg",
    },
    cover: {
      type: String,
      default:
        "https://res.cloudinary.com/dgagbheuj/image/upload/v1763194811/cover-default-image_uunwq6.jpg",
    },
    bio: {
      type: String,
      default: "Hello User!",
    },
    specialization: {
      type: String,
    },
    permissions: {
      type: Object,
      default: {
        patients: true,
        appointments: true,
        invoices: true,
        medicalFiles: true,
        prescriptions: true,
        inventory: true,
        suppliers: true,
        statistics: true,
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
export default User;