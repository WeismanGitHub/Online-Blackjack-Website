import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteAccount from './delete-account'
import React, { useState, useEffect } from 'react';
import Logout from './logout'
import userIcon from './user-icon'
const axios = require('axios').default;

function AccountRelated() {
    const [user, setUser] = useState()

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get('/api/v1/user')
            .catch(err => {
                toast.error(err.response.data.message)
            })
            setUser(res.data.user)
        }
        fetchUser()
    }, [])

    async function updateUserHandler(event) {
        event.preventDefault();
        
        axios.post('/api/v1/user/update', {
            name: event.target[0].value,
            password: event.target[1].value
        }).then(res => {
            setUser(res.data.user)
            toast('Account updated!')
        }).catch(err => {
            toast.error(err.response.data.message)
        })
    }

    return (
        <div className='rightColumn'>
            <br/>
            Name: {user.name}
            <br/>
            <br/>
            <userIcon iconId={user.userIconId}/>
            <br/>
            <br/>
            Balance: {user.balance}
            <br/>
            <br/>
            <form onSubmit={updateUserHandler} className='entryForm'>
                <div>Update Account</div>
                Name:
                <br/>
                <input id='Your Name' type='text' name='name' placeholder={user.name} maxlength='15' minlength='1'/>
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