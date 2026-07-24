const loginController = {
    login: (req, res, next) => {
        try{
            res.render('login', {
                loggedIn: 0,
                title: 'Login - Ecommerce',
                layout: false
            });
        }
        catch(error){
            next(error);
        }
    }
};

module.exports = loginController;