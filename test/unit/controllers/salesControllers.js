const sinon = require('sinon');
const { expect } = require('chai')
const controllers = require('../../../controllers/salesController');
const services = require('../../../services/saleServices');

describe('CONTROLLERS - GETALL - busca todas as vendas', () => {
    const res = {};
    const req = {};
    before(async () => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(services, 'getAllSales').resolves(true);
    })
    after(() => {
        services.getAllSales.restore()
    })
    it('quando buscado com sucesso retorna código 200', async () => {
        await controllers.getAllSales(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
    });
});

describe('CONTROLLERS - GETBYID - busca determinada venda pelo id', () => {
   describe('quando é feita a busca com sucesso', () => {
    const res = {};
    const req = {};
    before(async () => {
        req.params = { id: 2}
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(services, 'getSaleById').resolves([1, 2]);
    })
    after(() => {
        services.getSaleById.restore()
    })
    it('retorna código 200', async () => {
        await controllers.getSaleById(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
        });
   });
   describe('quando é feita a busca sem sucesso', () => {
    const res = {};
    const req = {};
    before(async () => {
        req.params = { id: 2}
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(services, 'getSaleById').throws(() => new Error('Sale not found'))
    })
    after(() => {
        services.getSaleById.restore()
    })
    it('retorna código 200', async () => {
        await controllers.getSaleById(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
   });
});

describe('CONTROLLERS - UPDATE - atualiza uma venda', () => {
    describe('Quando a atualização é feita com sucesso', () => {
        const res = {};
        const req = {};
        before(() => {
            req.params =  { id: 1 }
            req.body = [{ productId: 1, quantity: 3}]
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(services, 'updateSale').returns(true);
            sinon.stub(services, 'getSaleById').resolves(true);
        
    })
        after(() => {
            services.updateSale.restore();
            services.getSaleById.restore();
    })
        it('retorna código 200', async () => {
            await controllers.updateSale(req, res);
            expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});
describe('CONTROLLERS - DELETE - remove uma venda', () => {
    describe('quando é removido com sucesso', () => {
        const res = {};
        const req = {};
    before(async () => {
        req.body = {};
        req.params = { id: 1 }
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(services, 'deleteSale').resolves(true);
        sinon.stub(services, 'getSaleById').resolves(true);

    })
    after(() => {
        services.deleteSale.restore();
        services.getSaleById.restore();
    })
    it('retorna código 204', async () => {
        await controllers.deleteSale(req, res);
        expect(res.status.calledWith(204)).to.be.equal(true);
    });
  });
  describe('quando a remoção não é feita com sucesso', () => {
    const res = {};
    const req = {};
before(async () => {
    req.body = {};
    req.params = { id: 1 }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(services, 'deleteSale').throws(() => new Error('Sale not found'))
    sinon.stub(services, 'getSaleById').throws(() => new Error('Sale not found'))

})
after(() => {
    services.deleteSale.restore()
})
it('retorna código 404', async () => {
    await controllers.deleteSale(req, res);
    expect(res.status.calledWith(404)).to.be.equal(true);
    });
  });
});