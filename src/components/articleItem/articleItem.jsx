import Styles from './article.module.css'

export default function ArticleTtem() {

    return (
        <div className={Styles.articleBox}>
            <img
                src="src/assets/images/article.jpg"
                alt=""
                className={Styles.articleImg}
            />
            <div className={Styles.articleInfo}>
                <h1 className={Styles.title}>ده مدل قهوه‌ی لاواتزا که باید امتحان کنید</h1>
                <p className={Styles.description}>اگر از نوشیدن قهوه لذت می‌برید حتمااین کمپانی ایتالیایی
                    متخصص در زمینه‌ی ی قهوه یکی از مشهورترین کمپانی‌ و
                </p>
            </div>
        </div>
    )
}