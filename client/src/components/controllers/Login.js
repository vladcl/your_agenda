import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../views/Login.css'
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [loginStatus, setLoginStatus] = useState('')

    Axios.defaults.withCredentials = true;


    const login = () => {
        Axios.post('http://localhost:3001/login', {
            email: email,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                setLoginStatus(response.data[0].email);
            }

        });
    };

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            console.log(response)
            if (response.data.loggedIn === true) {
                setLoginStatus(response.data.user[0].email)
                navigate('/agenda')
            }

            if (response.data.loggedIn === true) {
                navigate('/agenda')
            }


        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <main>
            <div className='container'>
                <h1 className='login'>Fazer Login</h1>
                <label className='name'>E-mail</label>
                <input
                    type='text'
                    placeholder='Digite o seu e-mail'
                    className="form--field"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <label className="name">Senha</label>
                <input
                    type='password'
                    placeholder='Digite a sua senha'
                    className="form--field2"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <div className='buttons'>
                    <button onClick={login} className='button'>Entrar</button>
                </div>
                <h1 className='loginStatus'> {loginStatus} </h1>
            </div>
        </main>
    );
}

export default Login;