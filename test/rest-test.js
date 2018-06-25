const supertest = require('supertest');
const expect = require('chai').expect;

describe('REST API', () => {
  let server;
  before(() => {
    const call = require('../index');
    call()
      .then(() => server = supertest.agent('http://localhost:3000'))
      .catch(err => console.log(err));
  });
  it('GET /order returned status 200 & array', (done) => {
    server
      .get('/order')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) { 
          console.error(err)
          done(); 
        }
        assert.equal(res.status, 200);
        assert.ok(res.body);
        expect(res.body).to.be.a('array');
        done(); 
      });
  });
});