import { Header } from "../../common/header/header";
import dataJSON from "../../../assets/data/products.json";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiPlusMedical } from 'react-icons/bi';
import { ImMinus } from 'react-icons/im';
import { useNavigate } from "react-router-dom";

const body = {
    method: "POST",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

async function addNewCartItem(email, name, price, quant) {
    let response = await fetch(`http://localhost:3001/account/shopping-cart/${email}/${name}/${price}/${quant}`, body);
    let result = response.json();
    return result;
};

export const ProductOverview = (props) => {
    const [product, setProduct] = useState([]);
    const [count, setCount] = useState(0);
    const [controller, setController] = useState(0);
    let { name } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        for (let i = 0; i < dataJSON.products.length; ++i) {
            if (dataJSON.products[i].shoeName === name) {
                setProduct(dataJSON.products[i]);
            };
        };
    }, [name]);

    const handleNewItem = () => {
        if (localStorage.getItem('user')) {
            addNewCartItem(localStorage.getItem('user'), product.shoeName, product.price, count).then(res => console.log("New item added to cart")).catch(err => console.error(`New Error: ${err}`));
            setController(controller + 1);
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <Header handleController={controller} />
            <main className="product-overview">
                <div className="product-slider">
                    <header>
                        <img src={product.image_url} alt={product.shoeName} />
                    </header>
                    <footer>
                        <img src="" alt="" /><img src="" alt="" /><img src="" alt="" /><img src="" alt="" />
                    </footer>
                </div>
                <article>
                    <h1>{product.shoeName}</h1>
                    <p>{product.description}</p>
                    <span className="price">${product.price}</span>
                    <footer>
                        <div>
                            <button type="button" onClick={() => setCount(count - 1)}><ImMinus /></button>
                            <span className="counter">{count < 0 ? setCount(0) : count}</span>
                            <button type="button" onClick={() => setCount(count + 1)}><BiPlusMedical /></button>
                        </div>
                        <button type="button" onClick={handleNewItem}><AiOutlineShoppingCart />Add to cart</button>
                    </footer>
                </article>
            </main>
        </>
    );
};