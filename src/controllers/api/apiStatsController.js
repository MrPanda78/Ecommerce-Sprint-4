const productsService = require("../../services/productsService");
const categoriesService = require("../../services/categoriesService");

const apiStatsController = {
    stats: (req, res) => {
        const totalProducts = productsService.countProducts();
        const totalCategories = categoriesService.countCategories();

        res.status(200).json({
            totalProducts,
            totalCategories
        });
    }
};

module.exports = apiStatsController;