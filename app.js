const express = require('express');
const path = require('path');
const session = require('express-session'); // Esto permite usar: req.session
const expressLayouts = require('express-ejs-layouts');

const indexRoutes = require('./src/routes/indexRoute');
const cartRoutes = require('./src/routes/cartRoute');
const categoriesRoutes = require('./src/routes/categoriesRoute');
const checkoutRoutes = require('./src/routes/checkoutRoute');
const loginRoutes = require('./src/routes/loginRoute');
const productRoutes = require('./src/routes/productRoute');
const registerRoutes = require('./src/routes/registerRoute');
const indexController = require('./src/controllers/indexController');
const searchRoutes = require('./src/routes/searchRoute');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true })); // Sin esto: Express no puede leer req.body

app.use(session({ // Esto crea una sesión para cada navegador.
    secret: '123456789', // Clave interna usada por Express.
    resave: false, // Evita guardar la sesión si no cambió.
    saveUninitialized: false // No crea sesiones vacías innecesarias.
}));

app.use('/', indexRoutes);
app.use('/cart', cartRoutes);
app.use('/categories', categoriesRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/login', loginRoutes);
app.use('/products', productRoutes);
app.use('/register', registerRoutes);
app.use('/search', searchRoutes);

app.use(indexController.error404);

app.use(indexController.error500);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});