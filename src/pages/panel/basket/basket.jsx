import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../Contexts/AuthContext'
import { Link } from 'react-router-dom'
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
    <>
      <div className="w-full max-w-[900px] h-full p-2 !mx-3 flex flex-col justify-between">
        {basket.length ?
          <>
            <div className="flex flex-col gap-2 mb-5">{basket.map(product => {
              return <div key={product.id} className="p-5 bg-gray-50 text-nowrap flex justify-between hover:bg-gray-100 rounded-md">
                <span className="flex gap-5">
                  <img src="/src/assets/images/product.jpg" alt="" className="rounded-md w-20 border border-gray-200" />
                  <span className="flex flex-col justify-between">
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
                <div className="space-y-2 text-white text-sm flex flex-col !justify-end w-1/3 pr-2 md:justify-center md:items-center md:flex-row md:space-x-2 md:space-x-reverse">
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
              <h3 className="bg-gray-200 mb-3 p-3 rounded-md">
                قیمت کل خرید: {totalPrice} تومان
              </h3>
              <button className="text-white bg-zinc-900 rounded-md w-full p-3 hover:bg-zinc-950">پرداخت</button>
            </div>
          </> :
          <div className="flex flex-col gap-2">
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