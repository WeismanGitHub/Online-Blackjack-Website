import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteAccount from './delete-account'
import Logout from './logout'
const axios = require('axios').default;

function AccountRelated() {
    async function updateUserHandler(event) {
        event.preventDefault();

        axios.post('/api/v1/account/update', {
            name: event.target[0].value,
            password: event.target[1].value
        }).then(res => {
            toast('Account updated!')
        }).catch(error => {
            toast.error(error.response.data.message)
        })
    }

    return (
        <div className='rightColumn'>
            <br/>
            <form onSubmit={updateUserHandler} className='entryForm'>
                <br/>
                <div>Update Account</div>
                Name:
                <br/>
                <input id='Your Name' type='text' name='name' placeholder="name" maxlength='15' minlength='1'/>
                <br/>
                Password:
                <br/>
                <input id='Your Password' type='password' placeholder="password" name='password' maxlength='50' minlength='6'/>
                <br/>
                <button type='submit'>Update</button>
            </form>
            <br/>
            <Logout/>
            <br/>
            <br/>
            <DeleteAccount/>
            <ToastContainer/>
        </div>
    )
}

export default AccountRelated