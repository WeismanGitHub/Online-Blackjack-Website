import { useNavigate } from 'react-router-dom';
import { cookieExists } from '../helpers'
import React from 'react';

function Game() {
    const navigate = useNavigate()

    React.useEffect(()=> {
        if (!cookieExists('gameId')) {
            navigate('/')
        }
    }, [])

    return (
        <>
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
        </>
    )
}

export default Game;
