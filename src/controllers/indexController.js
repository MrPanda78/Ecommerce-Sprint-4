const productsService = require("../services/productsService");

const indexController = {
    index: (req, res, next) => {
        try {
            const interests = productsService.formatProducts(
                productsService.getRandomProducts(5)
            );
            
            const mostRequested = productsService.formatProducts(
                productsService.getRandomProducts(10)
            );
            const cart = req.session.cart || [];
            const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

            res.render('index', {
                title: 'Home - Ecommerce',
                loggedIn: 1,
                interests,
                mostRequested,
                totalItems,
                styles: [
                    "/css/components/userDropdown.css",
                    "/css/layouts/header.css",
                    "/css/components/searchBar.css",
                    "/css/components/cartAndProfile.css",
                    "/css/layouts/nav.css",
                    "/css/views/index.css",
                    "/css/components/productCard.css",
                    "/css/layouts/footer.css"
                ]
            });
        }
        catch(error){
            next(error);
        }
    },

    //Middleware404
    error404: (req, res) => {
        res.status(404).render("error404", {
            title: 'Error 404 - Ecommerce',
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
    },

    //Middleware 500.
    error500:((err, req, res, next) => {
        console.error(err);
        res.status(500).render("error500", {
            title: 'Error 500 - Ecommerce',
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
    })
};

module.exports = indexController;
