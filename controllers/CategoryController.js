const CategoryModel = require("../models/CategoryModel");

module.exports = {
  create: async function (req, res) {
    try {
      const { name } = req.body;
      let category = await CategoryModel.findOne({ name });
      console.log({ category });
      if (category) {
        return res.status(400).json({
          message:
            "Category already exists. Please create a new one with different characters",
        });
      }
      category = await CategoryModel(req.body).save();
      return res.status(200).send(category);
    } catch (error) {
      return res
        .status(500)
        .send({ message: error || "Error creating category" });
    }
  },
  list: async function (req, res) {
    try {
      let categories = await CategoryModel.find().lean();
      return res.send(categories);
    } catch (error) {
      return res
        .status(500)
        .send({ message: error || "Error fetching categories" });
    }
  },
  delete: async function (req, res) {
    try {
      let category = await CategoryModel.remove({ _id: req.params.id });
      return res.send({ ...category, docId: req.params.id });
    } catch (error) {
      return res
        .status(500)
        .send({ message: error || "Error deleting categories" });
    }
  },
};
