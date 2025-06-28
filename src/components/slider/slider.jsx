import React from 'react';
import styles from './slider.module.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Product from '../product/product';
import SectionHeader from '../SectionHeader/SectionHeader'

export default function Slider(props) {
    const { products, thisProduct } = props
    return (
        <>
            <SectionHeader title={'کالا های مرتبط'}/>
            <Swiper className={styles.slider}
                spaceBetween={10}
                slidesPerView={2}
                loop
                breakpoints={{
                    768: {
                        slidesPerView: 3
                    },
                    1024: {
                        slidesPerView: 4
                    }
                }}
            >
                {products.filter(product => {
                    return product.brand == thisProduct.brand
                }).map(product => {
                    return (<SwiperSlide key={product.id}>
                        <Product {...product} />
                    </SwiperSlide>)
                })}
            </Swiper>
        </>
    )
}