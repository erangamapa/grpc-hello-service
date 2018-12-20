const proxyquire = require('proxyquire-2');
const expect = require('chai').expect;
const sinon = require('sinon');


describe('Should serve the greeting accordingly', function() {
  let server = null;
  it('should return invalid token message', function(){
    //mock dependencies in server
    server = proxyquire('../server', {
      jsonwebtoken: {
        verify: (token, secret, cb) => {
          //should send token invalid error
          cb({message: 'invalid token'}, null);
        }
      }
    });
    let call = {metadata: {_internal_repr: {token: 'incorrecttoken'}}};
    let spy = sinon.spy();
    server.sayHello(call, spy);
    expect(spy.calledOnceWith({success: false, message: 'Token is not valid'})).to.equal(true);
  });
  it('should return valid token message', function(){
    //mock dependencies in server
    server = proxyquire('../server', {
      jsonwebtoken: {
        verify: (token, secret, cb) => {
          //should send decoded proper payload
          cb(null, {username: 'Testname'});
        }
      }
    });
    let call = {metadata: {_internal_repr: {token: 'correcttoken'}}};
    let spy = sinon.spy();
    server.sayHello(call, spy);
    expect(spy.calledOnceWith(null, {message: `Hello Testname`})).to.equal(true);
  });
});