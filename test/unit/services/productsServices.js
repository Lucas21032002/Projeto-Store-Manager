const sinon = require('sinon');
const { expect } = require('chai')
const models = require('../../../models/productsModels');
const services = require('../../../services/productServices');

describe('SERVICES - GETALL - busca todos os produtos', () => {
    before(() => {
        const retorno = [[
        { id: 1, name: 'Martelo de Thor', quantity: 10 },
        { id: 2, name: 'Traje de encolhimento', quantity: 20 },
        { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
      ]];
      sinon.stub(models, 'getAllProducts').resolves(retorno)
    })
    after(() => {
        models.getAllProducts.restore();
    })
    describe('quando a busca é feita com sucesso', () => {
        it('retorna um array com os produtos', async ()=> {
            const res = await services.getAllProducts();
            expect(res).to.be.a('array')
        });
    });
});

describe('SERVICES - GETPRODUCTBYID - busca um produto pelo seu ID', () => {
   describe('testando função getProductsById', () => {
       const payload = 1;
       before(() => {
           const retorno = [[{ id: 2, name: 'Traje de encolhimento', quantity: 20 }]];
           sinon.stub(models, 'getProductById').resolves(retorno);
       })
       after(() => {
           models.getProductById.restore();
       })
       describe('quando a busca é bem sucedida', () => {
           it('retorna um objeto com o produto', async () => {
               const [[res]] = await services.getProductById(payload);
               expect(res).to.be.a('object')
           })
       })
   })
   describe('getById false', () => {
       const payload = 2;
       before(() => {
           sinon.stub(models, 'getProductById').resolves(false);
       })
       after(() => {
           models.getProductById.restore();
       })
    describe('quando a busca é feita sem sucesso', () => {
        it('retorna um objeto de erro', async () => {
            try{
                await services.getProductById(payload)
            } catch (err){
                e = err;
            } finally{
                expect(e).to.haveOwnProperty('message');
                expect(e.message).to.equal('Product not found')
            };
        });
    });
   });
});
describe('SERVICES - GETPRODUCTBYNAME - Busca determinado produto pelo nome', () => {
    const payload = 'Martelo do Thor';
    before(() => {
        const retorno = [{ id: 1, name: 'Martelo de Thor', quantity: 10 }];
      sinon.stub(models, 'getProductByName').resolves(retorno)
    })
    after(() => {
        models.getProductByName.restore();
    })
    describe('quando a busca é feita com sucesso', () => {
        it('retorna um objeto com o produto', async ()=> {
            const [res] = await services.getProductByName(payload);
            expect(res).to.be.a('object')
            expect(res).to.have.a.property('id');
            expect(res).to.have.a.property('name');
            expect(res).to.have.a.property('quantity');
        });
    });
});
describe('SERVICES - UPDATE - atualiza um produto', () => {
    describe('testando função de atualização', () => {
        const payload = (1, 'nome-teste', 10)
        before(() => {
            const retorno = [{ insertId: 1 }];
          sinon.stub(models, 'updateProduct').resolves(retorno)
          sinon.stub(models, 'getProductById').resolves(1)
        })
        after(() => {
            models.updateProduct.restore();
            models.getProductById.restore();
        })
        describe('quando é atualizado com sucesso', () => {
            it('retorna um id', async ()=> {
                const [{ insertId }] = await services.updateProduct(payload);
                expect(insertId).to.be.a('number')
            });
        });
    })
    describe('testando função em caso de erro', () => {
        const payload = (1, 'nome-teste', 10)
        before(() => {
            const retorno = [{ insertId: 1 }];
          sinon.stub(models, 'updateProduct').resolves(retorno)
          sinon.stub(models, 'getProductById').resolves()
        })
        after(() => {
            models.updateProduct.restore();
            models.getProductById.restore();
        })
        describe('caso não seja atualizado com sucesso', () => {
            it('retorna um objeto de erro', async () => {
                try{
                    await services.updateProduct(payload);
                } catch(err){
                    e = err
                } finally{
                    expect(e).to.have.a.property('message');
                    expect(e.message).to.equal('Product not found');
                };
            });
        });
    });
});
