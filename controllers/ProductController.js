const ProductModel = require("../models/ProductModel");

module.exports = {
  create: async function (req, res) {
    try {
      let product = await ProductModel(req.body).save();
      return res.send(product);
    } catch (error) {
      return res
        .status(500)
        .send({ message: error || "Error creating product" });
    }
  },
  list: async function (req, res) {
    try {
      let products = await ProductModel.find()
        .populate({ path: "category", select: "name email" })
        .lean();
      return res.send(products);
    } catch (error) {
      return res
        .status(500)
        .send({ message: error || "Error listing products" });
    }
  },

  delete: async function (req, res) {
    try {
      let product = await ProductModel.remove({ _id: req.params.id });
      return res.send(product);
    } catch (error) {
      return res
        .status(500)
        .send({ message: error || "Error deleting product" });
    }
  },
};
