const chai = require('chai');
let chaiHttp = require('chai-http');
// const supertest = require('supertest');
const expect = chai.expect;
const assert = chai.assert;
const app = require('../index');
chai.use(chaiHttp);



describe('REST API', () => {
  it('GET /order returned status 200 & array', done => {
    chai.request(app)
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
    chai.request(app)
      .post('/order')
      .send({title: 'cake', status: 'Заказано'})
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
        expect(res.body).to.have.property('result').to.have.property('ok');
        done();
    });
  });
});