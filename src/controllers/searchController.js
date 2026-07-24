const productsService = require("../services/productsService");

const searchController = {
    home: (req, res, next) => {
        try {
            const sort = req.query.query;

            const products = productsService.searchByName(sort);

            const cart = req.session.cart || [];
            const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

            res.render("search", {
                products,
                loggedIn: 1,
                totalItems,
                title: 'Search - Ecommerce',
                styles: [
                    "/css/components/userDropdown.css",
                    "/css/layouts/header.css",
                    "/css/components/searchBar.css",
                    "/css/components/cartAndProfile.css",
                    "/css/views/search.css",
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
module.exports = searchController;