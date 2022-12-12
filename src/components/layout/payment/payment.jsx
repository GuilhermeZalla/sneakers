import { useEffect, useRef, useState } from "react";
import { Header } from "../../common/header/header";
import { Product } from "./product/product";
import { MdLocalShipping, MdPayments } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';
import { BsPlusCircle } from 'react-icons/bs';
import { IoClose, IoLocation } from 'react-icons/io5';
import { useNavigate } from "react-router-dom";
import { Country } from "./country/country";
import { Address } from "../../common/address/address";

const btn = document.getElementsByName('p-method');

const body = {
    method: "GET",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

async function getCountries() {
    let response = await fetch('https://restcountries.com/v3.1/all', body);
    let result = response.json();
    return result;
};

async function getCartItem(email) {
    let response = await fetch(`http://localhost:3001/account/user-cart/${email}`, body);
    let result = response.json();
    return result;
};

async function getAddresses(email) {
    let response = await fetch(`http://localhost:3001/account/address/${email}`, body);
    let result = response.json();
    return result;
};

export const Payment = (props) => {
    const [addresses, setAddresses] = useState([]);
    const [defaultAddress, setDefaultAddress] = useState([]);
    const [items, setItems] = useState([]);
    const [shipping, setShipping] = useState(0);
    const [shippingName, setShippingName] = useState('');
    const [amount, setAmount] = useState(0);
    const [total, setTotal] = useState(0);
    const [controller, setController] = useState(0);
    const [paymentType, setPaymentType] = useState('');
    const [countries, setCountries] = useState([]);
    const [userWallet, setUserWallet] = useState(10.00);
    let navigate = useNavigate();
    let checkoutBtn = useRef(null);
    let checkoutModal = useRef(null);
    let newAddress = useRef(null);

    useEffect(() => {
        getCartItem(localStorage.getItem('user')).then(products => {
            setItems(products.cart);
            setTotal(Number(products.sum));
            setAmount(Number(products.sum) + Number(shipping));
            if (products.cart.length === 0) {
                navigate('/');
            }
            getCountries().then(res => setCountries(res)).catch(err => console.error(err));
        }).catch(err => console.error(err));
        getAddresses(localStorage.getItem('user')).then(res => {
            setAddresses(res);
        }).catch(err => console.error(`New Error: ${err}`));
    }, [controller, amount]);

    const handleShipping = e => {
        setShipping(e.target.value);
        setShippingName(e.target.id);
        setAmount(amount + Number(shipping) + total);
    };

    const handlePaymentMethod = e => {
        if (shipping !== 0) {
            if (e.target.style.outlineColor === '' || e.target.style.outlineColor === 'rgba(128, 128, 128, 0.42)') {
                e.target.style.outline = '2px solid #ff7d1a';
                e.target.style.color = '#ff7d1a';
                e.target.style.backgroundColor = '#ffede0';
                checkoutBtn.current.style.opacity = '1';
                setPaymentType(e.target.value);
                for (let i = 0; i < btn.length; ++i) {
                    if (btn[i].textContent !== e.target.textContent) {
                        btn[i].style.backgroundColor = 'transparent';
                        btn[i].style.color = '#68707d';
                        btn[i].style.outline = '2px solid #8080806b';
                    };
                };
                for (let i = 0; i < addresses.length; ++i) {
                    if (addresses[i].default) {
                        setDefaultAddress(addresses[i]);
                    }
                }
            } else {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#68707d';
                e.target.style.outline = '2px solid #8080806b';
                checkoutBtn.current.style.opacity = '.7';
                setPaymentType('');
            };
        } else {
            window.alert("You need to choose a shipping before pay.");
        }
    };

    const handleController = e => {
        setController(e + 1);
        return e;
    };

    const handleCheckoutModal = () => checkoutModal.current.style.display = 'flex';
    const closeCheckoutModal = () => checkoutModal.current.style.display = 'none';
    const openNewAddressModal = () => {
        if (addresses.length === 4) {
            window.alert("You reached the limit of addresses. Delete one to add other.");
        } else {
            newAddress.current.style.display = 'flex';
        };
    };
    const closeNewAddressModal = () => newAddress.current.style.display = 'none';

    return (
        <>
            <Header handleController={handleController} />
            <div className="container">
                <main className="main">
                    <div className="main__container">
                        {
                            <ul className="main__list">
                                {
                                    items.map((item, index) => <Product key={index} name={item.name} price={item.price} quant={item.quant} handleController={handleController} />)
                                }
                            </ul>
                        }
                        <article className="main__article">
                            <h2 className="main__subtitle"><IoLocation /> Choose an Address</h2>
                            {
                                addresses.length === 0
                                    ?
                                    <p className="main__paragraph">
                                        You don't have any address registered <br /> <button type="button" className="new-address-btn" onClick={openNewAddressModal}><BsPlusCircle />Add new Address</button>
                                    </p>
                                    :
                                    <ul className="main__list-4">
                                        {
                                            addresses.map((address, index) => <Address key={index} isDefault={address.default} addressId={address._id} type={address.type} street_address={address.street_address} number={address.street_number} street_address_2={address.street_address_2} postal={address.postal} city={address.city} state={address.state} />)
                                        }
                                    </ul>
                            }
                            <h2 className="main__subtitle"><MdLocalShipping /> Choose a Shipping</h2>
                            <ul className="main__list-3">
                                <li className="main__item" data-ship='blue'>
                                    <label htmlFor="blue">Blue</label>
                                    <h3>until 4 working days</h3>
                                    <h4>$ 15.07</h4>
                                    <input type="radio" name="fees" id="blue" value={15.07} onClick={handleShipping} />
                                </li>
                                <li className="main__item" data-ship='sedex'>
                                    <label htmlFor="sedex">Sedex</label>
                                    <h3>until 8 working days</h3>
                                    <h4>$ 8.90</h4>
                                    <input type="radio" name="fees" id="sedex" value={8.90} onClick={handleShipping} />
                                </li>
                                <li className="main__item" data-ship='fedex'>
                                    <label htmlFor="fedex">Fedex</label>
                                    <h3>until 5 working days</h3>
                                    <h4>$ 22.02</h4>
                                    <input type="radio" name="fees" id="fedex" value={22.02} onClick={handleShipping} />
                                </li>
                                <li className="main__item" data-ship='red'>
                                    <label htmlFor="red">Red</label>
                                    <h3>until 3 working days</h3>
                                    <h4>$ 4.70</h4>
                                    <input type="radio" name="fees" id="red" value={4.70} onClick={handleShipping} />
                                </li>
                            </ul>
                        </article>
                    </div>
                    <div className="modal-address" ref={newAddress}>
                        <form method='POST' action="http://localhost:3001/account/address">
                            <fieldset>
                                <legend>Register New Address <button type="button" onClick={closeNewAddressModal}><IoClose /></button></legend>
                                <p>
                                    <input type="text" placeholder='ZIP CODE *' name='zip' maxLength={9} required />
                                </p>
                                <p>
                                    <input type="text" placeholder='Residential Type (Apt / House) *' name='type' maxLength={28} required />
                                </p>
                                <p className="number">
                                    <input type="text" placeholder='Street Address *' name='streetAddress' maxLength={40} required />
                                    <input type="text" placeholder='Number *' maxLength={6} name='number' required />
                                </p>
                                <p>
                                    <input type="text" placeholder='Street Address 2*' name='streetAddress2' maxLength={30} required />
                                </p>
                                <p>
                                    <input type="text" placeholder='Reference *' name='reference' maxLength={28} required />
                                </p>
                                <p>
                                    <input type="text" placeholder='District *' name='district' maxLength={20} required />
                                </p>
                                <p className="city">
                                    <input type="text" placeholder='City *' name='city' maxLength={18} required />
                                    <input type="text" placeholder='UF *' name='state' maxLength={2} required />
                                </p>
                                <p className="user-account">
                                    <input type="email" value={localStorage.getItem('user')} name='email' readOnly className="readonly" />
                                    <input type="text" name='payment' defaultValue={true} />
                                </p>
                                <p>
                                    <input type="submit" value='SAVE' name='save' />
                                </p>
                            </fieldset>
                        </form>
                    </div>
                </main>
                <aside className="aaside">
                    <h2 className="aside__title"><FaShoppingCart /> Billing Summary</h2>
                    <ul className="aside__list">
                        <li className="aside__item">
                            <h2 className="aside__subtitle">Total</h2>
                            <span>${total}</span>
                        </li>
                        <li className="aside__item">
                            <h2 className="aside__subtitle">Discount</h2>
                            <span>$0</span>
                        </li>
                        <li className="aside__item">
                            <h2 className="aside__subtitle">Shipping</h2>
                            <span>${shipping}</span>
                        </li>
                        <li className="aside__item row"></li>
                        <li className="aside__item">
                            <h2 className="aside__subtitle">Amount to be paid</h2>
                            <span>${amount}</span>
                        </li>
                    </ul>
                    <h2 className="aside__title"><MdPayments /> Select a Payment Method</h2>
                    <div className="aside__payments">
                        <button type="button" name='p-method' value='Debit Card' onClick={handlePaymentMethod}>Debit Card</button>
                        <button type="button" name='p-method' value='Credit Card' onClick={handlePaymentMethod}>Credit Card</button>
                        <button type="button" name='p-method' value='Paypal' onClick={handlePaymentMethod}>Pay&trade;</button>
                        <button type="button" name='p-method' value='Wallet' onClick={handlePaymentMethod}>Wallet</button>
                    </div>
                    {
                        paymentType === '' ? <button type="button" name='checkout' onClick={handleCheckoutModal} disabled='disabled' ref={checkoutBtn}>Checkout</button> : <button type="button" name='checkout' onClick={handleCheckoutModal} ref={checkoutBtn}>Checkout</button>
                    }
                </aside>
                <div className="checkout-modal" ref={checkoutModal}>
                    <article className="article">
                        <form method="POST" action="http://localhost:3001/account/payment">
                            {
                                paymentType === 'Wallet' ?
                                    <fieldset className="wallet">
                                        <legend>Pay with your Wallet <button type="button" onClick={closeCheckoutModal}><IoClose /></button></legend>
                                        <p>
                                            <label htmlFor="card">Your current balance</label>
                                            <input type="text" placeholder={'$' + (userWallet).toFixed(2)} readOnly />
                                        </p>
                                        <p>
                                            <label htmlFor="name">Total with your current balance</label>
                                            <input type="text" placeholder={'$' + (amount - userWallet).toFixed(2)} readOnly />
                                        </p>
                                        <p className="hidden">
                                            <input type="text" name='email' defaultValue={localStorage.getItem('user')} />
                                            <input type="text" name='paymentType' defaultValue={paymentType} />
                                            <input type="text" name='shippingPrice' defaultValue={shipping} />
                                            <input type="text" name='shippingName' defaultValue={shippingName} />
                                            <input type="text" name='total' defaultValue={(amount - userWallet) === 0 ? userWallet : (amount - userWallet)} />
                                            <input type="text" name='quantity' defaultValue={items.length} />
                                            <input type="text" name='names' defaultValue={JSON.stringify(items)} />
                                            <input type="text" name='address' defaultValue={JSON.stringify(defaultAddress)} />
                                        </p>
                                        <p>
                                            <button type="submit">Purchase</button>
                                        </p>
                                    </fieldset>
                                    :
                                    <fieldset>
                                        <legend>Pay with your {paymentType} <button type="button" onClick={closeCheckoutModal}><IoClose /></button></legend>
                                        <p>
                                            <label htmlFor="card">Card information</label>
                                            <input type="tel" id="card" inputMode="numeric" pattern="[0-9\s]{13,19}" autoComplete="cc-number" maxLength="19" placeholder="xxxx xxxx xxxx xxxx" required />
                                        </p>
                                        <p>
                                            <label htmlFor="name">Name on card</label>
                                            <input type="text" id="name" maxLength="28" placeholder="Card name" required />
                                        </p>
                                        <p>
                                            <span>
                                                <label htmlFor="places">Country or region</label>
                                                <select name="places" id="places" required>
                                                    {
                                                        countries.map((country, index) => <Country key={index} name={country.name.common} />)
                                                    }
                                                </select>
                                            </span>
                                            <span>
                                                <label htmlFor="zip">ZIP</label>
                                                <input id="zip" type="tel" name="zip" maxLength={9} placeholder="xxxxxxxx" required />
                                            </span>
                                        </p>
                                        <p className="hidden">
                                            <input type="text" name='email' defaultValue={localStorage.getItem('user')} />
                                            <input type="text" name='paymentType' defaultValue={paymentType} />
                                            <input type="text" name='shippingPrice' defaultValue={shipping} />
                                            <input type="text" name='shippingName' defaultValue={shippingName} />
                                            <input type="text" name='total' defaultValue={amount} />
                                            <input type="text" name='quantity' defaultValue={items.length} />
                                            <input type="text" name='names' defaultValue={JSON.stringify(items)} />
                                            <input type="text" name='address' defaultValue={JSON.stringify(addresses)} />
                                        </p>
                                        <p>
                                            <button type="submit">Purchase</button>
                                        </p>
                                    </fieldset>
                            }
                        </form>
                    </article>
                </div>
            </div>
        </>
    );
};