import React, { useState, useEffect, useContext } from 'react'
import Styles from './basketDrawer.module.css'
import { Drawer, List, ListItem } from '@mui/material'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'
import ProductCount from '../productCount/productCount'

export default function BasketDrawer({ isBasketShow, setIsBasketShow }) {
    const authContext = useContext(AuthContext)
    const [basket, setBasket] = useState([])
    useEffect(() => {
        if (isBasketShow) {
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
                            // setBasketCount(data.basket.find(product => product.productId == params.productId)?.count || 0);
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
                            // 'Content-Type': 'application/json',
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
                            // setBasketCount(data.basket.find(product => product.productId == params.productId)?.count || 0);
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
            <List className={Styles.basketBox}>
                <h2 className={Styles.basketTitle}>سبد خرید</h2>
                {authContext.isLoggedIn ?
                    <>
                        {basket.length ? <>{
                            <div className={Styles.basketList}>{basket.map(product => {
                                return <ListItem key={product.id} className={Styles.basketItem}>
                                    <img src="/src/assets/images/product.jpg" alt="" />
                                    <div className={Styles.itemDetail}>
                                        <span className={Styles.itemInfo}>
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
                                        <div className={Styles.actions}>
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
                                <h3 className={Styles.totalPrice}>
                                    قیمت کل خرید: {totalPrice}
                                </h3>
                                <button className={Styles.payment}>پرداخت</button>
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
