import { Link } from "react-router-dom"
import ArticleTtem from "../articleItem/articleItem"
import Styles from './lastArticles.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import SectionHeader from '../SectionHeader/SectionHeader'

export default function LastArticles() {
    return (
        <div className={Styles.articlesBox}>
            <SectionHeader title='آخرین مقالات'/>
            <div className={Styles.lastArticlesItems}>
                <Link to={'/articles'} className={Styles.seeMore}>بیشتر</Link>
                <Swiper
                    className={Styles.slider}
                    spaceBetween={50}
                    slidesPerView={1}
                    breakpoints={{
                        768: {
                            slidesPerView: 2
                        },
                        1024: {
                            slidesPerView: 4
                        }
                    }}
                >

                    <SwiperSlide>
                        <ArticleTtem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ArticleTtem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ArticleTtem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ArticleTtem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ArticleTtem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ArticleTtem />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}