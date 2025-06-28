import React from 'react'
import Styles from './SectionHeader.module.css'

export default function SectionHeader({title}) {
    return (
        <div className={Styles.HeaderBox}>
            <span className={Styles.headerLine}></span>
            <div className={Styles.titleBox}>
                <span className={Styles.titlePoint}></span>
                <span>{title}</span>
                <span className={Styles.titlePoint}></span>
            </div>
            <span className={Styles.headerLine}></span>
        </div>
    )
}
