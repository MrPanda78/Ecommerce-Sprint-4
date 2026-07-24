const Database = require('better-sqlite3'); // Importar librería para SQLite

// Crea o abre la base de datos
const db = new Database('database.db');

// Opcional: activar claves foráneas
db.pragma('foreign_keys = ON');

module.exports = db;