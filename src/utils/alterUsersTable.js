const db = require('../db/database');

// Agregar columnas a la tabla users
db.exec(`
    ALTER TABLE users ADD COLUMN name TEXT;
    ALTER TABLE users ADD COLUMN email TEXT;
    ALTER TABLE users ADD COLUMN password_hash TEXT;
    ALTER TABLE users ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP;
`);
console.log('Tabla users alterada correctamente.');