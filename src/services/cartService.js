const productsService = require("./productsService");

const cartService = {
    getCart(session) {
        return session.cart || [];
    },

    saveCart(session, cart) {
        session.cart = cart;
    },

    addProduct(session, productId) {
        const realProduct = productsService.getProductById(productId);

        if (!realProduct) {
            throw new Error("Producto inexistente");
        }

        const cart = this.getCart(session);

        const existingProduct = cart.find(item => item.productId === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        }
        else {
            cart.push({
                productId,
                quantity: 1
            });
        }
        this.saveCart(session, cart);
    },

    incrementQuantity(session, productId) {
        const cart = this.getCart(session);
        const product = cart.find(item => item.productId === productId);

        if (product) {
            product.quantity += 1;
        }
        this.saveCart(session, cart);
    },

    decrementQuantity(session, productId) {
        const cart = this.getCart(session);
        const product = cart.find(item => item.productId === productId);

        if (product) {
            product.quantity -= 1;

            if (product.quantity <= 0) {
                const updatedCart = cart.filter(
                    item => item.productId !== productId
                );
                return this.saveCart(session, updatedCart);
            }
        }
        this.saveCart(session, cart);
    },

    removeProduct(session, productId) {
        const cart = this.getCart(session);

        const updatedCart = cart.filter(
            item => item.productId !== productId
        );
        this.saveCart(session, updatedCart);
    },

    clearCart(session) {
        session.cart = [];
    },

    getDetailedCart(session) {
        
        const cart = this.getCart(session);

        return cart.map(cartItem => {
            const realProduct = productsService.getProductById(
                cartItem.productId
            );

            if (!realProduct) {
                return null;
            }

            return {
                ...realProduct,
                quantity: cartItem.quantity,
                subtotal: realProduct.points * cartItem.quantity
            };
        }).filter(Boolean); //Eliminar valores null del Array.
    },

    calculateTotal(session) {
        const cartProducts = this.getDetailedCart(session);

        return cartProducts.reduce((acc, product) => acc + product.subtotal, 0);
    },

    getTotalItems(session) {
        const cart = this.getCart(session);

        return cart.reduce((acc, item) => acc + item.quantity, 0);
    }
};

module.exports = cartService;