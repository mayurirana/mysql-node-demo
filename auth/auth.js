const { USE_PROXY } = require('http-status');
const jwt = require('jsonwebtoken');
const { RANDOM } = require('mysql/lib/PoolSelector');

async function generateAccessToken(email) {
    try {
        const jti = RANDOM(32).toString('hex');
        const jwtToken = jwt.sign({
            jti,
            email,
        },
            process.env.SECRET, {
            expiresIn: '1 day'
        })
        return jwtToken;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    generateAccessToken
}