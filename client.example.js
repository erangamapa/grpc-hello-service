const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

//sample real token to test the server
const TOKEN = '<your token here>';

//load prototype
const packageDefinition = protoLoader.loadSync(
  __dirname + '/greeting.proto',
  {keepCase: true,
   longs: String,
   enums: String,
   defaults: true,
   oneofs: true
  });
const hello_proto = grpc.loadPackageDefinition(packageDefinition);

function main() {
  let port = process.env.SECRET || 6020;
  const client = new hello_proto.Greeter(`localhost:${port}`, grpc.credentials.createInsecure());

  //attach 
  const meta = new grpc.Metadata();
  meta.add('token', `Bearer ${TOKEN}`);

  //access the service defined by prototype
  client.sayHello({username: 'aaaa'}, meta, function(err, response) {
    if(err){
      console.log('Error: ' + err);
    } else {
      console.log('Greeting: ', response.message);
    }
  });
}

main();