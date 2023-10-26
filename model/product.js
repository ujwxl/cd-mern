const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const productSchema = new Schema({
  title: { type: "String", required: true },
  description: { type: "String", required: false },
  price: { type: "String", min: [0, "wrong minimum price"] },
  discountPercentage: {
    type: "String",
    require: true,
    min: [0, "wrong min Discount"],
    max: [50, "wrong max Discount"],
  },
  rating: {
    type: "Number",
    require: false,
    min: [0, "wrong min rating"],
    max: [5, "wrong max rating"],
    default: 0
  },
  stock: "Number",
  brand: { type: "String", required: true },
  category: { type: "String", required: true },
  thumbnail: { type: "String", required: true },
  images: ["String"],
});
console.log("productSchema: " + productSchema);

exports.Product = mongoose.model("Product", productSchema);
