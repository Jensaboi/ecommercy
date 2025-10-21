export function authRequired(req, res, next) {
  const { userId } = req.session;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  next();
}
