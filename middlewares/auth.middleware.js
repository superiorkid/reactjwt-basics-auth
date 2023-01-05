import jwt from "jsonwebtoken";

require('dotenv').config()

export const authMiddleware = async (req, res, next) => {
   try {
       const token = req.headers["authorization"].split(" ")[1]
       jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
           if (err) {
               return res.status(401).json({
                   status: "UNAUTHORIZED",
                   code: 401,
                   message: "Auth failed"
               })
           }

           req.body.userId = decoded.id
           next()
       })
   } catch (error) {
       return res.status(401).json({
           status: "UNAUTHORIZED",
           code: 401,
           message: "Auth failed"
       })
   }
}
