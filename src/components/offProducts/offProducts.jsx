import React, { useContext } from "react"
import Product from "../../components/product/product"
import { Link } from "react-router-dom"
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { ProductsContext } from "../../Contexts/ProductsContext";
import Styles from './offProducts.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function OffProducts() {
    let offProducts = useContext(ProductsContext).filter(Product => {
        return Product.off != 0
    })
    console.log(offProducts);
    return (
        <div className={Styles.offProductsBox}>
             <Link className={Styles.seeMoreBtn} to='/products'>نمایش کامل
                <ArrowBackIosNewOutlinedIcon />
            </Link>
            <Swiper
                className={Styles.products}
                slidesPerView={2}
                loop
                breakpoints={{
                    768: {
                        slidesPerView: 4
                    },
                    1024: {
                        slidesPerView: 5
                    }
                }}
            >
                {offProducts.map(product => {
                    return <SwiperSlide className={Styles.slide} key={product.id}>
                        <Product {...product} />
                    </SwiperSlide>
                })}
            </Swiper>
           
        </div>
    )
}