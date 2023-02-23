const { BAD_REQUEST, UNAUTHORIZED } = require("http-status");
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const authUser = req.headers['authorization'];
    const token = authUser && authUser.split(' ')[1];
    if (token == null) return res.status(BAD_REQUEST).json({
        message: 'Token is required',
    })
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) return res.status(UNAUTHORIZED).json({
            message: 'Token is expired or invalid'
        })
        req.user = user;
        next()
    })
}