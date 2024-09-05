import winston from 'winston';

// Configuración del logger
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),  // Imprimir logs en la consola
  ]
});

export default logger;
