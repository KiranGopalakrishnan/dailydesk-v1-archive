const winston = require('winston');
const alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.label({
    label: '[LOGGER]:',
  }),
  winston.format.timestamp({
    format: 'YY-MM-DD HH:MM:SS',
  }),
  winston.format.printf(
    (info: { label: any; timestamp: any; level: any; message: any }) =>
      `${info.label} ${info.timestamp} ${info.level} : ${info.message}`
  )
);
export const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      timestamp: true,
      format: winston.format.combine(winston.format.colorize(), alignColorsAndTime),
    }),
  ],
  exceptionHandlers: [new winston.transports.File({ filename: 'exceptions.log' })],
});

logger.stream = {
  write: function (message: string) {
    logger.info(message);
  },
};

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
