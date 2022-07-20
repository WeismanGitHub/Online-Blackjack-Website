const errorHandler = (err, req, res, next) => {
    console.log(err)

    if (err.message.includes('duplicate key error collection')) {
        err.message = 'Must be unique.'
    }

    res.status(500).json({ message: String(err.message) });
};

module.exports = errorHandler;