import { useEffect,  useState } from "react";
import dataJSON from "./../../../../assets/data/products.json";
import { IoMdTrash } from 'react-icons/io';

async function deleteCartItem(email, name){
    let response = await fetch(`http://localhost:3001/account/cart-item/remove/${email}/${name}`, {
        method: "DELETE",
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

export const Item = (props) => {
    const [thumbnail, setThumbnail] = useState('');

    useEffect(() => {
        for (let i = 0; i < dataJSON.products.length; ++i) {
            if (dataJSON.products[i].shoeName === props.name) {
                setThumbnail(dataJSON.products[i].thumbnail);
            };
        };
    }, [props.name]);

    const handleRemove = () => {
        deleteCartItem(localStorage.getItem('user'), props.name).then(res => console.log('Item removed from cart.')).catch(err => console.error(err));
        props.handleCounter(1);
    };

    return (
        <li className="header__item-cart">
            <figure><img src={thumbnail} alt={props.name} /></figure>
            <article>
                <h2>{props.name}</h2>
                <div>
                    $<span>{props.price.toFixed(2)} x {props.quant}</span> <span>${(props.price * props.quant).toFixed(2)}</span>
                </div>
            </article>
            <button type="button" className="remove" onClick={handleRemove}><IoMdTrash/></button>
        </li>
    );
};