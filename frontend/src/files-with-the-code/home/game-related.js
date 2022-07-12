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
                <button>
                    Rejoin Game
                </button>
                <br/>
                <button>
                    Leave Game
                </button>
            </div>
        )
    } else {
        return (
            <div className='column'>
                <button>
                    Create Game
                </button>
                <br/>
                <br/>
                <div className='entryForm'>
                    <form onSubmit={joinGameHandler}>
                        <h2>Enter Code</h2>
                        <br/>
                        <input type='text' name='code' placeholder='****'/>
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