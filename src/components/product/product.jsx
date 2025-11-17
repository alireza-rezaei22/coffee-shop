import React from 'react';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import { Link } from "react-router-dom";

export default function Product(props) {
    const { id, img: productImg, title, price, off } = props
    console.log(productImg);
    return (
        <Link to={`/ProductDetail/${id}`} className="w-32 h-60 self-end space-y-2 inline-flex flex-col justify-between text-sm border-zinc-900 border-2 bg-gradient-to-b from-zinc-500 to-zinc-900 rounded-lg text-white lg:w-40 lg:h-72">
            <div>
                <img src={productImg || "/src/assets/images/product.jpg"} alt="product" className="rounded-lg w-full" />
                <h3 className='text-base p-2'>{title}</h3>
            </div>
            <div className="m-2 space-y-2">
                {off ? <h5 className='line-through text-gray-400'>{price}</h5> : <></>}
                <div className="flex justify-between items-center">
                    <div className="w-2/3 flex-1 bg-zinc-600 text-white flex items-center justify-between px-2 py-1 rounded-full divide-x-2 divide-x-reverse">
                        <h2>{off ? price - (off / 100 * price) : price}</h2>
                        <LocalGroceryStoreOutlinedIcon className="text-xl" />
                    </div>
                    {off ? <span className="text-red-600 font-bold italic">{off}%</span> : ''}
                </div>
            </div>
        </Link>
    )
}