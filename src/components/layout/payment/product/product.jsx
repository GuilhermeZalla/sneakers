import dataJSON from "./../../../../assets/data/products.json";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoMdTrash } from 'react-icons/io';
import { useState, useEffect } from "react";

async function updateQuantity(email, name, quant) {
    let response = await fetch(`http://localhost:3001/account/cart-item/update-quantity/${email}/${name}/${quant}`, {
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

async function deleteCartItem(email, name) {
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

export const Product = (props) => {
    const [quant, setQuant] = useState(props.quant);

    useEffect(() => {
        updateQuantity(localStorage.getItem('user'), props.name, quant).then(res => console.log("Quantity updated.")).catch(err => console.error(err));
    }, [quant, props.name]);

    const handleMore = () => {
        setQuant(quant + 1);
        props.handleController(1);
    };

    const handleLess = () => {
        if (quant - 1 < 0) {
            setQuant(0);
            props.handleController(1);
        } else {
            setQuant(quant - 1);
            props.handleController(1);
        };
    };

    const handleRemove = () => {
        deleteCartItem(localStorage.getItem('user'), props.name).then(res => console.log('Item removed from cart.')).catch(err => console.error(err));
        props.handleController(1);
    };

    return (
        <li className="main__item">
            <figure>
                {
                    dataJSON.products.map((product, index) => product.shoeName === props.name ? <img key={index} src={product.thumbnail} alt={props.name} /> : null)
                }
            </figure>
            <ul className="main__list-2">
                <li className="main__product-title">
                    <h2>NAME</h2>
                    <h3>{props.name}</h3>
                </li>
                <li className="main__product-price">
                    <h2>PRICE</h2>
                    <h3>${props.price}</h3>
                </li>
                <li>
                    <h2>BRAND</h2>
                    {
                        dataJSON.products.map((product, index) => product.shoeName === props.name ? <h3 key={index}>{product.brand}</h3> : null)
                    }
                </li>
                <li>
                    <div>
                        <button type="button" onClick={handleLess}><IoIosArrowBack /></button>
                        <span>{quant}</span>
                        <button type="button" onClick={handleMore}><IoIosArrowForward /></button>
                    </div>
                    <button type="button" name='remove-item' onClick={handleRemove}><IoMdTrash /></button>
                </li>
            </ul>
        </li>
    );
};