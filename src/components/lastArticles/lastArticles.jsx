import { Link } from "react-router-dom"
import ArticleItem from "../articleItem/articleItem"
import { Swiper, SwiperSlide } from 'swiper/react'
import SectionHeader from '../SectionHeader/SectionHeader'

export default function LastArticles() {
    return (
        <div className="py-5 px-20 lg:px-20 md:px-5">
            <SectionHeader title='آخرین مقالات'/>
            <div className="flex flex-col gap-5">
                <Link to={'/articles'} className="self-end mx-5 text-blue-500">بیشتر</Link>
                <Swiper
                    className="w-full"
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
                        <ArticleItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ArticleItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ArticleItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ArticleItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ArticleItem />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ArticleItem />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}