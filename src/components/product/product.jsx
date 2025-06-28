import React from 'react';
import Styles from './products.module.css'
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import { Link } from "react-router-dom";


export default function Product(props) {
    const { id, img, title, price, off } = props
    return (
        <Link to={`/ProductDetail/${id}`} className={Styles.productBox}>
            <div>
                <img src="/src/assets/images/product.jpg" alt="product" />
                <h3 className='text-base p-2'>{title}</h3>
            </div>
            <div className={Styles.infoBox}>
                {off ? <h5 className='line-through text-gray-400'>{price}</h5> : <></>}
                <div className={Styles.details}>
                    <div className={Styles.price}>

                        <h2>{off ? price - (off / 100 * price) : price}</h2>
                        <LocalGroceryStoreOutlinedIcon className="text-xl" />
                    </div>
                    {off ? <span className={Styles.offPersent}>{off}%</span> : ''}
                </div>
            </div>
        </Link>
    )
}