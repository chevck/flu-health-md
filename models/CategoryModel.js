const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const CategoryModel = new Schema({
  name: String,
  createdon: { type: Date, default: moment().format() },
});

module.exports = mongoose.model("drug_categories", CategoryModel);
