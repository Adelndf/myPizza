import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    prices: {
      type: [Number],
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 150,
    },
    extraOpts: {
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
