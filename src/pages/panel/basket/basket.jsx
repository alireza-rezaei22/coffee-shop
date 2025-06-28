import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../Contexts/AuthContext'
import { Link } from 'react-router-dom'
import Styles from './basket.module.css'
import ProductCount from '../../../components/productCount/productCount'

export default function Basket() {
  const [basket, setBasket] = useState([])
  const authContext = useContext(AuthContext)
  useEffect(() => {
    console.log(authContext.token);
    if (authContext.userInfo) {
      console.log(authContext.userInfo.id);
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
    }
  }, [])
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
    <>
      <div className={Styles.basketBox}>
        {basket.length ?
          <>
            <div className={Styles.basketList}>{basket.map(product => {
              return <div key={product.id} className={Styles.basketItem}>
                <span className={Styles.rightSec}>
                  <img src="/src/assets/images/product.jpg" alt="" />
                  <span className={Styles.itemInfo}>
                    <h4>{product.productTitle}</h4>
                    {product.off ?
                      <>
                        <span>
                          <h5 className='line-through text-gray-400 text-sm'>{product.price} تومان</h5>
                          <h2>{product.price - (product.off / 100 * product.price)} تومان</h2>
                        </span>
                      </>
                      :
                      <h5>{product.price} تومان</h5>
                    }
                  </span>
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
            })}
            </div>
            <div>
              <h3 className={Styles.totalPrice}>
                قیمت کل خرید: {totalPrice}
              </h3>
              <button className={Styles.payment}>پرداخت</button>
            </div>
          </> :
          <div className={Styles.basketList}>
            <h3
              className="text-center text-md"
              onClick={() => {
                authContext.logout()
              }}
            >
              سبد خرید شما خالی است
            </h3>
          </div>
        }
      </div>
    </>
  )
}
