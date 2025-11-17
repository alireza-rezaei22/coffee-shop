import React, { useState, useEffect, useContext } from 'react'
import { Drawer, List, ListItem } from '@mui/material'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'
import ProductCount from '../productCount/productCount'

export default function BasketDrawer({ isBasketShow, setIsBasketShow }) {
    const authContext = useContext(AuthContext)
    const [basket, setBasket] = useState([])
    useEffect(() => {
        if (isBasketShow && authContext.isLoggedIn) {
            fetch(`http://localhost:3000/baskets?userId=${authContext.userInfo.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authContext.token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setBasket(data)
                })
                .catch(text => {
                    console.log(text);
                })
        }
    }, [isBasketShow])

    const addToBasket = (basketId, newCount) => {
        console.log(basketId);
        if (newCount > 0) {
            fetch(`http://localhost:3000/baskets/${basketId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authContext.token}`
                },
                body: JSON.stringify({
                    count: newCount
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    fetch(`http://localhost:3000/baskets?userId=${authContext.userInfo?.id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${authContext.token}`
                        }
                    })
                        .then(res => {
                            if (!res.ok) {
                                throw new Error(res.text())
                            }
                            return res.json()
                        })
                        .then(data => {
                            console.log(data);
                            setBasket(data)
                        })
                        .catch(text => console.log(text))
                })
        } else {
            fetch(`http://localhost:3000/baskets/${basketId}`, {
                method: 'DELETE',
                headers: {
                    'authorization': `Bearer ${authContext.token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    fetch(`http://localhost:3000/baskets?userId=${authContext.userInfo?.id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${authContext.token}`
                        }
                    })
                        .then(res => {
                            if (!res.ok) {
                                throw new Error(res.text())
                            }
                            return res.json()
                        })
                        .then(data => {
                            console.log(data);
                            setBasket(data)
                        })
                        .catch(text => console.log(text))
                })
        }
    }

    const totalPrice = basket.reduce((totalPrice, nextProduct) =>
        totalPrice + (nextProduct.off ?
            (nextProduct.price - (nextProduct.off / 100 * nextProduct.price)) * nextProduct.count :
            nextProduct.price)
        , 0)

    return (
        <Drawer
            open={isBasketShow}
            onClose={() => setIsBasketShow(false)}
        >
            <List className="w-64 h-full p-2 !mx-3 flex flex-col justify-between">
                <h2 className="w-full text-center p-3 text-xl text-zinc-600 font-bold">سبد خرید</h2>
                {authContext.isLoggedIn ?
                    <>
                        {basket.length ? <>{
                            <div className="flex-1 flex flex-col gap-2 overflow-scroll">{basket.map(product => {
                                return <ListItem key={product.id} className="px-2 bg-gray-50 hover:bg-gray-100">
                                    <img src="/src/assets/images/product.jpg" alt="" className="rounded-md w-20 border border-gray-200" />
                                    <div className="m-1 w-full flex flex-col items-start gap-2">
                                        <span className="w-full flex flex-col items-start">
                                            <h4>{product.productTitle}</h4>
                                            {product.off ?
                                                <>
                                                    <span className="self-end">
                                                        <h5 className='line-through text-gray-400 text-sm'>{product.price} تومان</h5>
                                                        <h2>{product.price - (product.off / 100 * product.price)} تومان</h2>
                                                    </span>
                                                </>
                                                :
                                                <h5 className="self-end">{product.price} تومان</h5>
                                            }
                                        </span>
                                        <div className="self-end space-x-2 space-x-reverse text-white text-sm w-full pr-2">
                                            <ProductCount
                                                pageId={product.productId}
                                                basketCount={product.count}
                                                addToBasket={addToBasket}
                                                basketId={product.id}
                                                basket={basket}
                                            />
                                        </div>
                                    </div>
                                </ListItem>
                            })}
                            </div>
                        }
                            <div>
                                <h3 className="bg-gray-200 mb-3 p-3 rounded-md">
                                    قیمت کل خرید: {totalPrice}
                                </h3>
                                <button className="text-white bg-zinc-900 rounded-md w-full p-3 hover:bg-zinc-950">پرداخت</button>
                            </div>
                        </> :
                            <h3
                                className="text-center text-md h-full"
                            >
                                سبد خرید شما خالی است
                            </h3>
                        }
                    </> :
                    <h3
                        className="text-center text-md h-full"
                    >
                        برای مشاهده <Link to={'/login'} className="text-blue-400">وارد</Link> شوید
                    </h3>
                }
            </List>
        </Drawer >
    )
}