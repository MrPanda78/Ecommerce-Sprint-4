const productsService = require("../services/productsService");
const translateCategory = require("../utils/translateCategory");

const categoriesController = {
    home: (req, res, next) => {
        try {
            const sort = req.query.sort;

            let products = productsService.getAllProducts();
            products = productsService.sortProducts(products, sort);

            const cart = req.session.cart || [];
            const totalItems = cart.reduce((acc, item) => acc + item.quantity,0);

            res.render("categories", {
                products,
                categorySelected: "all",
                translateCategory,
                loggedIn: 1,
                totalItems,
                sort,
                title: 'Categories - Ecommerce',
                styles: [
                    "/css/components/userDropdown.css",
                    "/css/layouts/header.css",
                    "/css/components/searchBar.css",
                    "/css/components/cartAndProfile.css",
                    "/css/views/categories.css",
                    "/css/components/breadCrumb.css",
                    "/css/components/productCard.css",
                    "/css/layouts/footer.css"
                ]
            });
        }
        catch(error){
            next(error);
        }
    },

    category: (req, res, next) => {
        try {
            const category = req.params.category;
            const sort = req.query.sort;

            let categoryProducts = productsService.getProductsByCategory(category);
            categoryProducts = productsService.sortProducts(categoryProducts, sort);

            const cart = req.session.cart || [];
            const totalItems = cart.reduce((acc, item) => acc + item.quantity,0);

            res.render("categories", {
                products: categoryProducts,
                categorySelected: category,
                translateCategory,
                loggedIn: 1,
                totalItems,
                sort,
                title: 'Categories - Ecommerce',
                styles: [
                    "/css/components/userDropdown.css",
                    "/css/layouts/header.css",
                    "/css/components/searchBar.css",
                    "/css/components/cartAndProfile.css",
                    "/css/views/categories.css",
                    "/css/components/breadCrumb.css",
                    "/css/components/productCard.css",
                    "/css/layouts/footer.css"
                ]
            });
        }
        catch(error){
            next(error);
        }
    }
}

module.exports = categoriesController;