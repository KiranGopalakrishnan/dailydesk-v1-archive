const PROTO_PATH = __dirname + '/../../../protobuf/src/main/proto/bifrost.proto';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const BifrostAuth = grpc.loadPackageDefinition(packageDefinition).Bifrost;
const client = new BifrostAuth('localhost:30043', grpc.credentials.createInsecure());

export { client };
