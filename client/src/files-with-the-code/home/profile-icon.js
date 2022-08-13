import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
const axios = require('axios').default;


function UploadProfilePic({iconId}) {
    const [imgfile, uploadimg] = useState([])
    
    function OnChange(event) {
        if (event.target.files.length !== 0) {
            uploadimg(imgfile => [...imgfile, URL.createObjectURL(event.target.files[0])])
        }

        axios.post('/api/v1/user/addIcon')
        .catch(error => {
            toast.error(error.response.data.message)
        })
    }

    return (<>
        <input type="file" className='bigButton' onChange={OnChange}>Add Icon</input>
        {imgfile.map((elem) => {
          return <>
            <span key={elem}>
              <img src={elem} class='homeImage' alt=''/>
            </span>
          </>
        })}
        
    </>)
}

export default UploadProfilePic