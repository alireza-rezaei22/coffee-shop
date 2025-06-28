import React from "react"
import Styles from './header.module.css'
import { Link } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';
export default function Header() {
    return (
        <header className="container">
            <div className={Styles.present}>
                <h1 className={Styles.title}>
                    {/* پخش و توزیع انواع قهوه */}
                    <Typewriter
                        options={{
                            strings: ['انواع قهوه', 'انواع ابزار و تجهیزات', 'ارسال در سریع ترین زمان'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </h1>
                <div className={Styles.background}></div>
                {/* <p className={Styles.description}>قهوه کره ای دالگونا نوشیدنی ای است که با هم زدن به نسبت مساوی پودر قهوه فوری، شکر و آب داغ تا زمانی
                    که حالت خامه ای پیدا کند و سپس آن را به شیر سرد یا داغ اضافه می کنیم.
                </p>
                <Link className="w-max text-zinc-400" to='/about'>اطلاعات بیشتر درباره ما</Link>
                <Link to='#' className={Styles.submitStore}>
                    <button>ثبت کافی شاپ</button>
                    <FreeBreakfastOutlinedIcon />
                </Link> */}
            </div>
            {/* <div className={Styles.offBox}>
                <h1 className={Styles.persentIcon}>%</h1>
                <h1>تخفیف های ویژه</h1>
                <svg className="w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.761 225.888">
                    <g transform="translate(0)"><g transform="translate(61.267 0)">
                        <path d="M-490.736,619.267a16.588,16.588,0,0,1-8.316-2.235,16.664,16.664,0,0,1-6.1-22.763l50.775-87.946-50.775-87.945a16.664,16.664,0,0,1,6.1-22.763,16.664,16.664,0,0,1,22.763,6.1l60.4,104.609-60.4,104.609A16.658,16.658,0,0,1-490.736,619.267Z" transform="translate(507.387 -393.378)" fill="#ed1c24" />
                    </g>
                    <g transform="translate(0 0)">
                        <path d="M-343.672,619.267a16.586,16.586,0,0,1-8.316-2.235,16.664,16.664,0,0,1-6.1-22.763l50.775-87.946-50.775-87.945a16.664,16.664,0,0,1,6.1-22.763,16.664,16.664,0,0,1,22.763,6.1l60.4,104.609-60.4,104.609A16.659,16.659,0,0,1-343.672,619.267Z" transform="translate(360.323 -393.378)" fill="#ed1c24" />
                    </g>
                    </g>
                </svg>
            </div> */}
        </header>
    )
}