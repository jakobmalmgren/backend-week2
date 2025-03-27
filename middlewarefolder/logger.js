// import { createLogger, format, transports } from "winston";

// const { combine, timestamp, printf } = format;

// //  skapa ett anpassat loggformat som ska inkluderar tidpunkt, nivå och meddelande
// const logFormat = printf(({ level, message, timestamp }) => {
//   return `${timestamp} [${level.toUpperCase()}]:${message}`;
// });

// // skapa min logger med Winston biblioteket
// const logger = createLogger({
//   // Kombinera flera format
//   format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
//   transports: [
//     // skapa en loggfil där alla loggar sparas
//     new transports.File({
//       filename: "logs/combined.log",
//     }),
//     // new transports.Console(),
//     new transports.Console({ format: combine(format.colorize(), logFormat) }),
//   ],
// });

// // Skapa middleware funktionen som loggar alla inkommande request
// function logRequests2(req, res, next) {
//   logger.info(`${req.method} ${req.url}`);
//   next();
// }

// export { logger, logRequests2 };

/////////////////////////////////////////////////////////////
