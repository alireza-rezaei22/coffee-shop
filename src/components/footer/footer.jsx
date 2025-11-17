import { Link } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
    return (
        <>
            <footer className="container flex flex-col items-center relative mt-5 bottom-0 after:absolute after:w-[100%] after:h-[1px] after:bg-zinc-400 after:rotate-[0.5deg] before:absolute before:w-[100%] before:h-[1px] before:bg-zinc-400 before:-rotate-[0.5deg]">
                <div className="w-full mt-10 flex divide-x-2 divide-x-reverse gap-5">
                    <div className="w-2/4 px-5">
                        <h1 className="text-zinc-400 font-bold">آخرین مطالب</h1>
                        <div className="text-zinc-500 text-sm my-8 space-y-2">
                            <p><Link to='#'>قهوه کره ای دالگونا نوشیدنی ای است که با هم زدن به نسبت مساوی پودر قهوه فوری، شکر و آب داغ تا زمانی که حالت خامه ای پیدا کند.</Link></p>
                            <p><Link to='#'>قهوه کره ای دالگونا نوشیدنی ای است که با هم زدن به نسبت مساوی پودر قهوه فوری، شکر و آب داغ تا زمانی که حالت خامه ای پیدا کند.</Link></p>
                        </div>
                    </div>
                    <div className="w-1/4 px-5">
                        <h1 className="text-zinc-400 font-bold">دسترسی سریع</h1>
                        <ul className="text-zinc-500 text-sm my-8 space-y-2">
                            <li><Link to='#'>انواع قهوه</Link></li>
                            <li><Link to='#'>همه چیز درباره قهوه</Link></li>
                            <li><Link to='#'>تاریخچه قهوه</Link></li>
                            <li><Link to='/products'>دسته بندی محصولات</Link></li>
                        </ul>
                    </div>
                    <div className="w-1/4 px-5">
                        <h1 className="text-zinc-400 font-bold">درباره ما</h1>
                        <ul className="text-zinc-500 text-sm my-8 space-y-2">
                            <li><Link to='/about'>درباره ما</Link></li>
                            <li><Link to='#'>حریم خصوصی</Link></li>
                            <li><Link to='#'>خط مشی و اصول</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="top-0 bg-gradient-to-bl from-indigo-700 to-indigo-950 text-white w-96 flex justify-around p-6 rounded-t-3xl">
                    <Link to='https://github.com/alireza-rezaei22' className="space-x-1 space-x-reverse flex items-center">
                        <label>Github</label>
                        <GitHubIcon />
                    </Link>
                    <Link to='https://ir.linkedin.com/in/alireza-rezaei22' className="space-x-1 space-x-reverse flex items-center">
                        <label>Linkedin</label>
                        <LinkedInIcon />
                    </Link>
                </div>
            </footer>
        </>
    )
}