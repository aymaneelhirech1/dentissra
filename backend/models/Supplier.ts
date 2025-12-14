import mongoose from "mongoose";

interface ISupplier {
  name: string;
  phone?: number;
  email: string;
  address: string;
  activities?: string;
}

const supplierSchema = new mongoose.Schema<ISupplier>(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    activities: {
      type: String,
    },
  },
  { timestamps: true }
);

const Supplier = mongoose.model("Supplier", supplierSchema);
export default Supplier;
