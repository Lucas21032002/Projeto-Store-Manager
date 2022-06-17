const sinon = require('sinon');
const { expect } = require('chai')
const models = require('../../../models/salesModels')
const connection = require('../../../models/connection');

describe('MODELS - GETALL - Busca todas as vendas', () => {
    before(async () => {
        const execute = [[
            {
                saleId: 1,
                date: '2022-04-01T01:19:28.000Z',
                productId: 1,
                quantity: 5
              },
              {
                saleId: 1,
                date: '2022-04-01T01:19:28.000Z',
                productId: 2,
                quantity: 10
              },
              {
                saleId: 2,
                date: '2022-04-01T01:19:28.000Z',
                productId: 3,
                quantity: 15
              }
        ]];
      sinon.stub(connection, 'execute').resolves(execute);
    })

    after(async () => {
        connection.execute.restore();
    });
    describe('Quando a busca é bem sucedida', () => {
        it('Retorna um array com as vendas', async () => {
            const res = await models.getAllSales();
            expect(res).to.be.a('array')
        });
    });
});

describe('MODELS - GETBYID - Busca determinada venda pelo id', () => {
    const payload = 2 
    before(async () => {
        const execute = [[{
            date: '2022-04-01T01:19:28.000Z',
            productId: 3,
            quantity: 15
}]];
      sinon.stub(connection, 'execute').resolves(execute);
    })

    after(async () => {
        connection.execute.restore();
    });
    describe('Quando a busca é bem sucedida', () => {
        it('Retorna um objeto com a venda solicitada', async () => {
            const res = await models.getSaleById(payload);
            expect(res).to.be.a('array');
            expect(res[0]).to.be.a('object')
            expect(res[0]).to.have.a.property('date');
            expect(res[0]).to.have.a.property('productId');
            expect(res[0]).to.have.a.property('quantity');
        });
    });
});

describe('MODELS - CREATE - cria uma venda no banco', () => {
    const payload = [{ productId:1, quantity:10 }];
    before( async() => {
        const execute = [{insertId: 1}];
        sinon.stub(connection, 'execute').resolves(execute);
    })
    after(async () => {
        connection.execute.restore();
    })
    describe('Quando é criada com sucesso',  () => {
        it('retorna um id', async () => {
            const res = await models.createSale(payload);
            expect(res).to.be.a('number')
        })
    })
})

describe('MODELS - UPDATE - atualiza uma venda', () => {
    const payload = (1, 2, 3);
    before(async () => {
        const execute = undefined;
        sinon.stub(connection, 'execute').resolves(execute);
    });
    after(async () => {
        connection.execute.restore();
    });
    describe('Quando for atualizado com sucesso', () => {
        it('essa função não possui retorno', async () => {
            const res = await models.updateSale(payload);
            expect(res).to.be.a('undefined');
        })
    })
})

describe('MODELS - DELETE - remove uma venda', () => {
    const payload = 1;
    before(async () => {
        const execute = [{ insertId: 1}];
        sinon.stub(connection, 'execute').resolves(execute);
    });
    after(async () => {
        connection.execute.restore();
    });
    describe('Quando for deletado com sucesso', () => {
        it('retorna um id', async () => {
            const res = await models.deleteSale(payload);
            expect(res).to.be.a('number');
        })
    })
})

