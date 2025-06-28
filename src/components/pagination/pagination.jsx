import Product from "../product/product";
import styles from './pagination.module.css'

export default function Pagination() {
    return (
        <div className={styles.paginationBox}>
            <div className="grid grid-cols-4 gap-5 p-10">
                {/* <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product /> */}
            </div>
            <div className={styles.pagesNumbers}>
                <h4>1</h4>
                <h4>2</h4>
                <h4>3</h4>
            </div>
        </div>
    )
}