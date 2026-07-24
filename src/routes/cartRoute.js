const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get("/", cartController.cart); // Ver carrito
router.post("/add/:id", cartController.addToCart); // Agregar producto
router.post("/increment/:id", cartController.incrementQuantity); // Incrementar cantidad
router.post("/decrement/:id", cartController.decrementQuantity); // Disminuir cantidad
router.post("/remove/:id", cartController.removeFromCart); // Eliminar producto
router.post("/clear", cartController.clearCart); // Vaciar carrito

module.exports = router;