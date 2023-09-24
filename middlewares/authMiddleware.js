import jwt from "jsonwebtoken";

export const authorize = (req, res, next) => {
  const authorization = req.headers['authorization'];

  if (!authorization)
    return res.status(404).json({ message: "you need to login" });

  const token = authorization.split(" ")[1]; //Bearer XXXXXXXXX.
  const user = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

  if (user) next();
};
