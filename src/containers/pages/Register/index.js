import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import './Register.scss'
import firebase from '../../../config/firebase';
import Button from '../../../components/atoms/Button';

const Register = () => {
    const initState = useSelector((state) => state);
    const history = useHistory();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: '',
        password: '',
    })

    const handleChangeText = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value
        })
    }

    const handleRegisterSubmit = async () => {
        dispatch({type: 'SET_LOADING', value: true});
        await firebase.auth().createUserWithEmailAndPassword(state.email, state.password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                console.log('SUCCESS REGISTER.......', userCredential)
                console.log('SUCCESS REGISTER 2.......', user)
                setState({...state, email: '', password: ''})
                dispatch({type: 'SET_LOADING', value: false});
                history.push('/login')
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('ERROR REGISTER......', errorCode, errorMessage)
                dispatch({type: 'SET_LOADING', value: false});
            });

    }
    return (
        <div className="auth-container">
            <div className="auth-card">
                <p className="auth-title">Register Page</p>
                <input className="input" id="email" placeholder="Email" type="text" onChange={handleChangeText} value={state.email} />
                <input className="input" id="password" placeholder="Password" type="password" onChange={handleChangeText} value={state.password} />
                <Button onClick={handleRegisterSubmit} title="Register" loading={initState.loading} />
            </div>
        </div>
    )
}

export default Register;
