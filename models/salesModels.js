const connection = require('./connection');

const serialize = (sales) => sales.map((sale) => ({
            saleId: sale.sale_id,
            date: sale.date,
            productId: sale.product_id,
            quantity: sale.quantity,
        }));

const getAllSales = async () => {
    const query = `SELECT 
    SP.sale_id, 
    S.date, 
    SP.product_id, 
    SP.quantity 
    FROM StoreManager.sales_products AS SP 
        INNER JOIN 
    StoreManager.sales AS S ON SP.sale_id = S.id 
    ORDER BY SP.sale_id ASC;`;
    const [AllSales] = await connection.execute(query);
    // const serializeData = AllSales.map((sale) => serialize(sale));
    return serialize(AllSales);
};

const getSaleById = async (id) => {
    const query = `SELECT 
    S.date, 
    SP.product_id,
    SP.quantity 
    FROM StoreManager.sales_products AS SP 
        INNER JOIN 
    StoreManager.sales AS S ON SP.sale_id = S.id WHERE SP.sale_id = ? 
    ORDER BY SP.sale_id ASC;`;
    const [salesById] = await connection.execute(query, [id]);
    if (!salesById.length) return false;
    return serialize(salesById);
};

const createSale = async (array) => {
    const query = 'INSERT INTO StoreManager.sales(date) VALUES (NOW());';
    const [{ insertId }] = await connection.execute(query);
    const query2 = `INSERT INTO 
    StoreManager.sales_products (sale_id, product_id, quantity) 
    VALUES (?, ?, ?)`;
   array.map(async (sale) => 
   connection.execute(query2, [insertId, sale.productId, sale.quantity]));
   return insertId;
};

const updateSale = async (productId, quantity, saleId) => {
    const query = `UPDATE 
    StoreManager.sales_products 
    SET product_id = ?, 
    quantity = ? 
    WHERE sale_id = ?`;
    await connection.execute(query, [productId, quantity, saleId]);
};

const deleteSale = async (id) => {
    const query = 'DELETE FROM StoreManager.sales WHERE id = ?;';
    const [{ insertId }] = await connection.execute(query, [id]);
    return insertId;
};

module.exports = {
    getAllSales,
    getSaleById,
    updateSale,
    createSale,
    deleteSale,
};