const sinon = require('sinon');
const { expect } = require('chai')
const services = require('../../../services/saleServices')
const models = require('../../../models/salesModels')
//const services = require('../../../services/saleServices')

describe('SERVICE - SALES - GETALL - busca todas as vendas', () => {
    before(() => {
        const retorno = [[
        { id: 1, name: 'Martelo de Thor', quantity: 10 },
        { id: 2, name: 'Traje de encolhimento', quantity: 20 },
        { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
      ]];
    sinon.stub(models, 'getAllSales').resolves(retorno);
    })
    after(() => {
        models.getAllSales.restore();
    })
    describe('quando a busca é bem sucedida', () => {
        it('retorna um array com as vendas', async() => {
            const res = await services.getAllSales();
            expect(res).to.be.a('array')
        })
    })
})
/* describe('SERVICES - GETSALEBYID - busca uma venda pelo seu ID', () => {
    describe('testando função getSaleById', () => {
        const payload = 1;
        before(() => {
            const retorno = [[{ id: 2, name: 'Traje de encolhimento', quantity: 20 }]];
            sinon.stub(models, 'getSaleById').resolves(retorno);
        })
        after(() => {
            models.getSaleById.restore();
        })
        describe('quando a busca é bem sucedida', () => {
            it('retorna um objeto com o produto', async () => {
                const [[res]] = await services.getSaleById(payload);
                expect(res).to.be.a('object')
            })
        })
    })
    describe('getById false', () => {
        const payload = 2;
        before(() => {
            sinon.stub(models, 'getSaleById').resolves(false);
        })
        after(() => {
            models.getSaleById.restore();
        })
     describe('quando a busca é feita sem sucesso', () => {
         it('retorna um objeto de erro', async () => {
             try{
                 await services.getSaleById(payload)
             } catch (err){
                 e = err;
             } finally{
                 expect(e).to.haveOwnProperty('message');
                 expect(e.message).to.equal('Sale not found')
             };
         });
     });
    });
 }); */

 describe('SERVICES - UPDATE - atualiza uma venda', () => {
    describe('testando função de atualização', () => {
        const payload = (1, 5, 10)
        before(() => {
          const retorno = undefined;
          sinon.stub(models, 'updateSale').resolves(retorno)
          sinon.stub(models, 'getSaleById').resolves([1, 2])
        })
        after(() => {
            models.updateSale.restore();
            models.getSaleById.restore();
        })
        describe('quando é atualizado com sucesso', () => {
            it('essta função nao tem retorno', async ()=> {
                const res = await services.updateSale(payload);
                expect(res).to.be.a('undefined')
            });
        });
    })
    describe('testando função em caso de erro', () => {
        const payload = (1, 'nome-teste', 10)
        before(() => {
            const retorno = [{ insertId: 1 }];
          sinon.stub(models, 'updateSale').resolves(retorno)
          sinon.stub(models, 'getSaleById').resolves()
        })
        after(() => {
            models.updateSale.restore();
            models.getSaleById.restore();
        })
        describe('caso não seja atualizado com sucesso', () => {
            it('retorna um objeto de erro', async () => {
                try{
                    await services.updateSale(payload);
                } catch(err){
                    e = err
                } finally{
                    expect(e).to.have.a.property('message');
                };
            });
        });
    });
});