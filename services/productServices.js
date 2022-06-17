const productsModels = require('../models/productsModels');

const getAllProducts = async () => {
    const products = await productsModels.getAllProducts();
    return products;
};

const getProductById = async (id) => {
    const productById = await productsModels.getProductById(id);

    if (!productById) throw new Error('Product not found');

    return productById;
};

const getProductByName = async (name) => {
    const productByName = await productsModels.getProductByName(name);
    return productByName;
};

const createProduct = async (name, quantity) => {
    const product = await productsModels.getProductByName(name);
    
    if (product.length) throw new Error('Product already exists');
    
    const insertId = await productsModels.createProduct(name, quantity);
    return insertId;
};

const updateProduct = async (id, name, quantity) => {
    const productById = await productsModels.getProductById(id);

    if (!productById) throw new Error('Product not found');

    const updatedProduct = await productsModels.updateProduct(id, name, quantity);
    return updatedProduct;
};

const deleteProduct = async (id) => {
    const product = await productsModels.getProductById(id);
    
    if (!product) throw new Error('Product not found');

    const productToBeDeleted = await productsModels.deleteProduct(id);

    return productToBeDeleted;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    getProductByName,
    updateProduct,
    deleteProduct,
};