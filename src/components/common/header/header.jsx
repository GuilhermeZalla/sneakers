import { useRef, useState, useEffect } from 'react';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import { MdLogout, MdDashboard } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { HiHeart } from 'react-icons/hi';
import { FaLock } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { HiUserCircle } from 'react-icons/hi';
import Logo from '../../../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { Item } from './item/item';

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

async function verifyPhone(phone) {
    let response = await fetch(`http://localhost:3001/account/phone/${phone}`, body);
    let result = response.json();
    return result;
};

async function accountValidation(email, password) {
    let response = await fetch(`http://localhost:3001/account/validation/${email}/${password}`, body);
    let result = response.json();
    return result;
};

async function accountLogin(email, state) {
    let response = await fetch(`http://localhost:3001/account/login/${email}/${state}`, {
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

async function getUserCart(email) {
    let response = await fetch(`http://localhost:3001/account/user-cart/${email}`, body);
    let result = response.json();
    return result;
};

export const Header = ({ handleController }) => {
    const [login, setLogin] = useState(false);
    const [response, setResponse] = useState(false);
    const [phone, setPhone] = useState(false);
    const [cart, setCart] = useState([]);
    const [controller, setController] = useState(0);
    const [counter, setCounter] = useState(0);
    let modal = useRef(null);
    let signup = useRef(null);
    let signin = useRef(null);
    let email = useRef(null);
    let emailLogin = useRef(null);
    let passwordLogin = useRef(null);
    let tel = useRef(null);
    let error = useRef(null);
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setLogin(true);
        };
    }, [login]);

    useEffect(() => {
        if (localStorage.getItem('user')) {
            getUserCart(localStorage.getItem('user')).then(res => setCart(res.cart)).catch(err => console.error(err));
        }
        setController(handleController);
    }, [controller, counter, handleController]);

    const openModal = () => modal.current.style.display = 'flex';
    const closeModal = () => {
        modal.current.style.display = 'none';
        signup.current.style.display = 'none';
        signin.current.style.display = 'block';
    };

    const openSignUp = () => {
        signup.current.style.display = 'block';
        signin.current.style.display = 'none';
    };

    const openSignIn = () => {
        signup.current.style.display = 'none';
        signin.current.style.display = 'block';
    };

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

    const handlePhone = e => {
        verifyPhone(e.target.value).then(res => {
            if (res) {
                setPhone(res);
                tel.current.style.outline = '2px solid #ff0000c5';
                tel.current.value = '';
            } else {
                tel.current.style.outline = '1px solid #808080be';
            };
        }).catch(err => console.error(err));
    };

    const verifyLogin = e => {
        e.preventDefault();
        accountValidation(emailLogin.current.value, passwordLogin.current.value).then(res => {
            if (res) {
                setLogin(res);
                error.current.style.display = 'none';
                emailLogin.current.style.outline = '1px solid #808080be';
                passwordLogin.current.style.outline = '1px solid #808080be';
                modal.current.style.display = 'none';
                localStorage.setItem('user', emailLogin.current.value);
                accountLogin(emailLogin.current.value, true).then(res => console.log("User is logged")).catch(err => console.error(err));
                window.location.reload();
            } else {
                emailLogin.current.value = '';
                emailLogin.current.style.outline = '2px solid #ff0000c5';
                passwordLogin.current.value = '';
                passwordLogin.current.style.outline = '2px solid #ff0000c5';
                error.current.style.display = 'block';
            }
        }).catch(err => console.error(`New Error: ${err}`));
    };

    const handleLogout = () => {
        accountLogin(localStorage.getItem('user'), false).then(res => console.log("User is unlogged")).catch(err => console.error(err));
        setLogin(false);
        localStorage.removeItem('user');
        navigate('/');
        window.location.reload();
    };

    const handleCounter = e => setCounter(counter + e);

    return (
        <>
            <header className="header">
                <nav className="header__navbar">
                    <ul className="header__list">
                        <li className="header__item brand"><Link to={'/'}><img src={Logo} alt="Brand" /></Link></li>
                        <li className="header__item"><a href="#">Collections</a></li>
                        <li className="header__item"><a href="#">Men</a></li>
                        <li className="header__item"><a href="#">Women</a></li>
                        <li className="header__item"><a href="#">About</a></li>
                        <li className="header__item"><a href="#">Contact</a></li>
                    </ul>
                    <ul className="header__list">
                        <li className="header__item">
                            <button className='user-cart' type="button"><AiOutlineShoppingCart className="shopping-cart" />{
                                cart.length === 0 ? null : <span>{cart.length}</span>
                            }</button>
                            <div className="cart dropdown-menu ">
                                <header className="header__cart"><h2>Cart</h2>
                                    {
                                        cart.length <= 1 ? <span>{cart.length} item</span> : <span>{cart.length} items</span>
                                    }
                                </header>
                                {
                                    cart.length === 0 ? <h2 className="empty">Your cart is empty.</h2> :
                                        <ul className="header__list">
                                            {
                                                cart.map((item, index) => <Item key={index} name={item.name} price={item.price} quant={item.quant} handleCounter={handleCounter} />)
                                            }
                                            <li><Link to={`/payment`} className="checkout">Checkout</Link></li>
                                        </ul>
                                }
                            </div>
                        </li>
                        {
                            login ?
                                <li className="header__item">
                                    <button type="button"><HiUserCircle className="user logged" /></button>
                                    <div className="user-menu dropdown-menu">
                                        <ul className="header__list">
                                            <li className="header__item"><Link to={`/dashboard/${'home'}`}><MdDashboard /> Dashboard</Link></li>
                                            <li className="header__item"><Link to={`/dashboard/${'wishlist'}`}><HiHeart /> Wishlist</Link></li>
                                            <li className="header__item"></li>
                                            <li className="header__item"><button type="button" onClick={handleLogout}><MdLogout /> Logout</button></li>
                                        </ul>
                                    </div>
                                </li>
                                :
                                <li className="header__item user-nologin"><button type="button" onClick={openModal}><HiUserCircle className="user" /></button></li>
                        }
                    </ul>
                </nav>
            </header>
            <div className="modal" ref={modal}>
                <div>
                    <button type="button" name='close' onClick={closeModal}><IoClose /></button>
                    <form ref={signin}>
                        <fieldset>
                            <legend>Login to Your Account</legend>
                            <p>
                                <input type="email" placeholder='Email' name='email' className="login-email" required ref={emailLogin} />
                                <BsFillEnvelopeFill />
                            </p>
                            <p>
                                <input type="password" placeholder='Password' name='password' className="login-email" ref={passwordLogin} required />
                                <FaLock />
                            </p>
                            <p className="error" ref={error}>Account not found <br /> Email and password don't match</p>
                            <p>
                                <button type="submit" name='signin' onClick={verifyLogin}>Sign In</button>
                            </p>
                            <p className="user-signup">
                                New here? <button type="button" name="signup" onClick={openSignUp}>Sign Up</button>
                            </p>
                        </fieldset>
                    </form>
                    <form method="POST" action="http://localhost:3001/account" className="signup-form" ref={signup}>
                        <fieldset>
                            <legend>Create Your Accout</legend>
                            <p>
                                <label htmlFor="email">Email (You'll use this as your login) *</label>
                                <input id="email" type="email" placeholder='email@hotmail.com' name='email' required ref={email} onBlur={handleEmail} />
                                {
                                    response !== false ? <label className="warning">This email already exists!</label> : null
                                }
                            </p>
                            <p>
                                <label htmlFor="password">Password *</label>
                                <input id="password" type="password" placeholder='*******' name='password' maxLength={44} required />
                            </p>
                            <p>
                                <label htmlFor="fullname">Full Name *</label>
                                <input id="fullname" type="text" placeholder='Ezio Auditore de Firenze' name='fullname' maxLength={34} required />
                            </p>
                            <p>
                                <label htmlFor="phone">Phone *</label>
                                <input id="phone" type="text" placeholder='+55119XXXXXXX' name='phone' maxLength={16} required onBlur={handlePhone} ref={tel} />
                                {
                                    phone !== false ? <label className="warning phone">Phone not valid</label> : null
                                }
                            </p>
                            <p>
                                <label htmlFor="bday">Birthday *</label>
                                <input id="bday" type="date" name='bday' required />
                            </p>
                            <p className="genders">
                                <input id="male" type="radio" name="gender" value="male" required />
                                <label htmlFor="male">Male</label>
                                <input id="female" type="radio" name="gender" value="female" required />
                                <label htmlFor="female">Female</label>
                                <input id="not" type="radio" name="gender" value="Not Informed" required />
                                <label htmlFor="not">Prefer not say</label>
                            </p>
                            <p>
                                <button type="submit" name='signin'>Sign Up</button>
                            </p>
                            <p className="user-signup">
                                <button type="button" className="signup" onClick={openSignIn}>Back to Login</button>
                            </p>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    );
};