const salesModels = require('../models/salesModels');
const productsService = require('./productServices');

const getAllSales = async () => {
    const AllSales = await salesModels.getAllSales();
    return AllSales;
};

const getSaleById = async (id) => {
    const saleById = await salesModels.getSaleById(id);

    if (!saleById.length) throw new Error('Sale not found');

    return saleById;
};

const createSale = async (itemsSold) => {
    const products = await Promise.all(itemsSold.map(async (item) => {
        const p = await productsService.getProductById(item.productId);

        if (item.quantity > p.quantity) throw new Error('Such amount is not permitted to sell');
        
        return { id: item.productId, name: p.name, quantity: p.quantity - item.quantity };
    }));
    const insertId = await salesModels.createSale(itemsSold);
    await Promise.all(products.map(async ({ id, name, quantity }) => {
        await productsService.updateProduct(id, name, quantity);
    }));
    return insertId;
};

const updateSale = async (productId, quantity, id) => {
    await getSaleById(id);
    await salesModels.updateSale(productId, quantity, id);
};

const deleteSale = async (id) => {
    await getSaleById(id);
    const sale = await salesModels.getSaleById(id);
    const saleUpdate = sale.map(({ productId, quantity }) => ({ id: productId, quantity }));
    const saleUpdated = await Promise.all(saleUpdate.map(async (item) => {
        const product = await productsService.getProductById(item.id);
        return { ...product, quantity: product.quantity + item.quantity };
    }));
    await Promise.all(saleUpdated.map(async (i) => {
        productsService.updateProduct(i.id, i.name, i.quantity);
    }));
    const saleDeleted = await salesModels.deleteSale(id);
    return saleDeleted;
};

module.exports = { 
    getAllSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale,
};