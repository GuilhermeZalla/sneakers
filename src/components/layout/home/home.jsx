import { useState } from 'react';
import dataJSON from '../../../assets/data/products.json';
import { Header } from '../../common/header/header';
import { Products } from './products/products';

let options = document.querySelectorAll('button');

export const Home = () => {
    const [option, setOption] = useState('all');

    const handleOption = e => {
        setOption(e.target.value);
        for (let i = 0; i < options.length; ++i) {
            if (options[i] === e.target) {
                options[i].style.color = 'hsl(26, 100%, 55%)';
                options[i].style.fontWeight = '700';
                options[i].style.textDecoration = 'underline';
            } else if (options[i] !== e.target) {
                options[i].style.color = 'hsl(220, 13%, 13%)';
                options[i].style.fontWeight = 'initial';
                options[i].style.textDecoration = 'none';
            };
        };
    };

    return (
        <>
            <Header />
            <div className="container-home">
                <aside className="aside-home">
                    <div>
                        <h2 className="aside__title">Sneakers</h2>
                        <ul className="aside__list">
                            <li>Sneakers</li>
                            <li><button type="button" value="all" onClick={handleOption}>All Brands</button></li>
                            <li><button type="button" value="nike" onClick={handleOption}>Nike</button></li>
                            <li><button type="button" value="adidas" onClick={handleOption}>Adidas</button></li>
                            <li><button type="button" value="rebook" onClick={handleOption}>Rebook</button></li>
                            <li><button type="button" value="puma" onClick={handleOption}>Puma</button></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="aside__title">Clothes and Gifts</h2>
                        <ul>
                            <li>Clothes and Gifts</li>
                            <li><button type="button" value="clothes and gifts" onClick={handleOption}>View All</button></li>
                            <li><button type="button" value="shirt" onClick={handleOption}>Shirts &amp; Blouses</button></li>
                            <li><button type="button" value="cap" onClick={handleOption}>Caps</button></li>
                            <li><button type="button" value="gift" onClick={handleOption}>Gifts</button></li>
                        </ul>
                    </div>
                </aside>
                <main className="home">
                    <h2 className="product__title">{option === 'shirt' ? 'shirts & blouses' : option}</h2>
                    <ul>
                        {
                            option !== 'all' ?
                                dataJSON.products.map((product, index) => product.brand === option ? <Products key={index} id={product.id} thumbnail={product.thumbnail} name={product.shoeName} price={product.price} rank={product.rank} /> : option === 'clothes and gifts' ? product.type !== 'sneaker' ? <Products key={index} id={product.id} thumbnail={product.thumbnail} name={product.shoeName} price={product.price} rank={product.rank} /> : null : product.type === option ? <Products key={index} id={product.id} thumbnail={product.thumbnail} name={product.shoeName} price={product.price} rank={product.rank} /> : null)
                                :
                                dataJSON.products.map((product, index) => <Products key={index} id={product.id} thumbnail={product.thumbnail} name={product.shoeName} price={product.price} rank={product.rank} />)
                        }
                    </ul>
                </main>
            </div>
        </>
    );
};