const errorHandler = (err, req, res, next) => {
    console.log(err)
    
    res.status(500).json({ message: String(err.message) });
};

module.exports = errorHandler;