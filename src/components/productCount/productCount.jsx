import React from 'react'
import Styles from './productCount.module.css'

export default function ProductCount({basketCount, addToBasket, basketId}) {

    const handleCount = (event) => {
        const newCount = event.target.innerText == '+'? basketCount+1 : basketCount-1
        addToBasket(basketId, newCount)
    }
    return (
        <span className={Styles.productCountBox}>
            <button onClick={handleCount}>+</button>
            <h4>{basketCount}</h4>
            <button onClick={handleCount}>-</button>
        </span>
    )
}
