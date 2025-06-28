import { useContext, useEffect, useState } from 'react';
import styles from './productDetail.module.css';
import Navbar from "../../components/navbar/navbar";
import Footer from '../../components/footer/footer'
import { ProductsContext } from '../../Contexts/ProductsContext';
import { useParams } from 'react-router-dom';
import Slider from '../../components/slider/slider';
import Comments from '../../components/comments/comentns';
import { AuthContext } from '../../Contexts/AuthContext';
import ProductCount from '../../components/productCount/productCount';

export default function ProductDetail() {
    const products = useContext(ProductsContext)
    const authContext = useContext(AuthContext)
    const [thisProduct, setThisProduct] = useState({
        title: '',
        describe: '',
        brand: ''
    })
    const [describe, setDescribe] = useState('')
    const params = useParams()
    const [basketProduct, setBasketProduct] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3000/products/${params.productId}`)
            .then(res => res.json())
            .then(data => {
                setThisProduct(data)
                fetch(`http://localhost:3000/baskets?userId=${authContext?.userInfo?.id}`)
                    .then(res => res.json())
                    .then(data => {
                        setBasketProduct(data.find(product => product.productId == params.productId) || 0);
                    })
            })
    }, [authContext.userInfo])
    useEffect(() => {
        setDescribe(thisProduct.describe.length > 180 ? (thisProduct.describe.slice(0, 180) + '...') : thisProduct.describe)
    }, [thisProduct])
    const showDescribeHandler = () => {
        (describe.length - 3) > 180 ? setDescribe(describe.slice(0, 180) + '...') :
            setDescribe(thisProduct.describe)
    }
    const addToBasket = (basketId, newCount) => {
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
                    setBasketProduct(data)
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
                    setBasketProduct(data)
                })
        }
    }
    const addNewProduct = () => {
        fetch(`http://localhost:3000/baskets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authContext.token}`
            },
            body: JSON.stringify({
                userId: authContext.userInfo.id,
                productTitle: thisProduct.title,
                productId: thisProduct.id,
                price: thisProduct.price,
                off: thisProduct.off,
                count: 1
            })
        })
        .then(res => {
            if (!res.ok) {
              throw new Error(res.text())
            }
            return res.json()
          })
          .then(data => {
            setBasketProduct(data)
          })
          .catch(text => console.log(text))
    }
    return (
        <>
            <Navbar />
            <div className={styles.pageBox}>
                <div className={styles.productDetail}>
                    <div className={styles.sec1}>
                        <div className={styles.imgBox}>
                            <img src="/src/assets/images/product.jpg" alt="" />
                            <span className={styles.shape}></span>
                        </div>
                        <div className={styles.detail}>
                            <h2 className={styles.productName}>{thisProduct.title}</h2>
                            <h2 className={styles.presentTitle}>معرفی</h2>
                            <p className={styles.describe}>{describe}</p>
                            {thisProduct.describe.length > 180 &&
                                <button className={styles.seeMoreBtn} onClick={showDescribeHandler}>
                                    {(describe.length - 3) > 180 ? 'کمتر' : 'بیشتر'}
                                </button>
                            }
                        </div>
                    </div>
                    <div className={styles.sec2}>
                        {thisProduct.off ?
                            <>
                                <span>
                                    <h5 className='line-through text-gray-400'>{thisProduct.price} تومان</h5>
                                    <h2>{thisProduct.price - (thisProduct.off / 100 * thisProduct.price)}</h2>
                                </span>
                            </>
                            :
                            <h5>{thisProduct.price} تومان</h5>
                        }
                        {basketProduct.count > 0 ?
                            <ProductCount
                                className={styles.counts}
                                pageId={params.productId}
                                basketCount={basketProduct.count}
                                addToBasket={addToBasket}
                                basketId={basketProduct.id}
                            />
                            :
                            <button
                                className={styles.addToBasketBtn}
                                onClick={addNewProduct}
                            >
                                افزودن به سبد خرید
                            </button>
                        }
                    </div>
                </div>
                <Slider products={products} thisProduct={thisProduct} />
                <Comments {...params} productTitle={thisProduct.title} />
            </div>
            <Footer />
        </>
    )
}