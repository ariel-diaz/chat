import React from 'react'
import styled from 'styled-components';
import {Button} from './helper';





const Login = (props) => {
    return(
        <div className="centered-form">
        <div className="centered-form__box">
            <h1> Join CHAT!</h1>
            <form onSubmit={() => props.history.push('/chat')}>
                <label> Nombre</label>
                <input type="text" name="username" placeholder="Nombre" required/>
                <label> Sala </label>
                <input type="text" name="room" placeholder="Sala" required/>
                <Button> JOIN! </Button>
            </form>
        </div>
    </div>
    )
}

export default Login;