const sinon = require('sinon');
const { expect } = require('chai')
const controllers = require('../../../controllers/productsController');
const services = require('../../../services/productServices');

describe('CONTROLLERS - PRODUCTS - GETALL - busca todos produtos', () =>{
    describe('quando a busca é feita com sucesso', () => {
        const req = {};
        const res = {};
        before(async() => {
            req.body = {}
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(services, 'getAllProducts').resolves(true);
        })
        after(() => {
            services.getAllProducts.restore();
        })
        it('retorna o código 200(sucesso)', async () => {
            await controllers.getAllProducts(req, res);
            expect(res.status.calledWith(200)).to.be.equal(true);
        })
    })
})

describe('CONTROLLERS - PRODUCTS - GETBYID - busca determinado produto pelo id', () =>{
    describe('quando a busca é feita com sucesso', () => {
        const req = {};
        const res = {};
        before(async() => {
            req.params = { id: 1}
            req.body = {}
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(services, 'getProductById').resolves(true);
        })
        after(() => {
            services.getProductById.restore();
        })
        it('retorna o código 200(sucesso)', async () => {
            await controllers.getProductById(req, res);
            expect(res.status.calledWith(200)).to.be.equal(true);
        })
    })
    describe('quando a busca é feita sem sucesso', () => {
        const req = {};
        const res = {};
        before(async() => {
            req.params = { id: 1}
            req.body = {}
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(services, 'getProductById').throws(() => new Error('Product not found'));
        });
        after(() => {
            services.getProductById.restore();
        });
        it('retorna o código 404', async () => { 
            await controllers.getProductById(req, res);
            expect(res.status.calledWith(404)).to.be.equal(true)
        });
    });
});

describe('CONTROLLERS - PRODUCTS - UPDATE - atualiza um produto no banco', () =>{
    describe('quando é atualizado com sucesso', () => {
        const req = {};
        const res = {};
        before(async() => {
            req.body = {
                name: 'bow',
                quantity: 3
            };
            req.params = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(services, 'updateProduct').resolves(true);
            sinon.stub(services, 'getProductById').resolves(true);
        })
        after(() => {
            services.updateProduct.restore();
            services.getProductById.restore();
        })
        it('retorna o código 200(sucesso)', async () => {
            await controllers.updateProduct(req, res);
            expect(res.status.calledWith(200)).to.be.equal(true);
        })
    })
    describe('quando é atualizado sem sucesso', () => {
        const req = {};
        const res = {};
        before(async() => {
            req.body = {
                name: 'bow',
                quantity: 3
            };
            req.params = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(services, 'updateProduct').throws(() => new Error('Product not found'))
            sinon.stub(services, 'getProductById').resolves(false);
        })
        after(() => {
            services.updateProduct.restore();
            services.getProductById.restore();
        })
        it('retorna o código 404(not found)', async () => {
            await controllers.updateProduct(req, res);
            expect(res.status.calledWith(404)).to.be.equal(true);
        })
    })

})

describe('CONTROLLERS - PRODUCTS - DELETE - remove um produto no banco', () =>{
    describe('quando é removido com sucesso', () => {
        const req = {};
        const res = {};
        before(async() => {
            req.body = {
                name: 'bow',
                quantity: 3
            };
            req.params = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(services, 'deleteProduct').resolves(true);
            sinon.stub(services, 'getProductById').resolves(true);
        })
        after(() => {
            services.deleteProduct.restore();
            services.getProductById.restore();
        })
        it('retorna o código 204(sucesso)', async () => {
            await controllers.deleteProduct(req, res);
            expect(res.status.calledWith(204)).to.be.equal(true);
        })
    })
    describe('quando é atualizado sem sucesso', () => {
        const req = {};
        const res = {};
        before(async() => {
            req.body = {
                name: 'bow',
                quantity: 3
            };
            req.params = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(services, 'deleteProduct').throws(() => new Error('Product not found'))
            sinon.stub(services, 'getProductById').resolves(false);
        })
        after(() => {
            services.deleteProduct.restore();
            services.getProductById.restore();
        })
        it('retorna o código 404(not found)', async () => {
            await controllers.deleteProduct(req, res);
            expect(res.status.calledWith(404)).to.be.equal(true);
        })
    })

})
