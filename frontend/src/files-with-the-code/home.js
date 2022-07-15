import { useNavigate } from 'react-router-dom';
import { cookieExists } from '../helpers'
import React from 'react';

import AccountRelated from './home/account-related'
import GameRelated from './home/game-related'

function Home() {
    const navigate = useNavigate()

    React.useEffect(()=> {
        if (!cookieExists('token')) {
            navigate('/authentication')
        }
    }, [])

    return (
        <>
            <AccountRelated/>
            <GameRelated/>
        </>
    )
}

export default Home;
