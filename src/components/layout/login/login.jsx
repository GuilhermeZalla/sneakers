import { Header } from "../../common/header/header";
import { useRef, useState } from 'react';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const body = {
    method: "GET",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

async function verifyAccount(email) {
    let response = await fetch(`http://localhost:3001/account/${email}`, body);
    let result = response.json();
    return result;
};

async function accountValidation(email, password) {
    let response = await fetch(`http://localhost:3001/account/validation/${email}/${password}`, body);
    let result = response.json();
    return result;
};

async function accountLogin(email) {
    let response = await fetch(`http://localhost:3001/account/login/${email}`, {
        method: 'PATCH',
        mode: "cors",
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    let result = response.json();
    return result;
};

export const Login = () => {
    const [response, setResponse] = useState(false);
    let email = useRef();
    let email_Login = useRef();
    let password_Login = useRef();
    let error = useRef();
    let navigate = useNavigate();

    const handleEmail = e => {
        verifyAccount(e.target.value).then(res => {
            if (res) {
                setResponse(res);
                email.current.style.outline = '2px solid #ff0000c5';
                email.current.value = '';
            } else {
                email.current.style.outline = '1px solid #808080be';
            };
        }).catch(err => console.error(`New Error: ${err}`));
    };

    const verifyLogin = e => {
        e.preventDefault();
        accountValidation(email_Login.current.value, password_Login.current.value).then(res => {
            if (res) {
                error.current.style.display = 'none';
                email_Login.current.style.outline = '1px solid #808080be';
                password_Login.current.style.outline = '1px solid #808080be';
                localStorage.setItem('user', email_Login.current.value);
                accountLogin(email_Login.current.value).then(res => console.log("User is logged")).catch(err => console.error(err));
                navigate('/');
            } else {
                email_Login.current.value = '';
                email_Login.current.style.outline = '2px solid #ff0000c5';
                password_Login.current.value = '';
                password_Login.current.style.outline = '2px solid #ff0000c5'
                error.current.style.visibility = 'visible';
            }
        }).catch(err => console.error(`New Error: ${err}`));
    };

    return (
        <>
            <Header />
            <main className="main-login">
                <form>
                    <fieldset>
                        <legend className="form__legend">Login to Your Account</legend>
                        <p className="form__paragraph">Already have an account?</p>
                        <div>
                            <p>
                                <input type="email" placeholder='Email' name='email' className="login" ref={email_Login} required />
                                <BsFillEnvelopeFill />
                            </p>
                            <p>
                                <input type="password" placeholder='Password' name='password' className="login" ref={password_Login} required />
                                <FaLock />
                            </p>
                            <p className="error" ref={error}>Email and password don't match</p>
                        </div>
                        <p>
                            <button type="submit" name='signin' onClick={verifyLogin}>Sign In</button>
                        </p>
                    </fieldset>
                </form>
                <form method="POST" action="http://localhost:3001/account">
                    <fieldset>
                        <legend className="form__legend">Create an account</legend>
                        <p className="form__paragraph">Let's get started with your Sneakers' account</p>
                        <p>
                            <input type="text" placeholder="Name" name='fullname' maxLength={34} required />
                        </p>
                        <p>
                            <input type="email" placeholder="Email" name='email' required ref={email} onBlur={handleEmail} />
                            {
                                response !== false ? <label className="warning">This email already exists!</label> : null
                            }
                        </p>
                        <p>
                            <input type="password" placeholder="Password" name='password' required />
                        </p>
                        <p>
                            <button type="submit" name='signup'>Sign Up</button>
                        </p>
                    </fieldset>
                </form>
            </main>
        </>
    );
};