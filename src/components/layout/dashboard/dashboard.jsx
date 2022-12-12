import { Header } from "../../common/header/header";
import { AiFillHome } from 'react-icons/ai';
import { IoBasketSharp, IoPerson } from 'react-icons/io5';
import { IoMdHeart } from 'react-icons/io';
import { useEffect, useRef, useState } from "react";
import { Home } from "./home/home";
import { UserData } from "./userData/userData";
import { Purchases } from "./purchases/purchases";
import { Wishlist } from "./wishlist/wishlist";
import { useParams } from "react-router-dom";
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

async function getAccount(email) {
    let response = await fetch(`http://localhost:3001/account/user/${email}`, body);
    let result = response.json();
    return result;
};

async function getPurchases(email) {
    let response = await fetch(`http://localhost:3001/account/purchase/${email}`, body);
    let result = response.json();
    return result;
};

async function getAddress(email) {
    let response = await fetch(`http://localhost:3001/account/address/${email}`, body);
    let result = response.json();
    return result;
};

export const Dashboard = () => {
    const [user, setUser] = useState([]);
    const [purchase, setPurchase] = useState([]);
    const [address, setAddress] = useState([]);
    let { destination } = useParams();
    let navigate = useNavigate();
    let aside = useRef();

    useEffect(() => {
        getAccount(localStorage.getItem('user')).then(res => setUser(res)).catch(err => console.error(err));
        getPurchases(localStorage.getItem('user')).then(res => setPurchase(res[res.length - 1])).catch(err => console.error(`New Error: ${err}`));
        getAddress(localStorage.getItem('user')).then(res => {
            for (let i = 0; i < res.length; ++i) {
                if (res[i].default) {
                    setAddress(res[i]);
                };
            };
        }).catch(err => console.error(`New Error: ${err}`));
    }, []);

    const handleOption = e => {
        navigate(`/dashboard/${e.target.value}`);
        window.scrollTo(0, 0);
    };

    function updateDashboard() {
        switch (destination) {
            case 'home':
                return <Home key={1} user={user?.useremail} fullName={user?.full_name} purchase_number={purchase?.purchase_number} status={purchase?.status} date={purchase?.date} payment_type={purchase?.payment_type} shipping={purchase?.shipping} street_address={address?.street_address} street_number={address.street_number} district={address?.district} postal={address?.postal} city={address?.city} state={address?.state} />
            case 'data':
                return <UserData key={2} fullName={user?.full_name} user={user?.useremail} bday={user?.birthday} phone={user?.phone} />
            case 'purchase':
                return <Purchases key={3} />
            case 'wishlist':
                return <Wishlist key={4} />
            default:
                console.error("Option not found.");
        };
    };

    return (
        <>
            <Header />
            <div className="container">
                <aside className="aside" ref={aside}>
                    <ul className="aside__list">
                        <li className="aside__item"><button type="button" value='home' onClick={handleOption}><AiFillHome /> Home</button></li>
                        <li className="aside__item"><button type="button" value='data' onClick={handleOption}><IoPerson /> My Data</button></li>
                        <li className="aside__item"><button type="button" value='purchase' onClick={handleOption}><IoBasketSharp /> My Purchases</button></li>
                        <li className="aside__item"><button type="button" value='wishlist' onClick={handleOption}><IoMdHeart /> Wishlist</button></li>
                    </ul>
                </aside>
                <main className="main-dashboard">{updateDashboard()}</main>
            </div>
        </>
    );
};