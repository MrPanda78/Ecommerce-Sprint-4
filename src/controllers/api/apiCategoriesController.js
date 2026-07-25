const categoriesService = require("../../services/categoriesService");
const normalizeId = require("../../utils/normalizeId");

const apiCategoriesController = {

    list: (req, res) => {
        const categories = categoriesService.getAllCategories();

        res.status(200).json(categories);
    },

    detail: (req, res) => {
        const id = normalizeId(req.params.id);

        if (!id) {
            return res.status(400).json({
                error: "ID de categoría inválido."
            });
        }

        const category = categoriesService.getCategoryById(id);

        if (!category) {
            return res.status(404).json({
                error: "Categoría no encontrada."
            });
        }
        res.status(200).json(category);
    },

    create: (req, res) => {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                error: "El nombre de la categoría es obligatorio."
            });
        }

        const category = categoriesService.createCategory({
            name: name.trim()
        });
        res.status(201).json(category);
    },

    update: (req, res) => {
        const id = normalizeId(req.params.id);

        if (!id) {
            return res.status(400).json({
                error: "ID de categoría inválido."
            });
        }

        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                error: "El nombre de la categoría es obligatorio."
            });
        }

        const category = categoriesService.updateCategory(id, {
            name: name.trim()
        });

        if (!category) {
            return res.status(404).json({
                error: "Categoría no encontrada."
            });
        }
        res.status(200).json(category);
    },

    remove: (req, res) => {
        const id = normalizeId(req.params.id);

        if (!id) {
            return res.status(400).json({
                error: "ID de categoría inválido."
            });
        }

        const deleted = categoriesService.deleteCategory(id);

        if (!deleted) {
            return res.status(404).json({
                error: "Categoría no encontrada."
            });
        }

        res.status(200).json({
            message: "Categoría eliminada correctamente."
        });
    }
};

module.exports = apiCategoriesController;