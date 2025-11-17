import React from 'react'

export default function ProductCount({basketCount, addToBasket, basketId}) {

    const handleCount = (event) => {
        const newCount = event.target.innerText == '+'? basketCount+1 : basketCount-1
        addToBasket(basketId, newCount)
    }
    return (
        <span className="bg-indigo-500 border-zinc-900 border-2 text-white w-full self-end text-xl rounded-full flex justify-between md:w-2/4 lg:w-1/4">
            <button onClick={handleCount} className="w-1/3">+</button>
            <h4 className="py-2 w-1/3 text-center border-x-2 border-gray-300">{basketCount}</h4>
            <button onClick={handleCount} className="w-1/3">-</button>
        </span>
    )
}