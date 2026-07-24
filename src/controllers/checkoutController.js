const checkoutController = {
    checkout: (req, res, next) => {
        try{
            const cart = req.session.cart || [];
        
            const totalItems = cart.reduce((acc, item) => acc + item.quantity,0);

            res.render('checkout', {
                loggedIn: 1,
                totalItems,
                title: 'Checkout - Ecommerce',
                styles: [
                    "/css/components/userDropdown.css",
                    "/css/layouts/header.css",
                    "/css/components/searchBar.css",
                    "/css/components/cartAndProfile.css",
                    "/css/views/checkout.css",
                    "/css/layouts/footer.css"
                ]
            });
        }
        catch(error){
            next(error);
        }
    }
};

module.exports = checkoutController;