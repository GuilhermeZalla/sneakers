import { useRef, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { Item } from './item/item';

export const Purchase = (props) => {
    const [items, setItems] = useState(JSON.parse(props.names))
    let arrow = useRef(null);
    let details = useRef(null);

    const showDetails = () => {
        if (arrow.current.style.transform === '' || arrow.current.style.transform === 'rotate(0deg)') {
            arrow.current.style.transform = 'rotate(180deg)';
            details.current.style.display = 'block';
        } else {
            arrow.current.style.transform = 'rotate(0deg)';
            details.current.style.display = 'none';
        };
    };

    return (
        <li>
            <ul>
                <li>
                    <h3>ORDER'S NUMBER</h3>
                    <h4>#{props.purchase_number}</h4>
                </li>
                <li>
                    <h3>STATUS</h3>
                    <h4 className="status">{props.status}</h4>
                </li>
                <li>
                    <h3>DATE</h3>
                    <h4>{props.date}</h4>
                </li>
                <li>
                    <h3>PAYMENT</h3>
                    <h4>{props.payment_type}</h4>
                </li>
                <li>
                    <button type="button" className="purchase-details" onClick={showDetails}>Purchase's details <span ref={arrow}><HiChevronDown /></span></button>
                </li>
            </ul>
            <hr />
            <div className="details" ref={details}>
                <h2>ADDRESS</h2>
                <p>{props.street_address}, Nº {props.street_number}</p>
                <p>{props.district}, ZIP {props.postal} - {props.city},  {props.state}</p>
                <article>
                    <h2>PRODUCT(S)</h2>
                    {
                        items.map((item, index) => <Item key={index} name={item.name} itemPrice={item.price} quant={item.quant} />)
                    }
                </article>
                <hr />
                <h2 className='buyout'>Buyout Total: <span>$ {parseInt(props.price).toFixed(2)}</span></h2>
            </div>
        </li>
    );
};