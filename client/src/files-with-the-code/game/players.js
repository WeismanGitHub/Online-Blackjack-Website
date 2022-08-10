import React, { useState, useEffect } from 'react';

function Players({ socket, gameId }) {
    const [players, setPlayers] = useState([]);
    
    useEffect(() => {
        socket.on('sendAllPlayers', (players) => {
            setPlayers(players)
        })

        socket.on('connect_error', (err) => {
            console.log(err.message)
        })
    }, [socket]);

    socket.emit('getAllPlayers', { gameId: gameId })


    return (
        <div class='playersBox'>
           {players.map(player => {
                return (<>
                    {player.name}
                    <br/>
                </>)
            })}
        </div>
    )
}


export default Players;
