function normalizeId(id)
{
    const normalizedId = Number(id);

    if (!Number.isInteger(normalizedId) || normalizedId <= 0) {

        return null;
    }
    return normalizedId;
}
// La verificacion de si el producto existe ya esta realizado en productController.js
// Realizado anteriormente en Ecommerce-Sprint-2.
module.exports = normalizeId;