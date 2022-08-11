import { ToastContainer, toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const axios = require('axios').default;

function Players({ socket, gameId }) {
    const [players, setPlayers] = useState([]);
    
    useEffect(()=>{
        axios.get('/api/v1/game/players').then(res => {
            setPlayers(res.data)
        }).catch(error => {
            toast.error(error.response.data.message)
        })
            
        socket.emit('getAllPlayers', { gameId: gameId })
    }, [])

    useEffect(() => {
        socket.on('sendAllPlayers', (players) => {
            setPlayers(players)
        })

        socket.on('connect_error', (err) => {
            console.log(err.message)
        })
    }, [socket]);



    return (
        <div class='playersBox'>
           {players.map(player => {
                return (<>
                    {player.name}
                    <br/>
                    <br/>
                </>)
            })}
            <ToastContainer/>
        </div>
    )
}


export default Players;
