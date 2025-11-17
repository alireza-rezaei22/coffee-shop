import React, { useContext } from "react"
import Product from "../../components/product/product"
import { Link } from "react-router-dom"
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { ProductsContext } from "../../Contexts/ProductsContext";
import { Swiper, SwiperSlide } from 'swiper/react'

export default function OffProducts() {
    let offProducts = useContext(ProductsContext).filter(product => {
        return product.off != 0
    })
    console.log(offProducts);
    return (
        <div className="bg-gradient-to-bl from-indigo-600 to-indigo-900 relative p-4 flex flex-col gap-3 rounded-l-full rounded-r-xl lg:mx-20 md:mx-0">
            <Link className="justify-end w-full absolute -top-8 left-0 flex items-center text-red-600 space-x-2 space-x-reverse" to='/products'>نمایش کامل
                <ArrowBackIosNewOutlinedIcon />
            </Link>
            <Swiper
                className="!mr-0 w-10/12 text-white"
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
                    return <SwiperSlide className="w-fit" key={product.id}>
                        <Product {...product} />
                    </SwiperSlide>
                })}
            </Swiper>
        </div>
    )
}