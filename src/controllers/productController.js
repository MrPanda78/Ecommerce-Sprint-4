const productsService = require("../services/productsService");
const translateCategory = require("../utils/translateCategory");
const normalizeId = require("../utils/normalizeId");

const productController = {
    product: (req, res, next) => {
        try {
            const id = normalizeId(req.params.id);

            if (!id)
            {
                return res.status(400).render("error400", {
                    title: "Producto inválido - Ecommerce",
                    loggedIn: 1,
                    totalItems: 0,
                    styles: [
                        "/css/components/userDropdown.css",
                        "/css/layouts/header.css",
                        "/css/components/searchBar.css",
                        "/css/components/cartAndProfile.css",
                        "/css/views/errors.css",
                        "/css/layouts/footer.css"
                    ]
                });
            }
            const product = productsService.getProductById(id);

            if (!product) {
                return res.status(404).render("error404");
            }

            const interests = productsService.formatProducts(productsService.getRelatedProducts(product, 4));
            const cart = req.session.cart || [];
            const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

            res.render('product', {
                loggedIn: 1,
                interests,
                product,
                translateCategory,
                totalItems,
                title: 'Product ' + id + ' - Ecommerce',
                styles: [
                    "/css/components/userDropdown.css",
                    "/css/layouts/header.css",
                    "/css/components/searchBar.css",
                    "/css/components/cartAndProfile.css",
                    "/css/views/product.css",
                    "/css/components/breadCrumb.css",
                    "/css/components/productContainer.css",
                    "/css/components/productCard.css",
                    "/css/layouts/nav.css",
                    "/css/layouts/footer.css"
                ]
            });
        }
        catch(error){
            next(error);
        }
    }
};

module.exports = productController;