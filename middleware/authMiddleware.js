const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]
  
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed: no token provided' })
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Authentication failed: invalid token' })
      }
  
      req.user = decoded
      next()
    })
}

module.exports = authMiddleware