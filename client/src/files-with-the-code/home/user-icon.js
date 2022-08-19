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
        <img src='/api/v1/user/icon/' class='homeImage'/>
        <br/>
        <input type="file" id="file" onChange={OnChange} action='/api/v1/user/icon/add/' method='post'/>
        <label for="file" class="customFileUpload">Update Icon</label>
    </>)
}

export default UserIcon