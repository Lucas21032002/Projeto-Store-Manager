const validateId = (req, res, next) => {
    const [{ productId }] = req.body;
    const IdIsRequired = { message: '"productId" is required' };
    const invalidNumber = { message: '"productId" must be greater than or equal to 1' };

    if (productId === undefined) return res.status(400).json(IdIsRequired);
    if (productId < 1) return res.status(422).json(invalidNumber);
    next();
};

const validationsQuantity = (req, res, next) => {
    const [{ quantity }] = req.body;
    const quantityIsRequired = { message: '"quantity" is required' };
    const quantityShort = { message: '"quantity" must be greater than or equal to 1' };

    if (quantity === undefined) return res.status(400).json(quantityIsRequired);
    if (quantity < 1) return res.status(422).json(quantityShort);
    next();
};

module.exports = {
    validateId,
    validationsQuantity,
}; 