import React, { useEffect, useState } from 'react'
import styles from './SearcchBox.module.css'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

export default function SearchBox() {
    const [userSearch, setUserSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [filteredResult, setfilteredResult] = useState([])
    const [isSearchBoxShow, setIsSearchBoxShow] = useState(false)

    useEffect(() => {
        setfilteredResult(Array.from(new Set(searchResult.map(item => item.id)))
            .map(id => searchResult.find(item => item.id === id)))
    }, [searchResult])
    const search = () => {
        if (userSearch != '') {
            setSearchResult([])
            setfilteredResult([])
            fetch(`http://localhost:3000/products?title_like=${userSearch}`)
                .then(res => {
                    if (!res.ok) {
                        return res.text().then(text => {
                            throw new Error(text)
                        })
                    } else {
                        return res.json()
                    }
                })
                .then(data => setSearchResult(pre => [...pre, ...data]))
            fetch(`http://localhost:3000/products?describe_like=${userSearch}`)
                .then(res => {
                    if (!res.ok) {
                        return res.text().then(text => {
                            throw new Error(text)
                        })
                    } else {
                        return res.json()
                    }
                })
                .then(data => {
                    setSearchResult(pre => [...pre, ...data])
                    setIsSearchBoxShow(true)
                })
        }
    }
    const closeSearchBox=()=>{
        setUserSearch('')
        setIsSearchBoxShow(false)
    }
    return (
        <>
            <div className={styles.searchBox}>
                <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="جستجوی محصولات"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                />
                <SearchIcon className="text-3xl" onClick={search} sx={{ cursor: 'pointer' }} />
            </div>
            {isSearchBoxShow &&
                <>
                    <div className={styles.background} onClick={closeSearchBox}></div>
                    <div className={styles.resultBox}>
                        {filteredResult.length ?
                            filteredResult.map(product => {
                                return <Link to={`/productDetail/${product.id}`} key={product.id} className={styles.serchedProduct}>
                                    <img src="/src/assets/images/product.jpg" alt="" />
                                    <label className="flex-1 mx-2">{product.title}</label>
                                </Link>
                            }) :
                            <label>هیچ محصولی یافت نشد :(</label>}
                    </div>
                </>
            }
        </>
    )
}
