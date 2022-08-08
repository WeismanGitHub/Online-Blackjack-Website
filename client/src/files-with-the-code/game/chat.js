import React, { useState, useEffect } from 'react';
import { getCookie } from '../../helpers'

function Chat({socket, gameId }) {
    const [currentMessage, setCurrentMessage] = useState('')
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('receiveMessage', (data) => {
            setMessages((list) => [...list, data]);
        });

        socket.on('connect_error', (err) => {
            console.log(err)
        })
    }, [socket]);
    
    
    const sendMessage = async () => {
        if (currentMessage !== '') {
        const messageData = {
            gameId: gameId,
            message: currentMessage,
            auth: {
                token: getCookie('token')
            }
        };

        socket.volatile.emit('sendMessage', messageData);
        setMessages((list) => [...list, { message: currentMessage, userName: 'You' }]);
        setCurrentMessage('');
        }
    };

    return (
        <div class='chatBox'>
            {messages.map(message => {
                return (
                    <div>
                    <b>{message.userName}</b>: {message.message}
                    </div>
                )
            })}
            <br/>
            <input
            type='text'
            value={currentMessage}
            placeholder='...'
            onChange={(event) => {setCurrentMessage(event.target.value)}}
            onKeyPress={(event) => {event.key === 'Enter' && sendMessage()}}
            />
            <button onClick={sendMessage}>Send</button>
            <br/>
        </div>
    )
}

export default Chat;