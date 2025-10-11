export function authRequired(req, res, next) {
  const { userId } = req.session;
  console.log(req.session);
  if (!userId) {
    console.log("Blocked unauthorized user from route.");
    return res.status(401).json({ message: "Unauthorized." });
  }

  next();
}
