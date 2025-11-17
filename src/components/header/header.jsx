import React from "react"
import { Link } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';

export default function Header() {
    return (
        <header className="container flex">
            <div className="relative h-[40vh] w-full flex flex-col mb-12 md:h-[60vh] lg:h-[90vh]">
                <div className="absolute h-full w-full bg-[url(/src/assets/images/header-img.png)] bg-cover bg-top"></div>
                <span className=" flex flex-col gap-2 m-3 md:m-8 md:gap-5 lg:gap-14">
                    <h1 className="text-3xl z-10  text-zinc-600 md:text-5xl lg:w-1/2 lg:text-7xl">
                        <Typewriter
                            options={{
                                strings: ['انواع قهوه', 'انواع ابزار و تجهیزات', 'ارسال در سریع ترین زمان'],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </h1>
                    <p className="max-w-48 md:max-w-72 lg:max-w-96 text-lg text-zinc-500">قهوه کره ای دالگونا نوشیدنی ای است که با هم زدن به .</p>
                    <span>
                        <Link className="w-max text-zinc-400" to='/about'>اطلاعات بیشتر درباره ما</Link>
                        <Link to='#' className="w-max px-10 py-2 flex items-center space-x-2 space-x-reverse text-[13px] font-bold text-zinc-500 border-2 border-zinc-400 cursor-pointer rounded-full">
                            <button>ثبت کافی شاپ</button>
                            <FreeBreakfastOutlinedIcon />
                        </Link>
                    </span>
                </span>
            </div>
        </header>
    )
}