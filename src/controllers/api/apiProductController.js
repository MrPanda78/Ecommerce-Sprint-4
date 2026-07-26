const productsService = require("../../services/productsService");
const normalizeId = require("../../utils/normalizeId");

const apiProductController = {
    list: (req, res) => {
        const products = productsService.getAllProducts();

        res.status(200).json(products);
    },
    detail: (req, res) => {
        const id = normalizeId(req.params.id);

        if (!id) {
            return res.status(400).json({
                error: "ID de producto inválido"
            });
        }
        const product = productsService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                error: "Producto no encontrado"
            });
        }
        res.status(200).json(product);
    },
    create: (req, res) => {
        const {
            category_id,
            name,
            description,
            points,
            stock,
            image
        } = req.body;

        if (!category_id || isNaN(category_id)) {
            return res.status(400).json({
                error: "category_id es obligatorio y debe ser un número."
            });
        }

        if (!productsService.categoryExists(Number(category_id))) {
            return res.status(400).json({
                error: "La categoría indicada no existe."
            });
        }

        if (!name || !name.trim()) {
            return res.status(400).json({
                error: "Name es obligatorio."
            });
        }

        if (points === undefined || isNaN(points)) {
            return res.status(400).json({
                error: "Points es obligatorio y debe ser un número."
            });
        }

        if (stock !== undefined && !Number.isInteger(Number(stock))) {
            return res.status(400).json({
                error: "Stock debe ser un número entero."
            });
        }

        const product = productsService.createProduct({
            category_id: Number(category_id),
            name: name.trim(),
            description: description || "",
            points: Number(points),
            stock: stock ? Number(stock) : 0,
            image: image || null
        });
        res.status(201).json(product);
    },
    update: (req, res) => {
        const id = normalizeId(req.params.id);

        if (!id) {
            return res.status(400).json({
                error: "ID de producto inválido."
            });
        }

        const {
            category_id,
            name,
            description,
            points,
            stock,
            image
        } = req.body;

        if (!category_id || isNaN(category_id)) {
            return res.status(400).json({
                error: "category_id es obligatorio y debe ser un número."
            });
        }

        if (!productsService.categoryExists(Number(category_id))) {
            return res.status(400).json({
                error: "La categoría indicada no existe."
            });
        }

        if (!name || !name.trim()) {
            return res.status(400).json({
                error: "El nombre es obligatorio."
            });
        }

        if (points === undefined || isNaN(points)) {
            return res.status(400).json({
                error: "points es obligatorio y debe ser un número."
            });
        }

        if (stock !== undefined && !Number.isInteger(Number(stock))) {
            return res.status(400).json({
                error: "stock debe ser un número entero."
            });
        }

        const product = productsService.updateProduct(id, {
            category_id: Number(category_id),
            name: name.trim(),
            description: description || "",
            points: Number(points),
            stock: stock ? Number(stock) : 0,
            image: image || null
        });

        if (!product) {
            return res.status(404).json({
                error: "Producto no encontrado."
            });
        }
        res.status(200).json(product);
    },

    remove: (req, res) => {
        const id = normalizeId(req.params.id);

        if (!id) {
            return res.status(400).json({
                error: "ID de producto inválido."
            });
        }
        const deleted = productsService.deleteProduct(id);

        if (!deleted) {
            return res.status(404).json({
                error: "Producto no encontrado."
            });
        }
        res.status(200).json({
            message: "Producto eliminado correctamente."
        });
    }
};

module.exports = apiProductController;