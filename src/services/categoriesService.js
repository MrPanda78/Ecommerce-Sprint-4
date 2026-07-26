const db = require("../db/database");

const categoriesService = {

    getAllCategories() {
        return db.prepare(`SELECT * FROM categories`).all();
    },

    getCategoryById(id) {
        return db.prepare(`SELECT * FROM categories WHERE id = ?`).get(id);
    },

    createCategory(category) {
        const result = db.prepare(`INSERT INTO categories(name) VALUES(?)`).run(category.name);

        return this.getCategoryById(result.lastInsertRowid);
    },

    countCategories() {
        const result = db.prepare(`SELECT COUNT(*) AS total FROM categories`).get();
        
        return result.total;
    },

    updateCategory(id, category) {
        const result = db.prepare(`UPDATE categories SET name = ? WHERE id = ?`).run(category.name, id);

        if(result.changes === 0){
            return null;
        }
        return this.getCategoryById(id);
    },

    deleteCategory(id){
        const result = db.prepare(`DELETE FROM categories WHERE id = ?`).run(id);

        return result.changes > 0;
    }
};

module.exports = categoriesService;