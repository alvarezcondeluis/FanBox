import { ServiceError } from '../utils/serviceError.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Registra el error en la consola del servidor
  console.log(err + "handler");

  let message = 'Internal Server Error';
  let statusCode = 500;
  let code = 'INTERNAL_ERROR';

  if (err instanceof ServiceError) {
    message = err.message;
    code = err.code;

    switch (err.code) {
      case 'VALIDATION_ERROR':
      case 'INVALID_QUANTITY':
        statusCode = 400;
        break;
      case 'NOT_FOUND':
        statusCode = 404;
        break;
      case 'ADDRESS_MISMATCH':
      case 'INVALID_PASSWORD':
      case 'INVALID_TOKEN':
      case 'UNAUTHORIZED':
        statusCode = 403;
        break;
      case 'INSUFFICIENT_STOCK':
        statusCode = 409;
        break;
      case 'DATABASE_ERROR':
        statusCode = 500;
        message = 'Database error';
        break;
      default:
        statusCode = 500;
    } 
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    // Manejar el error de entrada duplicada (Sequelize)
    statusCode = 409;
    code = 'DUPLICATE_ENTRY';

    // Obtener información específica del error
    const field = err.errors[0]?.path; // Campo que causó la violación de unicidad
    const value = err.errors[0]?.value; // Valor que causó la violación
    message = `Duplicate entry detected for field '${field}': '${value}'`;

  } else if (err.name === 'SequelizeValidationError') {
    // Manejar errores de validación de Sequelize
    statusCode = 400;
    message = 'Validation error';
    code = 'VALIDATION_ERROR';
  } else if (err.parent && err.parent.code === 'ER_DUP_ENTRY') {
    // Manejo adicional de errores de duplicado si el error está en parent
    statusCode = 409;
    message = err.parent.sqlMessage || 'Duplicate entry detected';
    code = 'DUPLICATE_ENTRY';
  } else if (err.name === 'SequelizeDatabaseError') {
    // Manejar otros errores de la base de datos
    statusCode = 500;
    message = 'Database error';
    code = 'DATABASE_ERROR';
  }

  res.status(statusCode).json({ error: message, code });
};

export default errorHandler;
