const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
chai.use(chaiHttp);
const rootUrl = 'http://localhost:3000';

describe('REST API', () => {
  let server;
  before(() => {
    server = chai.request(rootUrl);
    const app = require('../index');
    app.listen();
  });
  it('GET /order returned status 200 & array', (done) => {
    server
      .get('/order')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        console.log(res)
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