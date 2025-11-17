import React, { useEffect, useState } from 'react'
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
    const closeSearchBox = () => {
        setUserSearch('')
        setIsSearchBoxShow(false)
    }
    return (
        <>
            <div className="bg-zinc-300 flex p-2 w-fit rounded-full">
                <input
                    className="bg-inherit px-3 outline-none text-sm font-bold flex-1"
                    type="text"
                    placeholder="جستجوی محصولات"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                />
                <SearchIcon className="text-3xl" onClick={search} sx={{ cursor: 'pointer' }} />
            </div>
            {isSearchBoxShow &&
                <>
                    <div className="bg-zinc-900 opacity-50 z-40 w-screen h-screen left-0 top-0 fixed" onClick={closeSearchBox}></div>
                    <div className="bg-zinc-300 rounded-md z-50 p-4 absolute top-14 w-60 max-h-80 space-y-3 overflow-y-scroll md:left-5 md:w-1/2">
                        {filteredResult.length ?
                            filteredResult.map(product => {
                                return <div key={product.id} className="w-full bg-zinc-200 rounded-lg overflow-hidden h-16 flex hover:bg-zinc-100">
                                    <span className='flex-1 flex'>
                                        <img src={product.img || "/src/assets/images/product.jpg"} alt="" />
                                        <label className="flex-1 mx-2">{product.title}</label>
                                    </span>
                                    <Link to={`/productDetail/${product.id}`} className='bg-indigo-500 border-zinc-900 border text-white self-end text-md rounded-lg m-2 p-1 flex justify-between'>مشاهده</Link>
                                </div>
                            }) :
                            <label>هیچ محصولی یافت نشد :(</label>}
                    </div>
                </>
            }
        </>
    )
}