import React from 'react'
import styles from './present.module.css'
export default function Present() {

    return (
        <div className={styles.presentBackground}>
            <div className={styles.presentBox}>
                <div className={styles.presentRow}>
                    <div className={styles.rowImgBox}>
                        <img className={styles.rowImg} src="/src/assets/images/coffee.png" alt="" />
                        <span className={`${styles.rowImgShape} start-1`}></span>
                        <span className={styles.rowImgShape}></span>
                    </div>
                    <div className={styles.rowTextBox}>
                        <h1 className={styles.title}>قهوه ها</h1>
                        <p className={styles.text}>قهوه کره ای دالگونا نوشیدنی ای است که با هم زدن به نسبت مساوی پودر قهوه فوری، شکر و آب داغ تا زمانی که حالت خامه ای پیدا کند و سپس آن را به شیر سرد یا داغ اضافه می کنیم.</p>
                    </div>
                </div>
                <div className={`${styles.presentRow} ${styles.presentReverse}`}>
                    <div className={styles.rowImgBox}>
                        <img className={styles.rowImg} src="/src/assets/images/Espresso.png" alt="" />
                        <span className={`${styles.rowImgShape} start-1`}></span>
                        <span className={styles.rowImgShape}></span>
                    </div>
                    <div className={styles.rowTextBox}>
                        <h1 className={styles.title}>اسپرسو</h1>
                        <p className={styles.text}>قهوه کره ای دالگونا نوشیدنی ای است که با هم زدن به نسبت مساوی پودر قهوه فوری، شکر و آب داغ تا زمانی که حالت خامه ای پیدا کند و سپس آن را به شیر سرد یا داغ اضافه می کنیم.</p>
                    </div>
                </div>
                <div className={styles.presentRow}>
                    <div className={styles.rowImgBox}>
                        <img className={styles.rowImg} src="/src/assets/images/shake.png" alt="" />
                        <span className={`${styles.rowImgShape} start-1`}></span>
                        <span className={styles.rowImgShape}></span>
                    </div>
                    <div className={styles.rowTextBox}>
                        <h1 className={styles.title}>شیک</h1>
                        <p className={styles.text}>قهوه کره ای دالگونا نوشیدنی ای است که با هم زدن به نسبت مساوی پودر قهوه فوری، شکر و آب داغ تا زمانی که حالت خامه ای پیدا کند و سپس آن را به شیر سرد یا داغ اضافه می کنیم.</p>
                    </div>
                </div>
                <div className={`${styles.presentRow} ${styles.presentReverse}`}>
                    <div className={styles.rowImgBox}>
                        <img className={styles.rowImg} src="/src/assets/images/Equipment.png" alt="" />
                        <span className={`${styles.rowImgShape} start-1`}></span>
                        <span className={styles.rowImgShape}></span>
                    </div>
                    <div className={styles.rowTextBox}>
                        <h1 className={styles.title}>تجهیزات</h1>
                        <p className={styles.text}>قهوه کره ای دالگونا نوشیدنی ای است که با هم زدن به نسبت مساوی پودر قهوه فوری، شکر و آب داغ تا زمانی که حالت خامه ای پیدا کند و سپس آن را به شیر سرد یا داغ اضافه می کنیم.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}