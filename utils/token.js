import jwt from "jsonwebtoken";

export const createAccessToken = (user) =>
  jwt.sign(user, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

export const createRefreshToken = (user) =>
  jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

export const verifyRefreshToken = (token) =>
  jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);

export const verifyAccessToken = (token, req, res, next) =>
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) {
      res.status(401).send({
        type: "token error",
        message: "Invalid Token, you need to login",
      });
    } else {
      req.user = decode;
      next();
    }
  });
