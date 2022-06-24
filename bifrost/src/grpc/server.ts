import { User, UserStatus } from '../resources/users/user-service';
import { ServerUnaryCall } from '@grpc/grpc-js';
import { sendUnaryData } from '@grpc/grpc-js/src/server-call';
import { verifyJWT } from '../utils/jwt';
import { logger } from '../logger';

const PROTO_PATH = __dirname + '/../../../protobuf/src/main/proto/bifrost.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
// Suggested options for similarity to existing grpc.load behavior
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const bifrostProto = grpc.loadPackageDefinition(packageDefinition);

// The protoDescriptor object has the full package hierarchy
const server = new grpc.Server();

const initGRPC = async () => {
  server.addService(bifrostProto.Bifrost.service, {
    verify: (
      call: ServerUnaryCall<{ token: string },  User>,
      callback: sendUnaryData<User>
    ) => {
      try {
        const token  =  call.request.token;
        logger.info(`Bifrost gRPC verification request with token - ${token}`)
        const verifiedToken = verifyJWT<User>(token);
        logger.info(verifiedToken)
        callback(null,  verifiedToken.payload);
      } catch (e: any) {
        callback(Error(e));
      }
    },
  });

  await new Promise((resolve, reject) => {
    server.bindAsync(
      '127.0.0.1:30043',
      grpc.ServerCredentials.createInsecure(),
      (err: Error, result: number) => (err ? reject(err) : resolve(result))
    );
  });

  server.start();

  console.log('Bifrost GRPC Server running at http://127.0.0.1:30043');
};

export { initGRPC };
