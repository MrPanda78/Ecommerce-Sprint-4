const db = require("../db/database");

const productsService = {
    categoryExists(categoryId) {
        const category = db.prepare(`
            SELECT id
            FROM categories
            WHERE id = ?
        `).get(categoryId);
        return !!category;
    },

    createProduct(product) {
        const result = db.prepare(`
            INSERT INTO products (
                category_id,
                name,
                description,
                points,
                stock,
                image
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `).run(
            product.category_id,
            product.name,
            product.description,
            product.points,
            product.stock,
            product.image
        );
        return this.getProductById(result.lastInsertRowid);
    },

    deleteProduct(id) {
        const result = db.prepare(`
            DELETE FROM products
            WHERE id = ?
        `).run(id);
        return result.changes > 0;
    },

    getAllProducts() {
        return db.prepare(`
            SELECT products.*, categories.name AS category
            FROM products
            JOIN categories
            ON products.category_id = categories.id
        `).all();
    },

    getProductById(id) {
        return db.prepare(`
            SELECT products.*,
                categories.name AS category
            FROM products
            LEFT JOIN categories
                ON products.category_id = categories.id
            WHERE products.id = ?
        `).get(id);
    },
    
    getProductsByCategory(category) {
        return db.prepare(`
            SELECT products.*, categories.name AS category
            FROM products
            JOIN categories
            ON products.category_id = categories.id
            WHERE categories.name = ?
        `).all(category);
    },

    getRandomProducts(limit) {
        return db.prepare(`
            SELECT products.*,
                categories.name AS category,
                (SELECT COUNT(*) FROM products) AS total_products
            FROM products
            LEFT JOIN categories
                ON products.category_id = categories.id
            ORDER BY RANDOM()
            LIMIT ?
        `).all(limit);
    },

    getRelatedProducts(product, limit) {
        return db.prepare(`
            SELECT products.*,
                categories.name AS category
            FROM products
            LEFT JOIN categories
                ON products.category_id = categories.id
            WHERE products.category_id = ?
            AND products.id != ?
            ORDER BY RANDOM()
            LIMIT ?
        `).all(product.category_id, product.id, limit);
    },

    formatProducts(productsArray) {
        return productsArray.map(product => ({
            ...product,
            points: product.points.toLocaleString("es-AR"),
            image: product.image
                ? `/images/products/${product.category}/${product.image}`
                : "/images/fondo_blanco_negro.webp"
        }));
    },

    sortProducts(productsArray, sort) {
        const sortedProducts = [...productsArray];

        if(sort === "asc") {

            sortedProducts.sort((a, b) => a.points - b.points);

        }
        else if(sort === "desc") {

            sortedProducts.sort((a, b) => b.points - a.points);
        }
        return sortedProducts;
    },

    searchByName(buscar){
        return db.prepare(`
            SELECT products.*,
                categories.name AS category
            FROM products
            LEFT JOIN categories
                ON products.category_id = categories.id
            WHERE LOWER(products.name) LIKE '%' || LOWER(?) || '%';
        `).all(buscar);
    },

    updateProduct(id, product) {
        const result = db.prepare(`
            UPDATE products
            SET
                category_id = ?,
                name = ?,
                description = ?,
                points = ?,
                stock = ?,
                image = ?
            WHERE id = ?
        `).run(
            product.category_id,
            product.name,
            product.description,
            product.points,
            product.stock,
            product.image,
            id
        );

        if (result.changes === 0) {
            return null;
        }
        return this.getProductById(id);
    }
};

module.exports = productsService;