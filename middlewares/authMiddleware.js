import { verifyAccessToken } from "../utils/token.js";

export const authorize = (req, res, next) => {
  const authorization = req.headers['authorization'];//get Authorization fom request headers...

  if (!authorization)
    return res.status(404).json({ message: "you need to login" });

  const token = authorization.split(" ")[1]; //Bearer XXXXXXXXX.
  
  const user = verifyAccessToken(token);//verify user
  
  if (user) next();
};
