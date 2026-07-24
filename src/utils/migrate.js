const fs = require('fs'); // Módulo nativo para leer/escribir archivos
const path = require('path'); // Módulo nativo para manejar rutas de archivos
const db = require('../db/database'); // Conexión preconfigurada a la base de datos SQLite

// Definimos las rutas de los archivos que vamos a usar
const DB_PATH = path.join(__dirname, 'store.db');
const JSON_PATH = path.join(__dirname, '..', 'data', 'products.json');

function migrate()
{
    // 1. Leer y parsear JSON
    if (!fs.existsSync(JSON_PATH)) {
        console.error('No se encontró el archivo products.json');
        process.exit(1);
    }
    const rawData = fs.readFileSync(JSON_PATH, 'utf8');
    const rawProducts = JSON.parse(rawData); // Convertimos el texto JSON a un array de objetos JavaScript

    // 2. Normalizar claves y valores (elimina espacios accidentales al final)
    const products = rawProducts.map(p => {
        const normalized = {}; // Objeto vacío donde guardaremos los datos limpios

        // Iteramos sobre cada propiedad del producto original
        for (const key in p) {
            // key.trim() → elimina espacios al inicio/final de la clave ("id " → "id")
            // Si el valor es string, también le aplicamos trim(); si no, lo dejamos igual
            normalized[key.trim()] = typeof p[key] === 'string' ? p[key].trim() : p[key];
        }
        return normalized; // Retornamos el producto con claves y valores normalizados
    });

    try {
        // 3. Extraer e insertar categorías

        // Obtenemos un array con todas las categorías únicas (sin duplicados)
        // products.map(p => p.category) → extrae todas las categorías
        // new Set(...) → elimina duplicados automáticamente
        // [...new Set(...)] → convierte el Set de vuelta a array
        const uniqueCategories = [...new Set(products.map(p => p.category))];

        // INSERT OR IGNORE → si la categoría ya existe (por UNIQUE), no da error, simplemente la ignora
        const insertCategory = db.prepare('INSERT OR IGNORE INTO categories (name) VALUES (?)');
        const getCategory = db.prepare('SELECT id FROM categories WHERE name = ?');

        const categoryMap = {};

        // Creamos una transacción para insertar todas las categorías de una vez
        // Las transacciones en SQLite son MUCHO más rápidas que insertar una por una
        // y garantizan que si algo falla, no se inserta nada a medias (atomicidad)
        const insertCategories = db.transaction((cats) => {
            for (const cat of cats) {
                insertCategory.run(cat); // Insertamos la categoría (si no existe ya)
                categoryMap[cat] = getCategory.get(cat).id; // Obtenemos su ID y lo guardamos en el mapa para usarlo después con los productos
            }
        });
        insertCategories(uniqueCategories);
        console.log(`Categorías insertadas: ${uniqueCategories.length}`);

        // 4. Insertar productos
        const insertProduct = db.prepare(`
        INSERT INTO products (category_id, name, description, points, stock, image)
        VALUES (?, ?, ?, ?, ?, ?)
        `);

        const insertProducts = db.transaction((prods) => {
            for (const p of prods) {
                // Ejecutamos el INSERT con los datos de cada producto:
                insertProduct.run(
                    categoryMap[p.category] || null, // Si no hay categoría, queda NULL
                    p.name,
                    p.description,
                    p.points,
                    p.stock,
                    p.image
                );
            }
        });
        insertProducts(products);
        console.log(`Productos insertados: ${products.length}`);
        console.log('Migración completada con éxito.');

    }
    catch (error) {
        console.error('Error durante la migración:', error.message);
    }
    finally {
        db.close();
    }
}

migrate();