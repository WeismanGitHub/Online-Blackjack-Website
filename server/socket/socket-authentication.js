const jwt = require('jsonwebtoken');

function authenticationMiddleware(socket, next) {
    socket.user = jwt.verify(socket.handshake.auth.token, process.env.JWT_SECRET)
    .catch(err => next(err))
    next();
};

module.exports = authenticationMiddleware