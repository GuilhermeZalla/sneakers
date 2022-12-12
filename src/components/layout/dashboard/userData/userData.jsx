import { IoPerson, IoClose, IoLocationSharp } from 'react-icons/io5';
import { HiDocumentText } from 'react-icons/hi';
import { BsPlusCircle } from 'react-icons/bs';
import { FaLock } from 'react-icons/fa';
import { Address } from '../../../common/address/address';
import { useRef, useEffect, useState, useCallback } from 'react';

const body = {
    method: "GET",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

async function verifyCurrentPassword(email, password) {
    let response = await fetch(`http://localhost:3001/account/verify-password/${email}/${password}`, body);
    let result = response.json();
    return result;
};

async function getAddresses(email) {
    let response = await fetch(`http://localhost:3001/account/address/${email}`, body);
    let result = response.json();
    return result;
};

export const UserData = (props) => {
    const [addresses, setAddresses] = useState([]);
    const [controller, setController] = useState(0);
    let changePassword = useRef(null);
    let newAddress = useRef(null);
    let currentPassword = useRef(null);
    let newPassword = useRef(null);
    let CheckCurrentPassword = useRef(null);
    let checkNew = useRef(null);
    let CheckNewPassword = useRef(null);

    useEffect(() => {
        getAddresses(localStorage.getItem('user')).then(res => setAddresses(res)).catch(err => console.error(`New Error: ${err}`));
    }, []);

    const openChangePasswordModal = () => changePassword.current.style.display = 'flex';
    const closeChangePasswordModal = () => changePassword.current.style.display = 'none';
    const openNewAddressModal = () => {
        if (addresses.length === 4) {
            window.alert("You reached the limit of addresses. Delete one to add other.");
        } else {
            newAddress.current.style.display = 'flex';
        };
    };
    const closeNewAddressModal = () => newAddress.current.style.display = 'none';

    const handleCurrentPassword = e => {
        verifyCurrentPassword(localStorage.getItem('user'), e.target.value).then(res => {
            if (res === null) {
                currentPassword.current.value = '';
                CheckCurrentPassword.current.style.display = 'block';
            } else {
                CheckCurrentPassword.current.style.display = 'none';
            };
        }).catch(err => console.error(err));
    };

    const checkNewPassword = e => {
        if (newPassword.current.value !== e.target.value) {
            checkNew.current.value = '';
            CheckNewPassword.current.style.display = 'block';
        } else {
            CheckNewPassword.current.style.display = 'none';
        };
    };

    const handleController = useCallback(() => {
        setController(controller + 1);
        getAddresses(localStorage.getItem('user')).then(res => setAddresses(res)).catch(err => console.error(`New Error: ${err}`));
    }, [controller]);

    return (
        <>
            <div className="modal-password" ref={changePassword}>
                <form method="POST" action="http://localhost:3001/account/update-password">
                    <fieldset>
                        <legend>CHANGE PASSWORD <button type="button" onClick={closeChangePasswordModal}><IoClose /></button></legend>
                        <p className="form-subtitle">Inform your new account's password</p>
                        <p>
                            <input type="password" placeholder='Your current password *' required onBlur={handleCurrentPassword} ref={currentPassword} />
                            <span className="wrong-password" ref={CheckCurrentPassword}>Wrong password</span>
                        </p>
                        <p>
                            <input type="password" placeholder='Your new password *' required ref={newPassword} />
                        </p>
                        <p>
                            <input type="password" placeholder='Confirm your new password *' name='newpassword' required onBlur={checkNewPassword} ref={checkNew} />
                            <span className="wrong-password" ref={CheckNewPassword}>Password don't match</span>
                        </p>
                        <p className="password-change">
                            <input type="text" defaultValue={props.user} readOnly className="readonly" />
                        </p>
                        <p>
                            <input type="submit" value='SAVE' name='save' />
                        </p>
                    </fieldset>
                </form>
            </div>
            <div className="data">
                <h2><IoPerson /> MY DATA</h2>
                <div>
                    <form>
                        <fieldset>
                            <legend><HiDocumentText /> SAVED DATA <button type="button" onClick={openChangePasswordModal}>CHANGE PASSWORD</button></legend>
                            <p>
                                <label htmlFor="fullname-user">Full name *</label>
                                <input id="fullname-user" type="text" defaultValue={props.fullName} name='fullname' required />
                            </p>
                            <p className="user-account">
                                <FaLock className="lock-email" />
                                <label htmlFor="login">E-mail / Login *</label>
                                <input id="login" type="email" defaultValue={props.user} name='email' readOnly className="readonly" />
                            </p>
                            <p className="gender">
                                <label>Gender *</label>
                                <span>
                                    <input id='male-person' type="radio" value='male' name='gender' /> <label htmlFor="male-person">Male</label>
                                    <input id='female-person' type="radio" value='female' name='gender' />
                                    <label htmlFor="female-person">Female</label>
                                    <input id='not-user' type="radio" value='not' name='gender' />
                                    <label htmlFor="not-user">Rather not inform</label>
                                </span>
                            </p>
                            <p>
                                <label htmlFor="bday">Birthday</label>
                                <input id="bday-user" type="date" name='bday' defaultValue={props.bday} required />
                            </p>
                            <p>
                                <label htmlFor="tel1">Phone</label>
                                <input id="tel" type="text" defaultValue={props.phone === 0 ? '' : props.phone} placeholder='+XX (XX) XXXX-XXXX' name='tel1' required />
                            </p>
                            <p>
                                <label htmlFor="tel2">Second Phone</label>
                                <input id="tel2" type="text" placeholder='+XX (XX) XXXX-XXXX' name='tel2' required />
                            </p>
                            <p>
                                <input type="submit" name='save' value='SAVE' />
                            </p>
                        </fieldset>
                    </form>
                    <div className="addresses">
                        <h2><IoLocationSharp /> ADDRESSES</h2>
                        <ul className="addresses__list">
                            {
                                addresses.map((address, index) => <Address key={index} isDefault={address.default} addressId={address._id} type={address.type} street_address={address.street_address} number={address.street_number} street_address_2={address.street_address_2} postal={address.postal} city={address.city} state={address.state} />)
                            }
                        </ul>
                        <button type="button" onClick={openNewAddressModal}><BsPlusCircle />NEW ADDRESS</button>
                    </div>
                </div>
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
                        <p className="user-account address-user">
                            <input type="email" value={props.user} name='email' readOnly className="readonly" />
                        </p>
                        <p>
                            <input type="submit" value='SAVE' name='save' />
                        </p>
                    </fieldset>
                </form>
            </div>
        </>
    );
};