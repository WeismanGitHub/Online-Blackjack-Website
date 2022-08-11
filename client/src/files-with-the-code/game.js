import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import { cookieExists } from '../helpers'
import React, { useState } from 'react';
import { getCookie } from '../helpers'
import io from 'socket.io-client';
import Players from './game/players'
import Chat from './game/chat'
import Play from './game/play'
import axios from 'axios'

function Game() {
    const navigate = useNavigate()

    React.useEffect(()=> {
        if (!cookieExists('gameId')) {
            navigate('/')
        }
    }, [])

    const gameId = getCookie('gameId')
    const socket = io.connect('/')
    socket.gameId = gameId
    
    socket.emit('joinGame', { gameId: gameId })

    function leaveGame(event) {
        event.preventDefault();
        
        axios.post('/api/v1/game/leave')
        .then(res => {
            socket.emit('updateAllPlayers', { gameId: gameId })
            socket.emit('leaveGame', { gameId: gameId })
            navigate('/');
        })
        .catch(err => {
            toast.error(err.response.data.message)
        })
    }

    function copyId(event) {
        event.preventDefault()
        navigator.clipboard.writeText(gameId)
        .then(() => {
            toast('Copied!')
        })
    }

    return (
        <>
            <Chat socket={socket} gameId={gameId}/>
            <button className='leaveGameButton' onClick={leaveGame}>
                Leave Game
            </button>
            <button class='copyIdButton' onClick={copyId}>Copy Game ID</button>
            <Players socket={socket} gameId={gameId}/>
            <ToastContainer/>
        </>
    )
}

export default Game;
