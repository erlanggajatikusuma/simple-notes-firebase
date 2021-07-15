import React from 'react'
import { connect } from 'react-redux';

const Login = (props) => {
    return (
        <div>
            <p>Login Page {props.popupProps}</p>
            <button>Go to register</button>
            <button>Go to Dashboard</button>
        </div>
    )
}

const reduxState = (state) => ({
    popupProps: state.popup
})

export default connect(reduxState, null)(Login);
