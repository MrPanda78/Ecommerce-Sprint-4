const cartService = require("../services/cartService");
const normalizeId = require("../utils/normalizeId");

const cartController = {
    cart: (req, res, next) => {
        try {
            const cartProducts = cartService.getDetailedCart(req.session);
            const total = cartService.calculateTotal(req.session);
            const totalItems = cartService.getTotalItems(req.session);

            res.render("cart", {
                title: 'Cart - Ecommerce',
                cartProducts,
                total,
                loggedIn: 1,
                totalItems,
                styles: [
                    "/css/components/userDropdown.css",
                    "/css/layouts/header.css",
                    "/css/components/searchBar.css",
                    "/css/components/cartAndProfile.css",
                    "/css/views/cart.css",
                    "/css/components/breadCrumb.css",
                    "/css/components/productCart.css",
                    "/css/layouts/footer.css"
                ]
            });
        }
        catch(error){
            next(error);
        }
    },

    addToCart: (req, res) => {
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
        cartService.addProduct(req.session, id);
        res.redirect("/cart");
    },

    incrementQuantity: (req, res) => {
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
        cartService.incrementQuantity(req.session, id);
        res.redirect("/cart");
    },

    decrementQuantity: (req, res) => {
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
        cartService.decrementQuantity(req.session, id);
        res.redirect("/cart");
    },

    removeFromCart: (req, res) => {
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
        cartService.removeProduct(req.session, id);
        res.redirect("/cart");
    },

    clearCart: (req, res) => {
        cartService.clearCart(req.session);
        res.redirect("/cart");
    }
};

module.exports = cartController;