const grpc = require('grpc');
const jwt = require('jsonwebtoken');
const protoLoader = require('@grpc/proto-loader');
const TEST_SECRET = 'MYTESTSECRET';
const packageDefinition = protoLoader.loadSync(
  __dirname + '/greeting.proto',
  {keepCase: true,
   longs: String,
   enums: String,
   defaults: true,
   oneofs: true
  });
const hello_proto = grpc.loadPackageDefinition(packageDefinition);

function sayHello(call, callback) {
  // extract the token from meta and removed Bearer type
  let token = call.metadata._internal_repr.token[0]
  token = call.metadata._internal_repr.token[0].slice(7, token.length);

  //verify token
  jwt.verify(token, process.env.SECRET || TEST_SECRET, (err, decoded) => {
    if (err) {
      callback({success: false, message: 'Token is not valid'});
    } else {
      callback(null, {message: `Hello ${decoded.username}`});
    }
  });
}

// run the server if not testing
if(process.env.ENV != 'TEST'){
  let server = new grpc.Server();
  let port = process.env.SECRET || 6020;

  //add service to the server
  server.addService(hello_proto.Greeter.service, {sayHello: sayHello});

  //bind and run server in default route ip
  server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
  server.start();
  console.log('Server started and listning for requests');
}

module.exports = {sayHello: sayHello};