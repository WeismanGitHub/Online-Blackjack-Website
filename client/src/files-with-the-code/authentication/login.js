import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios').default;

function Login() {
    const navigate = useNavigate();

    function loginHandler(event) {
        event.preventDefault();

        axios.post('/api/v1/authentication/login', {
            name: event.target[0].value,
            password: event.target[1].value
        }).then(res => {
            navigate('/');
        }).catch(error => {
            toast.error(error.response.data.message)
        })
    }

    return (
        <div className='entryForm'>
            <form onSubmit={loginHandler}>
                <h2>Login</h2>
                Name:
                <br/>
                <input type='text' name='name' placeholder="name" maxlength='15' minlength='1'/>
                <br/>
                Password:
                <br/>
                <input type='password' name='password' placeholder="password" maxlength='50' minlength='6'/>
                <br/>
                <button type='submit'>Login</button>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Login;