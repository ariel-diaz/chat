import React, {useState} from 'react';
import styled from 'styled-components';
import { Button } from './helper';


const Sidebar = ({users}) => {

    return (
        <div id="sidebar" className="chat__sidebar">

        </div>
    )
}


const ChatBox = () => {

    return (
        <div id="messages" className="chat__messages">
        </div>
    )
}



const Chat = () => {

    const [message, setMessage] = useState("");

    // Users conectados en la sala
    const [users, setUsers] = useState([]);





    const handleChangeMessage = (e) => setMessage(e.target.value);

    const handleSubmitSendMessage = (e) => {
        e.preventDefault();
    }

    return (
        <div className="chat">
            <Sidebar users={users} />
            <div className="chat__main">
                <ChatBox />
                <div className="compose">
                    <form id="message-form" onSubmit={handleSubmitSendMessage}>
                        <input name="message" placeholder="Message" onChange={handleChangeMessage} />
                        <Button>Send</Button>
                    </form>
                    <Button id="send-location">Send location</Button>
                </div>
            </div>
        </div>
    )
}

export default Chat;