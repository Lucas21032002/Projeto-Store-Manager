const express = require('express');
const { 
    getAllProducts, 
    getProductById,
    createProduct, 
    updateProduct, 
    deleteProduct, 
} = require('../controllers/productsController');
const { 
    validationsName, 
    validationsQuantity, 
} = require('../middlewares/productMidd');

const router = express.Router();

router 
    .get('/', getAllProducts)
    .get('/:id', getProductById)
    .post('/', validationsName, validationsQuantity, createProduct)
    .put('/:id', validationsName, validationsQuantity, updateProduct)
    .delete('/:id', deleteProduct);
module.exports = router;