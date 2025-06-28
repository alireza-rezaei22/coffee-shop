import React, { useEffect, useState, useContext } from "react"
import styles from './products.module.css'
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
            <div className={styles.productsBox}>
                <Filter changeFilter={changeFilter} isDrawerShow={isDrawerShow} setIsDrawerShow={setIsDrawerShow} />
                <div
                    className={styles.productsList}>
                    <button className={styles.filterBtn}
                        onClick={() => setIsDrawerShow(true)}
                    >
                        <FilterAltIcon />
                        فیلتر
                    </button>
                    <div className={styles.products}>
                        {products.map(product => {
                            return <Product key={product.id} {...product} />
                        })}
                    </div>
                    <Pagination count={Math.ceil(filterState.length / 9)} page={currentPage} dir="ltr" onChange={handleProductsItems} />
                </div>
            </div>
            <div className={styles.weekend}>
                <h1>از آخر هفته های کندویی جا نمونی</h1>
                <img src="/src/assets/images/weekend-img.png" alt="" />
            </div>
            <Drawer
                open={isBasketShow}
                onClose={()=>setIsBasketShow(false)}
            >
                <h2 className={styles.basketTitle}>سبد خرید</h2>
                <List className={styles.basketList}>
                    <ListItem className={styles.basketItem}>
                        <img src="/src/assets/images/product.jpg" alt="" />
                        <div className={styles.itemInfo}>
                            <h4>نام محصول</h4>
                            <div className={styles.actions}>
                                <button className={styles.showItemBtn}>مشاهده</button>
                                <button className={styles.deleteItemBtn}>حذف</button>
                            </div>
                        </div>
                    </ListItem>
                    <ListItem className={styles.basketItem}>
                        <img src="/src/assets/images/product.jpg" alt="" />
                        <div className={styles.itemInfo}>
                            <h4>item name</h4>
                            <div className={styles.actions}>
                                <button className={styles.showItemBtn}>مشاهده</button>
                                <button className={styles.deleteItemBtn}>حذف</button>
                            </div>
                        </div>
                    </ListItem>
                </List>
                <button className={styles.payment}>پرداخت</button>
            </Drawer>
            <Footer />
        </>
    )
}