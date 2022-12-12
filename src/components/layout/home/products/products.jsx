import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { BsCart, BsCartPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const body = {
    method: "POST",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

async function addNewWishlistItem(email, name, price, rank, id) {
    let response = await fetch(`http://localhost:3001/account/wishlist/${email}/${name}/${price}/${rank}/${id}`, body);
    let result = response.json();
    return result;
};

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

async function addNewCartItem(email, name, price, quant) {
    let response = await fetch(`http://localhost:3001/account/shopping-cart/${email}/${name}/${price}/${quant}`, body);
    let result = response.json();
    return result;
};

export const Products = (props) => {
    const [heart, setHeart] = useState(<AiOutlineHeart className="heart" />);
    let stars = [];

    useEffect(() => {
        if (localStorage.getItem('user')) {
            verifyUserWishlist(localStorage.getItem('user')).then(wishlist => {
                for (let i = 0; i < wishlist.length; ++i) {
                    if (wishlist[i].name === props.name) {
                        setHeart(<AiFillHeart className='heart' />);
                    };
                };
            });
        };
    }, [props.name]);

    for (let i = 0; i < props.rank; ++i) {
        stars.push(<AiFillStar key={i} />);
    };

    if (stars.length < 5) {
        let i = 5;
        while (stars.length < 5) {
            stars.push(<AiOutlineStar key={i} />);
            i++;
        };
    };

    const handleNewItem = () => {
        if (localStorage.getItem('user')) {
            if (heart.type.name === 'AiOutlineHeart' || heart.type.name === '') {
                setHeart(<AiFillHeart className='heart' />);
                addNewWishlistItem(localStorage.getItem('user'), props.name, props.price, props.rank, props.id).then(() => console.log('Item added to wishlist.')).catch(err => console.error(err));
            } else {
                setHeart(<AiOutlineHeart className='heart' />);
                removeWishlistItem(localStorage.getItem('user'), props.name).then(() => console.log('Item removed from wishlist.')).catch(err => console.error(err));
            };
        } else {
            window.alert("You need to be logged to favorite a product.");
        };
    };

    const handleNewCartItem = () => {
        addNewCartItem(localStorage.getItem('user'), props.name, props.price, 1).then(res => console.log("New item added to cart")).catch(err => console.error(`New Error: ${err}`));
        window.location.reload();
    };

    return (
        <li>
            <Link to={`/product-overview/${props.name}`}>
                <header>
                    <figure><img src={props.thumbnail} alt={props.name} /></figure>
                </header>
            </Link>
            <div className="description">
                <h2>{props.name}</h2> <span>${props.price}</span>
            </div>
            <div>
                <h2>{stars}</h2>
                <span><button type="button" className="cart-wishlist" onClick={handleNewCartItem}><BsCart className="fill" /><BsCartPlus className="add" /></button><button type="button" onClick={handleNewItem}>{heart}</button></span>
            </div>
        </li>
    );
};
