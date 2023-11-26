const jwt = require('jsonwebtoken');
const {
    TOKEN_KEY
  } = process.env;


const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(!token){
        return res.status(403).send('token requerido')
    }
    try {
        const decoded=jwt.verify(token,TOKEN_KEY);

        req.user=decoded;


    } catch (error) {
      return  res.status(401).send('token invalido')
    }
    return next()
}

module.exports =verifyToken;