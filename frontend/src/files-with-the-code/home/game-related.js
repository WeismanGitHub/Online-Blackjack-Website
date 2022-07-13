import { ToastContainer, toast } from 'react-toastify';
import { cookieExists, getCookie } from '../../helpers'
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios').default;

function GameRelated() {
    async function joinGameHandler(event) {
        event.preventDefault();
    }
    
    if (cookieExists('gameId')) {
        return (
            <div className='column'>
                <br/>
                <button className='bigButton'>
                    Rejoin Game
                </button>
                <br/>
                <button className='bigButton'>
                    Leave Game
                </button>
            </div>
        )
    } else {
        return (
            <div className='leftColumn'>
                <br/>
                <button className='bigButton'>
                    Create Game
                </button>
                <br/>
                <br/>
                <div className='entryForm'>
                    <form onSubmit={joinGameHandler}>
                        Enter Code
                        <br/>
                        <input type='text' name='code' maxlength='4' placeholder='****' />
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