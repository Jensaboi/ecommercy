import { randomUUID } from "crypto";

export function sIdMiddleware(req, res, next) {
  if (!req.session.sId) {
    req.session.sId = randomUUID();
  }

  next();
}
