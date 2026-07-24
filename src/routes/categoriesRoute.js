const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.get("/", categoriesController.home); // Ver categorías
router.get("/:category", categoriesController.category); // Ver categoría específica

module.exports = router;