import { IoBasketSharp } from 'react-icons/io5';
import { Purchase } from './purchase/purchase';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const body = {
    method: "GET",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

async function getPurchases(email) {
    let response = await fetch(`http://localhost:3001/account/purchase/${email}`, body);
    let result = response.json();
    return result;
};

export const Purchases = () => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        getPurchases(localStorage.getItem('user')).then(res => setPurchases(res)).catch(err => console.error(`New Error: ${err}`));
    }, []);

    return (
        <div className="purchases">
            <h2><IoBasketSharp /> MY PURCHASES</h2>
            {
                purchases.length < 1
                    ?
                    <div className="empty-purchases">
                        <h2>You didn't purchase any product.</h2>
                        <Link to={'/'}>BACK TO HOME</Link>
                    </div>
                    :
                    <ul>
                        {
                            purchases.map((purchase, index) => <Purchase key={index} purchase_number={purchase.purchase_number} status={purchase.status} date={purchase.date} payment_type={purchase.payment_type} quantity={purchase.quantity} price={purchase.price} street_address={purchase.street_address} street_number={purchase.number} district={purchase.district} postal={purchase.postal} city={purchase.city} state={purchase.state} names={purchase.names} />)
                        }
                    </ul>
            }
        </div>
    );
};