const chai = require('chai');
const supertest = require('supertest');
const expect = chai.expect;
const assert = chai.assert;
const app = require('../index');


describe('REST API', () => {
  let server;
  before(() => {
    server = supertest(app);
  });
  it('GET /order returned status 200 & array', done => {
    server
      .get('/order')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) {
          console.error(err);
          done();
        }
        assert.equal(res.status, 200);
        assert.ok(res.body);
        expect(res.body).to.be.a('array');
        done();
      });
  });
  it('POST /order returned status 200 & object with status "Заказано"', done => {
    server
      .post('/order')
      .send({
        title: 'cake',
        status: 'Заказано'
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) {
          console.error(err);
          done();
        }
        assert.equal(res.status, 200);
        assert.ok(res.body);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('status').to.be('Заказано');
        assert.equal(res.body.status, 'Заказано');
        done();
    });
  });
});