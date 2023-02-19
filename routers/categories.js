const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

// get all category
router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();
  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

// create category
router.post(`/`, async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();

  if (!category) return res.status(404).send("the category connot be created!");

  res.send(category);
});

// get a single category
router.get(`/:id`, async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(500).send("the category with ID not found");
  }
  res.status(200).send(category);
});

// update category
router.put(`/:id`, async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  );
  if (!category) return res.status(404).send("the category connot be created!");

  res.send(category);
});

// delete category
router.delete(`/:id`, (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "the category has been deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "category not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
