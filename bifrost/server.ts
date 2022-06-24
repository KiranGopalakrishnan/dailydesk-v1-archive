import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import { morganMiddleware } from './src/logger/morgan-middleware';
import { logger } from './src/logger';
import { HttpException } from './src/utils/http/HttpException';
import { handleError } from './src/utils/http/handle-error';
import { decodeHeader, decodeRefreshToken } from './src/utils/http/handle-jwt-auth';

import { router as tokens } from './src/resources/tokens/tokens';
import { usersRoute } from './src/resources/users/usersRouter';
import { autoLoginRouter } from './src/resources/auto/auto-login';
import { currentRoute } from './src/resources/current/current';
import nocache from 'nocache';
import { initGRPC } from './src/grpc/server';
import { client } from './src/grpc/client';

const router = express.Router();
const authenticatedRouter = express.Router();
const refreshDecoderRouter = express.Router();
const app = express();
const PORT = process.env.PORT || 8000;

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

authenticatedRouter.use(decodeHeader);
refreshDecoderRouter.use(decodeRefreshToken);
app.use(cookieParser());

app.use(morganMiddleware);
app.use(morgan('tiny', { stream: logger.stream }));
app.use(nocache());

app.use('/tokens', authenticatedRouter.use(tokens));
app.use('/users', router.use(usersRoute));
app.use('/current', authenticatedRouter.use(currentRoute));
app.use('/auto', refreshDecoderRouter.use(autoLoginRouter));

initGRPC();

app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  handleError(err, res);
});

app.listen(PORT, () => {
  logger.info(`⚡️[server]: Server is running on ${PORT}`);
});
