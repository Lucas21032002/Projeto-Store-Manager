const saleServices = require('../services/saleServices');

const getAllSales = async (req, res) => res.status(200).json(await saleServices.getAllSales());

const getSaleById = async (req, res) => {
    try {
        const { id } = req.params;
        return res.status(200).json(await saleServices.getSaleById(id));
    } catch (err) {
         return res.status(404).json({ message: err.message });
    }
};

const createSale = async (req, res) => {
    const itemsSold = req.body.map(({ productId, quantity }) => ({ productId, quantity }));
    try {
        const insertId = await saleServices.createSale(itemsSold);
        return res.status(201).json({ id: insertId, itemsSold });
    } catch (err) {
        return res.status(422).json({ message: err.message });
    }
};

const updateSale = async (req, res) => {
    try {
        const { id } = req.params;
        const [{ productId, quantity }] = req.body;
        await saleServices.updateSale(productId, quantity, id);
        return res.status(200).json({ saleId: id, itemUpdated: [{ productId, quantity }] });
    } catch (e) {
        console.log(e);
    }
};

const deleteSale = async (req, res) => {
    try {
        const { id } = req.params;
        const removeSale = await saleServices.deleteSale(id);
        return res.status(204).json({ id: removeSale });
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};

module.exports = {
    getAllSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale,
};