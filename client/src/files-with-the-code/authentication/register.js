import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios').default;

function Register() {
    const navigate = useNavigate();

    async function registerHandler(event) {
        event.preventDefault();

        axios.post('/api/v1/authentication/register', {
            name: event.target[0].value,
            password: event.target[1].value
        }).then(res => {
            navigate('/');
        }).catch(error => {
            console.log(error)
            toast.error(error.response.data.message)
        })
    }

    return (
        <div className='authenticationForm'>
            <form onSubmit={registerHandler}>
                <h2>Register</h2>
                Name:
                <br/>
                <input id='Your Name' type='text' name='name' placeholder="name" maxlength='15' minlength='1'/>
                <br/>
                Password:
                <br/>
                <input id='Your Password' type='password' placeholder="password" name='password' maxlength='50' minlength='6'/>
                <br/>
                <button type='submit'>Register</button>
            </form>
            <ToastContainer/>
        </div>
        
    )
}

export default Register;
