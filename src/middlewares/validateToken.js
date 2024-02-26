import  jwt  from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired =  (req, res, next /* si hay un token continua */) => {
     const {token} = req.cookies;
     
     if(!token) return res.status(401).json({message: "No existe el token, autorización denegada"});

     jwt.verify(token, TOKEN_SECRET, (err, user) => {
          if(err) return res.status(401).json({message: "Token invalido"});
          req.user = user;
     });

     next();
}
