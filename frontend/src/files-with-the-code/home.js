import { useNavigate } from 'react-router-dom';
import { cookieExists } from '../helpers'
import GameRelated from './home/game-related'
import React from 'react';

function Home() {
    const navigate = useNavigate()

    React.useEffect(()=> {
        if (!cookieExists('token')) {
            navigate('/authentication')
        }
    }, [])

    return (
        <>
            <GameRelated/>
        </>
    )
}

export default Home;
