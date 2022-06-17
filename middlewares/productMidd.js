const validationsName = (req, res, next) => {
    const { name } = req.body;
    const nameIsRequired = { message: '"name" is required' };
    const shortName = { message: '"name" length must be at least 5 characters long' };

    if (name === undefined) return res.status(400).json(nameIsRequired);
    if (name.length < 5) return res.status(422).json(shortName);
    next();
};

const validationsQuantity = (req, res, next) => {
    const { quantity } = req.body;
    const quantityIsRequired = { message: '"quantity" is required' };
    const quantityShort = { message: '"quantity" must be greater than or equal to 1' };

    if (quantity === undefined) return res.status(400).json(quantityIsRequired);
    if (quantity < 1) return res.status(422).json(quantityShort);
    next();
};

module.exports = {
    validationsName,
    validationsQuantity,
}; 