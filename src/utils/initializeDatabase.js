const fs = require('fs');
const path = require('path');
const db = require('../db/database');

const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');

// Leer archivo SQL
const schema = fs.readFileSync(schemaPath, 'utf8');

// Ejecutar schema
db.exec(schema);

console.log('Base de datos inicializada correctamente.');