const express = require('express');
const {
    getAllSales, 
    getSaleById, 
    createSale, 
    updateSale, 
    deleteSale,
} = require('../controllers/salesController');

const { validateId, validationsQuantity } = require('../middlewares/salesMidd');

const router = express.Router();

router 
    .get('/', getAllSales)
    .get('/:id', getSaleById)
    .post('/', validationsQuantity, validateId, createSale)
    .put('/:id', validationsQuantity, validateId, updateSale)
    .delete('/:id', deleteSale);

module.exports = router;