const errorHandler = (err, req, res, next) => {
    console.log(err)

    if (err.message.includes('duplicate key error collection')) {
        err.message = 'Must be unique.'
    } else if (err.message.includes('validation failed: password:')) {
        err.message = 'Password must be between 6 and 50 characters.'
    } else if (err.message.includes('validation failed: name:')) {
        err.message = 'Name must be between 1 and 15 characters.'
    }
    
    res.status(500).json({ message: String(err.message) });
};

module.exports = errorHandler;