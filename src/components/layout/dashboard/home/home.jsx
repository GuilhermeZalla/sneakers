import { FaShoppingCart } from 'react-icons/fa';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import { MdDashboard } from 'react-icons/md';
import { IoBasketSharp, IoPerson } from 'react-icons/io5';
import { IoMdHeart } from 'react-icons/io';
import { useNavigate } from "react-router-dom";
import NoProfile from '../../../../assets/images/no-profile.png';

export const Home = (props) => {
    let navigate = useNavigate();

    const handleOption = e => {
        navigate(`/dashboard/${e.target.value}`);
        window.scrollTo(0, 0);
    };

    return (
        <div className="home">
            <div>
                <article className="home__article">
                    <figure><img src={NoProfile} alt="User" /></figure>
                    <h2>Welcome, {props.fullName} <span><BsFillEnvelopeFill /> {props.user}</span></h2>
                </article>
                <article className="home__article">
                    <h3>Available Cash</h3>
                    <span>$ 0,00</span>
                </article>
            </div>
            <h2 className="home__title"><FaShoppingCart /> LAST ORDER'S RESUME</h2>
            {
                props.purchase_number ?
                    <div className="home__article">
                        <ul className="resume__list">
                            <li className="resume__item">
                                <ul className="resume__sublist">
                                    <li className="resume__subitem">
                                        <h3>ORDER'S NUMBER</h3>
                                        <span>#{props.purchase_number}</span>
                                    </li>
                                    <li className="resume__subitem">
                                        <h3>STATUS</h3>
                                        <span className="status">{props.status}</span>
                                    </li>
                                    <li className="resume__subitem mobile">
                                        <h3>DATE</h3>
                                        <span>{props.date}</span>
                                    </li>
                                    <li className="resume__subitem mobile">
                                        <h3>PAYMENT</h3>
                                        <span>{props.payment_type}</span>
                                    </li>
                                </ul>
                            </li>
                            <li className="resume__item">
                                <ul className="resume__sublist mobile">
                                    <li className="resume__subitem">
                                        <h3>ADDRESS</h3>
                                        <div className="user-address">
                                            <span>{props.street_address}</span>
                                            <span>Number {props.street_number}, {props.district}</span>
                                            <span>ZIP {props.postal} - {props.city}, {props.state}</span>
                                        </div>
                                    </li>
                                    <li className="resume__subitem">
                                        <h3>Shipping company </h3>
                                        <span className="shipping">{props.shipping}</span>
                                    </li>
                                </ul>
                            </li>
                            <li className="resume__item">
                                <button className="purchases-link" value='purchase' onClick={handleOption}>See all purchases</button>
                            </li>
                        </ul>
                    </div>
                    :
                    <div className="home__article">
                        <ul className="resume__list">
                            <li className="resume__item">
                                You didn't buy anything yet!
                            </li>
                        </ul>
                    </div>
            }
            <h2 className="home__title"><MdDashboard /> SHORTCUTS</h2>
            <div className="shortcuts">
                <button type="button" value='purchase' onClick={handleOption}><IoBasketSharp /> Purchases</button>
                <button type="button" value='data' onClick={handleOption}><IoPerson /> My Data</button>
                <button type="button" value='wishlist' onClick={handleOption}><IoMdHeart /> Wishlist</button>
            </div>
        </div>
    );
};