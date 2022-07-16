import { useNavigate } from 'react-router-dom';
import { cookieExists } from '../helpers'
import Lobby from './game/lobby'
import Play from './game/play'
import React from 'react';
const axios = require('axios').default;

async function Game() {
    const navigate = useNavigate()
    const [gameStage, setGameStage] = React.useState((await axios.get('/api/v1/game')).stage);

    React.useEffect(()=> {
        if (!cookieExists('gameId')) {
            navigate('/')
        }
    }, [])

    if (gameStage == 'Lobby') {
        return <Lobby/>
    } else {
        return <Play/>
    }
}

export default Game;
