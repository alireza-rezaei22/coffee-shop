import React from 'react'
import Styles from './noteFound.module.css'
import Navbar from '../../../components/navbar/navbar'
import Footer from '../../../components/footer/footer'
import SearchOffIcon from '@mui/icons-material/SearchOff';

export default function notFound() {
    return (
        <div className={Styles.noteFoundPage}>
            <Navbar />
            <div className={Styles.msgBox}>
                <SearchOffIcon/>
                صفحه پیدا نشد :(
            </div>
            <Footer />
        </div>
    )
}
