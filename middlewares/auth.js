const jwt = require('jsonwebtoken')

const verifyUser = (req, res, next) => {
    console.log("Inside the middleware");
    const token = req.headers.authorization
    if(!token) return res.status(401).json({ error : "Token not found"})
    token = token.split(' ')[1]
    jwt.verify(token, process.env.SECRET, (err, payload) => {
        if(err) return res.status(500).json({ err : err.message})
        req.user = payload
        next()
    })
}

module.exports = { verifyUser }