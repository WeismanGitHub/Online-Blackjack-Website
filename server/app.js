const cookieParser = require('cookie-parser');
const compression = require('compression');
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const http = require("http");
const path = require('path');
const cors = require('cors');

require('express-async-errors');
require('dotenv').config();

const errorHandler = require('./middleware/error-handler')
const authenticationMiddleware = require('./middleware/authentication-middleware')

const authenticationRouter = require('./routers/authentication-router')
const userRouter = require('./routers/user-router')
const gameRouter = require('./routers/game-router')
const socketHandler= require('./socket/socket-handler')

const app = express();
app.use(express.static(path.join(__dirname, '../', 'client', 'build')))
app.use(cors());

const server = http.createServer(app)
const io = new Server(server);

io.on('connection', socketHandler);

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors())

app.use((req, res, next) => {
    res.deleteAllCookies = function () {
        for (let cookie of Object.keys(req.cookies)) {
            res.clearCookie(cookie)
        }
        return this
    }
    next()
})

app.use('/api/v1/authentication', authenticationRouter)
app.use('/api/v1/user', authenticationMiddleware, userRouter)
app.use('/api/v1/game', authenticationMiddleware, gameRouter)

app.get('*', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../client/build/') });
});

app.use(errorHandler)

const start = async () => {
    try {
        const port = process.env.PORT || 5000
        mongoose.connect(process.env.LOCAL_MONGO_URI, { autoIndex: true })
        console.log('Connected to database...')
        server.listen(port, console.log(`Server is starting on ${port}...`));
    } catch (err) {
        console.error(err);
    };
};

start()