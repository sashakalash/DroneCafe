const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const rootUrl = 'http://localhost:3000';

describe('REST API', () => {
  let server;
  before(() => {
    server = chai.request(rootUrl);
    const call = require('../index');
    call();
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