const productServices = require('../services/productServices');

const getAllProducts = async (req, res) => {
    res.status(200).json(await productServices.getAllProducts());
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const productById = await productServices.getProductById(id);
        return res.status(200).json(productById);
        } catch (err) {
            return res.status(404).json({
                message: err.message,
            });
        }
};

const createProduct = async (req, res) => {
        try {
            const { name, quantity } = req.body;
            const newProduct = await productServices.createProduct(name, quantity);
            return res.status(201).json({ id: newProduct, name, quantity });
        } catch (err) {
            return res.status(409).json({ message: err.message });
        }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, quantity } = req.body;
        
        const insertId = await productServices.updateProduct(id, name, quantity);
        return res.status(200).json({ id: insertId, name, quantity });
        } catch (err) {
            return res.status(404).json({ message: err.message });
        }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, quantity } = req.body;
        const product = await productServices.deleteProduct(id);
        return res.status(204).json({ id: product, name, quantity });
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};