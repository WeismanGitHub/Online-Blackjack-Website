import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { toast } from 'react-toastify';
const axios = require('axios').default;


function UserIcon() {

    function OnChange(event) {
        if (event.target.files.length !== 0) {
        }

        axios.post('/api/v1/user/icon/add')
        .catch(error => {
            toast.error(error.response.data.message)
        })
    }

    return (<>
        {/* <input type="file" className='bigButton' onChange={OnChange}/>Add Icon */}
        <img src='/api/v1/user/icon/' class='homeImage'/>
    </>)
}

export default UserIcon