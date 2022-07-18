import React from 'react';
const axios = require('axios').default;

function Lobby() {
    return (
        <div class='rightColumn60Percent'>
            {/* {players.map(player => {
                axios.get('/apiv/1/user/' + player._id).then(player => {
                    return player.name
                })
            })} */}
            test
        </div>
    )
    axios.get('/api/v1/game').then(players => {
    }).catch(err => {
        console.log(err)
    })
}

// ACE
/* <>
    <div class='centered'>
        <div className='card'>
            <br/>
            <div class='name'>
                Ace
            </div>
            <span class='icon'>
                &#9824;
            </span>
        </div>
    </div>
</> */

export default Lobby;
