import { useEffect, useRef } from "react";
import { useState } from "react";

const body = {
    method: "DELETE",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

async function removeAddress(id) {
    let response = await fetch(`http://localhost:3001/account/remove-address/${id}`, body);
    let result = response.json();
    return result;
};

async function setDefaultAddress(id, state) {
    let response = await fetch(`http://localhost:3001/account/define-default/${id}/${state}`, {
        method: "PATCH",
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

async function getAddresses(email) {
    let response = await fetch(`http://localhost:3001/account/address/${email}`, {
        method: "GET",
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

export const Address = (props) => {
    const [isDefault, setDefault] = useState(props.isDefault);
    const [addresses, setAddresses] = useState([]);
    let removeModal = useRef(null);

    useEffect(() => {
        getAddresses(localStorage.getItem('user')).then(res => setAddresses(res)).catch(err => console.error(`New Error: ${err}`));
    }, []);

    const handleRemoveModal = () => removeModal.current.style.display = 'flex';
    const closeRemoveModal = () => removeModal.current.style.display = 'none';

    const handleRemove = () => {
        removeAddress(props.addressId).then(res => console.log("Address removed.")).catch(err => console.error(`New Error: ${err}`));
        window.location.reload();
    };

    const handleRemoveDefault = () => {
        setDefaultAddress(props.addressId, false).then(res => console.log("Removed default")).catch(err => console.error(`New Error: ${err}`));
        setDefault(false);
    };

    const handleDefault = (e) => {
        setDefaultAddress(props.addressId, true).then(res => console.log("Address set to default")).catch(err => console.error(`New Error: ${err}`));
        setDefault(true);
        for (let i = 0; addresses.length; ++i) {
            if (addresses[i]?._id !== props.addressId) {
                setDefaultAddress(addresses[i]._id, false).then(res => console.log("Address set to common")).catch(err => console.error(`New Error: ${err}`));
                props.handleController(1);
            }
        }
    };

    return (
        <li className={isDefault ? 'addresses__item-default' : 'addresses__item'}>
            <div className="addresses__modal" ref={removeModal}>
                <article className="addresses__article">
                    <h2>You will remove this address</h2>
                    <span>
                        <button type="button" onClick={handleRemove}>Confirm</button>
                        <button type="button" onClick={closeRemoveModal}>Cancel</button>
                    </span>
                </article>
            </div>
            <ul>
                <li>{props.type} {
                    isDefault ? <span>(DEFAULT)</span> : null
                }</li>
                <li>{props.street_address}</li>
                <li>Número: {props.number}&nbsp;&nbsp; - &nbsp;&nbsp;{props.street_address_2}</li>
                <li>ZIP {props.postal} - {props.city}, {props.state}</li>
                {
                    isDefault ? <li><button type="button" onClick={handleRemoveDefault}>REMOVE DEFAULT</button></li> : <li className="default"><button type="button" onClick={handleRemoveModal}>REMOVE</button><button type="button" onClick={handleDefault}>SET DEFAULT</button></li>
                }
            </ul>
        </li>
    );
};