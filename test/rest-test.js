const chai = require('chai');
const supertest = require('supertest');
const expect = chai.expect;
const assert = chai.assert;
const app = require('../index');


describe('REST API', () => {
  before(() => {
  });
  it('GET /order returned status 200 & array', done => {
    supertest(app)
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
});