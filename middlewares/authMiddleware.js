import { verifyAccessToken } from "../utils/token.js";

export const authorize = (req, res, next) => {
  const authorization = req.headers["authorization"]; //get Authorization fom request headers...

  if (!authorization)
    return res
      .status(404)
      .json({ type: "token error", message: "you need to login" });

  const token = authorization.split(" ")[1]; //Bearer XXXXXXXXX.

  verifyAccessToken(token, req, res, next); //verify user
};
