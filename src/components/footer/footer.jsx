import { Link } from "react-router-dom";
import styles from './footer.module.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
    return (
        <>
            <footer>
                <div className={styles.footerMain}>
                    <div className={`w-2/4 ${styles.footerSec}`}>
                        <h1 className={styles.footerSecTitle}>آخرین مطالب</h1>
                        <div className={styles.footerSecItems}>
                            <p><Link to='#'>قهوه کره ای دالگونا نوشیدنی ای است که با هم زدن به نسبت مساوی پودر
                                قهوه فوری، شکر و آب داغ تا زمانی که حالت خامه ای پیدا کند.
                            </Link></p>
                            <p><Link to='#'>قهوه کره ای دالگونا نوشیدنی ای است که با هم زدن به نسبت مساوی پودر
                                قهوه فوری، شکر و آب داغ تا زمانی که حالت خامه ای پیدا کند.
                            </Link></p>
                        </div>
                    </div>
                    <div className={`w-1/4 ${styles.footeSec}`}>
                        <h1 className={styles.footerSecTitle}>دسترسی سریع</h1>
                        <ul className={styles.footerSecItems}>
                            <li><Link to='#'>انواع قهوه</Link></li>
                            <li><Link to='#'>همه چیز درباره قهوه</Link></li>
                            <li><Link to='#'>تاریخچه قهوه</Link></li>
                            <li><Link to='/products'>دسته بندی محصولات</Link></li>
                        </ul>
                    </div>
                    <div className={`w-1/4 ${styles.footeSec}`}>
                        <h1 className={styles.footerSecTitle}>درباره ما</h1>
                        <ul className={styles.footerSecItems}>
                            <li><Link to='/about'>درباره ما</Link></li>
                            <li><Link to='#'>حریم خصوصی</Link></li>
                            <li><Link to='#'>خط مشی و اصول</Link></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.contact}>
                    <Link to='https://github.com/alireza-rezaei22'>
                        <label>Github</label>
                        <GitHubIcon />
                    </Link>
                    <Link to='https://ir.linkedin.com/in/alireza-rezaei22'>
                        <label>Linkedin</label>
                        <LinkedInIcon />
                    </Link>
                </div>
            </footer>
        </>
    )
}