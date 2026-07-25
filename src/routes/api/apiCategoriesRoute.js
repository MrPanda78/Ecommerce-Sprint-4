const express = require("express");
const router = express.Router();

const apiCategoriesController = require("../../controllers/api/apiCategoriesController");

router.get("/", apiCategoriesController.list);
router.get("/:id", apiCategoriesController.detail);
router.post("/", apiCategoriesController.create);
router.put("/:id", apiCategoriesController.update);
router.delete("/:id", apiCategoriesController.remove);

module.exports = router;