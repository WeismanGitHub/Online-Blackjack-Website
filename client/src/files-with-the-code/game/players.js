import React, { useState, useEffect } from 'react';

function Players({ socket, gameId }) {
    const [players, setPlayers] = useState([]);
    
    useEffect(()=>{
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
        </div>
    )
}


export default Players;
