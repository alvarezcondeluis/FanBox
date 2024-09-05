

export const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ error: 'Forbidden: You do not have access to this resource', code: 'UNAUTHORIZED' });
    }
    next();
  };
};
