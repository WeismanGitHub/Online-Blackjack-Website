import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios').default;

function AccountRelated() {
    async function updateUserHandler(event) {
        event.preventDefault();
    }

    return (
        <div className='entryForm'>
            <form onSubmit={updateUserHandler}>
                <h2>Update Account</h2>
                Name:
                <br/>
                <input id='Your Name' type='text' name='name' placeholder="name"/>
                <br/>
                Password:
                <br/>
                <input id='Your Password' type='password' placeholder="password" name='password'/>
                <br/>
                <button type='submit'>Register</button>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default AccountRelated