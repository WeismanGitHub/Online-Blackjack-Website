import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios').default;


function DeleteAccount() {
    const navigate = useNavigate();

    function onClick(event) {
        event.preventDefault();

        if (window.confirm('Do you want to delete your account?')) {
            axios.post('/api/v1/user/delete')
            .then(res => {
                navigate('/authentication');
            }).catch(error => {
                toast.error(error.response.data.message)
            })
        }

    }

    return <button className='mediumButton' onClick={onClick}>Delete Account</button>
}

export default DeleteAccount