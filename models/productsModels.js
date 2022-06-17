const connection = require('./connection');

const getAllProducts = async () => {
    const query = 'SELECT * FROM StoreManager.products';
    const [AllProducts] = await connection.execute(query);
    return AllProducts;
};

const getProductById = async (id) => {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [productById] = await connection.execute(query, [id]);
    return productById[0];
};

const getProductByName = async (name) => {
    const query = 'SELECT * FROM StoreManager.products WHERE name = ?';
    const [productByName] = await connection.execute(query, [name]);
    return productByName;
};

const createProduct = async (name, quantity) => {
    const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)';
    const [{ insertId }] = await connection.execute(query, [name, quantity]);
    return insertId;
};

const deleteProduct = async (id) => {
    const query = 'DELETE FROM StoreManager.products WHERE id = ?';
    await connection.execute(query, [id]);
};

const updateProduct = async (id, name, quantity) => {
    const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';
    const [{ insertId }] = await connection.execute(query, [name, quantity, id]);
    return insertId;
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  createProduct,
  deleteProduct,
  updateProduct,
};