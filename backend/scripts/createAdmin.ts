import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User";
import bcrypt from "bcryptjs";

dotenv.config();

async function createAdmin() {
  try {
    // Connect to database
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log("Connected to database");

    const adminEmail = process.env.ADMIN_EMAIL || "admin@admin.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin1234567890";

    // Check if admin exists
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin already exists:", adminEmail);
      console.log("Role:", existingAdmin.role);
      process.exit(0);
    }

    // Create admin
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const admin = await User.create({
      fullname: "Admin User",
      email: adminEmail,
      password: hashedPassword,
      role: "Admin",
      bio: "System Administrator",
    });

    console.log("✅ Admin created successfully!");
    console.log("Email:", adminEmail);
    console.log("Password:", adminPassword);
    console.log("Please use these credentials to login");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();
