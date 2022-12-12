import { IoMdTrash } from 'react-icons/io';
import { FaShoppingCart } from 'react-icons/fa';
import dataJSON from '../../../../../assets/data/products.json';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

async function removeWishlistItem(email, name) {
    let response = await fetch(`http://localhost:3001/account/wishlist/remove/${email}/${name}`, {
        method: "DELETE",
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    let result = response.json();
    return result;
};

export const Product = (props) => {
    const [thumbnail, setThumbnail] = useState('');

    const handleRemove = () => {
        removeWishlistItem(localStorage.getItem('user'), props.name).then(() => console.log('Item removed from wishlist.')).catch(err => console.error(err));
        props.handleController();
    };

    useEffect(() => {
        for (let i = 0; i < dataJSON.products.length; ++i) {
            if (dataJSON.products[i].shoeName === props.name) {
                setThumbnail(dataJSON.products[i].thumbnail);
            };
        };
    }, [props.name]);

    return (
        <li className="item-container">
            <ul>
                <li><figure><img src={thumbnail} alt={props.name} /></figure></li>
                <li><h2>{props.name}</h2></li>
                <li>$ {props.price}</li>
                <li><Link to={`/product-overview/${props.name}`}><FaShoppingCart />BUY NOW</Link><button type="button" onClick={handleRemove}><IoMdTrash /></button></li>
            </ul>
        </li>
    )
};