const sinon = require('sinon');
const { expect } = require('chai')
const models = require('../../../models/productsModels')
const connection = require('../../../models/connection');

describe('MODELS - GETALL - Busca todos os produtos', () => {
    before(async () => {
        const execute = [[{ id: 1, name: 'Martelo de Thor', quantity: 10 },
        { id: 2, name: 'Traje de encolhimento', quantity: 20 },
        { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
      ]];
      sinon.stub(connection, 'execute').resolves(execute);
    })

    after(async () => {
        connection.execute.restore();
    });

    describe('Quando a busca for bem sucedida', () => {
        it('Retorna um array', async () => {
            const res = await models.getAllProducts();
            expect(res).to.be.a('array');
        })
    });
});

describe('MODELS - GETBYID - Busca determinado produto pelo "id"', () => {
    const payload = 1
    before(async () => {
        const execute = [[{ id: 1, name: 'Martelo de Thor', quantity: 10 }]];
      sinon.stub(connection, 'execute').resolves(execute);
    })

    after(async () => {
        connection.execute.restore();
    });

    describe('Quando a busca for bem sucedida', () => {
        it('Retorna um objeto com o produto buscado pelo id', async () => {
            const res = await models.getProductById(payload);
            expect(res).to.be.a('object');
            expect(res).to.have.a.property('id');
            expect(res).to.have.a.property('name');
            expect(res).to.have.a.property('quantity');
        })
    });
})

describe('MODELS - GETBYNAME - Busca determinado produto pelo nome', () => {
    const payload = 'Martelo do Thor'
    before(async () => {
        const execute = [{ id: 1, name: 'Martelo de Thor', quantity: 10 }];
      sinon.stub(connection, 'execute').resolves(execute);
    })

    after(async () => {
        connection.execute.restore();
    });

    describe('Quando a busca for bem sucedida', () => {
        it('Retorna um objeto com o produto buscado pelo nome', async () => {
            const res = await models.getProductByName(payload);
            expect(res).to.be.a('object');
            expect(res).to.have.a.property('id');
            expect(res).to.have.a.property('name');
            expect(res).to.have.a.property('quantity');
        })
    });
})

describe('MODELS - CREATE - cria um produto', () => {
    const payload = ('nome-teste', 10)
    before(async () => {
        const execute = [{ insertId: 1}];
      sinon.stub(connection, 'execute').resolves(execute);
    })

    after(async () => {
        connection.execute.restore();
    });

    describe('Quando for criado com sucesso', () => {
        it('Retorna um objeto com o produto criado', async () => {
            const res = await models.createProduct(payload);
            expect(res).to.be.a('number');
        })
    });
})

describe('MODELS - UPDATE - atualiza um produto', () => {
    const payload = (2 ,'nome-teste', 10)
    before(async () => {
        const execute = [{ insertId: 2}];
      sinon.stub(connection, 'execute').resolves(execute);
    })

    after(async () => {
        connection.execute.restore();
    });

    describe('Quando for atualizado com sucesso', () => {
        it('Retorna um id', async () => {
            const res = await models.updateProduct(payload);
            expect(res).to.be.a('number');
        })
    });
})
describe('MODELS - DELETE - remove um produto', () => {
    const payload = 1
    before(async () => {
        const execute = [{ insertId: 1}];
      sinon.stub(connection, 'execute').resolves(execute);
    })

    after(async () => {
        connection.execute.restore();
    });

    describe('Quando removido com sucesso', () => {
        it('Retorna id', async () => {
            const res = await models.deleteProduct(payload);
            expect(res).to.be.a('undefined');
        })
    });
})