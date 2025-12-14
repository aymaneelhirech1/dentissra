
import mongoose from "mongoose";

 interface IInvoice {
  patient: mongoose.Schema.Types.ObjectId;
  items: { description: string; price: number; qty: number }[];
  total: number;
  status: "مدفوع" | "غير مدفوع" | "جزئي";
  issuedAt: Date;
  paidAt?: Date;
}

const invoiceSchema = new mongoose.Schema<IInvoice>(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    items: [{ description: String, price: Number, qty: Number }],
    total: Number,
    status: {
      type: String,
      enum: ["مدفوع", "غير مدفوع", "جزئي"],
      default: "غير مدفوع",
    },
    issuedAt: { type: Date, default: Date.now },
    paidAt: Date,
  },
  { timestamps: true }
);

const Invoice = mongoose.model<IInvoice>("Invoice", invoiceSchema);
export default Invoice
