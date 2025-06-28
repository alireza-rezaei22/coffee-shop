import React from "react"
import Header from "../../components/header/header"
import OffProducts from "../../components/offProducts/offProducts"
import Present from "../../components/present/present"
import LastArticles from "../../components/lastArticles/lastArticles"
import Navbar from "../../components/navbar/navbar"
import Footer from "../../components/footer/footer"
import GoUp from "../../components/GoUp/GoUp"
// import GoUp from "../../components/GoUp/GoUp"

export default function Home() {
    return (
        <>
            <Navbar/>
            <Header/>
            <OffProducts/>
            <Present/>
            <LastArticles/>
            <Footer />
            <GoUp/>
        </>
    )
}