const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const ProductModel = new Schema({
  name: String,
  quantity: Number,
  createdon: { type: Date, default: moment().format() },
  expirydate: Date,
  purchasedate: Date,
  category: { type: Schema.Types.ObjectId, ref: "drug_categories" },
  cost: Number,
  sellingprice: Number,
});

module.exports = mongoose.model("products", ProductModel);
