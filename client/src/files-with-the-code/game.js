import { useNavigate } from 'react-router-dom';
import { cookieExists } from '../helpers'
import io from 'socket.io-client';
import Lobby from './game/lobby'
import Play from './game/play'
import Chat from './game/chat'
import React from 'react';
const axios = require('axios').default;

function Game() {
    const navigate = useNavigate()

    React.useEffect(()=> {
        if (!cookieExists('gameId')) {
            navigate('/')
        }
        
    }, [])
    
    const socket = io.connect('http://localhost:5000/');

    socket.emit("join_room", 'hello world')
    
        return (
            <>
                <Lobby/>
                <Chat/>
            </>
        )
}

export default Game;
