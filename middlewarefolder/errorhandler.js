import { logger } from "./logger.js";

// Middelware för att hantera fel i vår Express-app

function errorHandler(err, req, res, next) {
  logger.error(`Fel:${err.message}`);
  // Skicka svaret som JSON med en statuskod
  res.status(500).json({
    error: "Serverfel",
    message: `${err.message}`,
  });
}

export default errorHandler;
