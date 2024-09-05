import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined in the environment variables.');
}

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided', code: 'UNAUTHORIZED' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;
    req.userRole = decoded.userRole; 
   
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: 'Invalid token', code: 'INVALID_TOKEN' });
  }
};
