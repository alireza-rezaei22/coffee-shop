import React, { useEffect, useState, useContext } from "react"
import Filter from "../../components/filter/filter"
import Product from "../../components/product/product"
import { ListItem, Pagination } from "@mui/material"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { UseFilter } from "../../hooks/UseFilter"
import { ProductsContext } from "../../Contexts/ProductsContext"
import Navbar from "../../components/navbar/navbar"
import Footer from "../../components/footer/footer"
import { Drawer, List } from '@mui/material/'

export default function Products() {
    const [isDrawerShow, setIsDrawerShow] = useState(false)
    const [isBasketShow, setIsBasketShow] = useState(false)
    const [filterState, changeFilter] = UseFilter({
        allProducts: useContext(ProductsContext)
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [products, setProducts] = useState([])
    const [pagedItems, setPagedItems] = useState({
        first: 0,
        last: 8 * currentPage
    })

    useEffect(() => {
        setPagedItems(prev => ({
            first: (8 * currentPage) - 8,
            last: 8 * currentPage
        }))
    }, [currentPage])
    useEffect(() => {
        setCurrentPage(1)
        setPagedItems({
            first: 0,
            last: 8
        })
    }, [filterState])
    useEffect(() => {
        setProducts(filterState.slice(pagedItems.first, pagedItems.last))
    }, [pagedItems])

    const handleProductsItems = (event, value) => {
        setCurrentPage(value)
    }
    return (
        <>
            <Navbar />
            <div className="container relative w-full flex justify-center">
                <Filter changeFilter={changeFilter} isDrawerShow={isDrawerShow} setIsDrawerShow={setIsDrawerShow} />
                <div className="w-4/5 flex flex-col items-center my-5">
                    <button className="self-start bg-gray-50 px-2 rounded-md border-2 border-gray-400 text-gray-700 md:hidden"
                        onClick={() => setIsDrawerShow(true)}
                    >
                        <FilterAltIcon />
                        فیلتر
                    </button>
                    <div className="grid grid-cols-2 gap-10 py-5 md:grid-cols-4 md:p-5">
                        {products.map(product => {
                            return <Product key={product.id} {...product} />
                        })}
                    </div>
                    <Pagination count={Math.ceil(filterState.length / 9)} page={currentPage} dir="ltr" onChange={handleProductsItems} />
                </div>
            </div>
            <div className="bg-gradient-to-l from-indigo-900 to-indigo-950 text-base font-medium w-full m-auto p-5 flex justify-center items-center text-white rounded-full md:text-5xl">
                <h1>از آخر هفته های کندویی جا نمونی</h1>
                <img src="/src/assets/images/weekend-img.png" alt="" className="w-16" />
            </div>
            <Footer />
        </>
    )
}