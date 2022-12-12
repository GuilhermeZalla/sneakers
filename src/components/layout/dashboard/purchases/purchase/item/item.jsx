import dataJSON from "../../../../../../assets/data/products.json";

export const Item = (props) => {
    return (
        <div>
            {
                dataJSON.products.map((figure, index) => figure.shoeName === props.name ? <figure key={index}><img src={figure.thumbnail} alt={props.name} /></figure> : null)
            }
            <ul>
                <li>{props.name} <span>$ {(props.itemPrice * props.quant).toFixed(2)}</span></li>
                <li>Quantity: {props.quant}</li>
            </ul>
        </div>
    );
};