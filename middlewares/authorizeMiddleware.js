const authorizeMiddleware = (permittedRoles) => {
  return (req, res, next) => {
    let role = req.role;
    if (!permittedRoles.includes(role)) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Only Sellers Can Add Products" });
    }
    next();
  };
};

module.exports = authorizeMiddleware;
