export async function adminRequired(req, res, next) {
  const { userId, userRole } = req.session;

  if (!userId || userRole !== "ADMIN")
    return res.status(403).json({ error: "Forbidden." });

  next();
}
