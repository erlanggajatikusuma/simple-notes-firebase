import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../../components/atoms/Button';
import firebase from '../../../config/firebase';
import { useHistory } from "react-router-dom";

const Login = () => {
    const initState = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();

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

    const handleLoginSubmit = async () => {
        dispatch({type: 'SET_LOADING', value: true});
        await firebase.auth().signInWithEmailAndPassword(state.email, state.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const dataUser = {
                    uid: user.uid,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    refreshToken: user.refreshToken
                }
                console.log('SUCCESS LOGIN .......', user)
                setState({...state, email: '', password: ''})
                dispatch({type: 'SET_LOADING', value: false});
                dispatch({type: 'CHANGE_ISLOGIN', value: true});
                dispatch({type: 'CHANGE_USER', value: dataUser});
                localStorage.setItem('user', JSON.stringify(dataUser));
                history.push('/')
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('ERROR REGISTER......', errorCode, errorMessage)
                dispatch({type: 'SET_LOADING', value: false});
                dispatch({type: 'CHANGE_ISLOGIN', value: false});
            });

    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <p className="auth-title">Login Page</p>
                <input className="input" id="email" placeholder="Email" type="text" onChange={handleChangeText} value={state.email} />
                <input className="input" id="password" placeholder="Password" type="password" onChange={handleChangeText} value={state.password} />
                <Button onClick={handleLoginSubmit} title="Login" loading={initState.loading} />
            </div>
        </div>
    )
}


export default Login;
