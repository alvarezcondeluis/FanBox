

export const authorizationMiddleware = (req, res, next) => {
  const userIdFromToken = req.userId;
  const userIdFromParams = req.params.userID;

  if (userIdFromToken !== userIdFromParams) {
    return res.status(403).json({ error: 'Forbidden: You do not have access to this resource', code: 'FORBIDDEN' });
  }

  next();
};
