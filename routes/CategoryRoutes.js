const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");

router.post("/", CategoryController.create);

router.get("/", CategoryController.list);

router.delete("/:id", CategoryController.delete);

module.exports = router;
