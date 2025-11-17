import React from 'react'
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export default function NotFound() {
    return (
        <div className="h-full flex flex-col justify-between">
            <Navbar />
            <div className="flex-1 w-48 self-center flex justify-center items-center gap-1">
                <SearchOffIcon />
                صفحه پیدا نشد :(
            </div>
            <Footer />
        </div>
    )
}