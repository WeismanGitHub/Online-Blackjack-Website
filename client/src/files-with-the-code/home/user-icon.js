import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect} from 'react';
import { toast } from 'react-toastify';
const axios = require('axios').default;


function UserIcon({ iconId }) {
    const [icon, setIcon] = useState()
    
    useEffect(() => {
        const fetchUserIcon = async () => {
            const res = await axios.get(`/api/v1/user/icon/${iconId}`)
            .catch(err => {
                toast.error(err.response.data.message)
            })
        console.log(res)
        setIcon(res)
        }
    
        fetchUserIcon()
    }, [])

    function OnChange(event) {
        if (event.target.files.length !== 0) {
            setIcon(imgfile => [...imgfile, URL.createObjectURL(event.target.files[0])])
        }

        axios.post('/api/v1/user/icon/add', icon)
        .catch(error => {
            toast.error(error.response.data.message)
        })
    }

    return (<>
        <input type="file" className='bigButton' onChange={OnChange}/>Add Icon
        <img src={icon} class='homeImage' alt=''/>
    </>)
}

export default UserIcon