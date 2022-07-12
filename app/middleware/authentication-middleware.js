const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        throw new Error('Authentication Invalid');
    }
    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: payload._id, name: payload.name};
        next();
    } catch (error) {
        res.status(StatusCodes.NETWORK_AUTHENTICATION_REQUIRED).redirect('/authentication')
    }
};

module.exports = authentication