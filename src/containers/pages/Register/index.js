import React, {useState} from 'react';
import './Register.scss'
import firebase from '../../../config/firebase';

const Register = () => {
    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const handleChangeText = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value
        })
    }

    const handleRegisterSubmit = () => {
        console.log('email: ', state.email)
        console.log('password: ', state.password)
        firebase.auth().createUserWithEmailAndPassword(state.email, state.password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                console.log('SUCCESS REGISTER.......', userCredential)
                console.log('SUCCESS REGISTER 2.......', user)
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('ERROR REGISTER......', errorCode, errorMessage)
            });

    }
    return (
        <div className="auth-container">
            <div className="auth-card">
                <p className="auth-title">Register Page</p>
                <input className="input" id="email" placeholder="Email" type="text" onChange={handleChangeText} />
                <input className="input" id="password" placeholder="Password" type="password" onChange={handleChangeText} />
                <button className="btn" onClick={handleRegisterSubmit}>Register</button>
            </div>
            {/* <button>Go to Dashboard</button> */}
        </div>
    )
}

export default Register;
