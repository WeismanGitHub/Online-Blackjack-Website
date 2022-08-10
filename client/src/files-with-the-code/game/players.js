import React, { useState, useEffect } from 'react';

function Players({ socket }) {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        socket.on('addPlayer', (player) => {
            if (!players.includes(player)) {
                setPlayers((players) => [...players, player])
            }
        });

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
                </>)
            })}
        </div>
    )
}


export default Players;
