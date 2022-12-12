import { useEffect, useState } from 'react';
import { IoMdHeart } from 'react-icons/io';
import { Product } from './product/product';
import { Link } from 'react-router-dom';

async function verifyUserWishlist(email) {
    let response = await fetch(`http://localhost:3001/account/wishlist/${email}`, {
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

export const Wishlist = () => {
    const [favorites, setFavorites] = useState([]);
    const [controller, setController] = useState(0);

    useEffect(() => {
        if (localStorage.getItem('user')) {
            verifyUserWishlist(localStorage.getItem('user')).then(res => setFavorites(res)).catch(err => console.error(err));
        };
    }, [controller]);

    const handleController = () => setController(controller + 1);

    return (
        <div className="wishlist">
            <h1><IoMdHeart /> WISHLIST</h1>
            {
                favorites.length < 1
                    ?
                    <div className="empty-wishlist">
                        <h2>You didn't wishlist any product.</h2>
                        <Link to={'/'}>BACK TO HOME</Link>
                    </div>
                    :
                    <ul>
                        {
                            favorites.map((item, index) => <Product key={index} name={item.name} price={item.price} handleController={handleController} />)
                        }
                    </ul>
            }
        </div>
    );
};