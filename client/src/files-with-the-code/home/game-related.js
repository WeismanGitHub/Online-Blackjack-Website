import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { cookieExists } from '../../helpers'
const axios = require('axios').default;

function GameRelated() {
    const navigate = useNavigate();

    function joinGame(event) {
        event.preventDefault();
        
        axios.post('/api/v1/game/join', { gameId: event.target[0].value })
        .then(res => {
            navigate('/game');
        }).catch(error => {
            toast.error(error.response.data.message)
        })
    }

    function rejoinGame(event) {
        event.preventDefault()
        navigate('/game')
    }

    function leaveGame(event) {
        event.preventDefault();

        axios.post('/api/v1/game/leave')
        .then(res => {
            navigate('/');
        }).catch(error => {
            toast.error(error.response.data.message)
        })
    }

    function createGame(event) {
        event.preventDefault();

        axios.post('/api/v1/game/create')
        .then(res => {
            navigate('/game');
        }).catch(error => {
            toast.error(error.response.data.message)
        })
    }

    if (cookieExists('gameId')) {
        return (
            <div className='leftColumn'>
                <br/>
                <button className='bigButton' onClick={rejoinGame}>
                    Rejoin Game
                </button>
                <br/>
                <br/>
                <button className='bigButton' onClick={leaveGame}>
                    Leave Game
                </button>
            </div>
        )
    } else {
        return (
            <div className='leftColumn'>
                <br/>
                <button className='bigButton' onClick={createGame}>
                    Create Game
                </button>
                <br/>
                <br/>
                <div className='entryForm'>
                    <form onSubmit={joinGame}>
                        Enter Game Id
                        <br/>
                        <input type='text' name='gameId' maxlength='24' minlength='24' placeholder='****' />
                        <br/>
                        <button type='submit'>Join Game</button>
                    </form>
                    <ToastContainer/>
                </div>
            </div>
        )
    }
}

export default GameRelated