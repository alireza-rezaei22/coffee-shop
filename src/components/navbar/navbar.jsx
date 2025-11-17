import React, { useEffect, useState, useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import LoginIcon from '@mui/icons-material/Login';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Badge } from '@mui/material'
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import { AuthContext } from "../../Contexts/AuthContext";
import SearchBox from "../SearchBox/SearchBox";
import { Drawer, List, ListItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import BasketDrawer from "../basketDrawer/basketDrawer";

export default function Navbar() {
    const authContext = useContext(AuthContext)
    const [isDrawerShow, setIsDrawerShow] = useState(false)
    const [isBasketShow, setIsBasketShow] = useState(false)
    const [basketProducts, setBasketProducts] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3000/baskets?userId=${authContext.userInfo?.id}`)
            .then(res => res.json())
            .then(data => setBasketProducts(data))
    }, [authContext.userInfo]);

    const logout = () => {
        navigate('/')
        authContext.logout()
    }

    return (
        <>
            <div className="w-full sticky top-0 z-40 backdrop-blur flex justify-between items-center py-3 px-5 text-zinc-500">
                <span className="space-x-2 space-x-reverse block md:hidden">
                    <MenuIcon
                        onClick={() => setIsDrawerShow(true)}
                    />
                    <Link to={'/'}>
                        <HomeIcon />
                    </Link>
                </span>

                <Drawer
                    open={isDrawerShow}
                    onClose={() => setIsDrawerShow(false)}
                    anchor="right"
                    className="block md:hidden"
                >
                    <CloseIcon onClick={() => setIsDrawerShow(false)} className="self-end size-8 m-2" />
                    <List className="w-64">
                        <ListItem>
                            <NavLink to='/'>صفحه اصلی</NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to='/products'>محصولات</NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to='/articles'>مقالات</NavLink>
                        </ListItem>
                        {authContext.isLoggedIn ?
                            <div>
                                <ListItem>
                                    <NavLink to={'/panel'}>پنل</NavLink>
                                </ListItem>
                                <ListItem>
                                    <NavLink onClick={logout}>خروج</NavLink>
                                </ListItem>
                            </div>
                            :
                            <NavLink to={'/login'}>ورود / ثبت نام</NavLink>
                        }
                    </List>
                </Drawer>

                <div className="hidden md:flex md:justify-evenly md:items-center md:divide-x-2 md:divide-x-reverse">
                    {authContext.isLoggedIn ?
                        <Link to={'/panel'} className="text-3xl pb-2">
                            <PersonOutlineOutlinedIcon />
                        </Link>
                        :
                        <Link to={'/login'} className="text-3xl pb-2">
                            <LoginIcon />
                        </Link>
                    }
                    <div className="px-4 flex gap-3">
                        <NavLink to='/'>صفحه اصلی</NavLink>
                        <NavLink to='/products'>محصولات</NavLink>
                        <NavLink to='/articles'>مقالات</NavLink>
                    </div>
                </div>
                <div className="flex justify-end items-center space-x-4 space-x-reverse w-1/2 md:space-x-10 md:space-x-reverse md:w-auto">
                    <span>
                        <SearchBox />
                    </span>
                    <Badge
                        badgeContent={basketProducts.length}
                        color="primary"
                        fontSize="medium"
                        className="cursor-pointer"
                        onClick={() => setIsBasketShow(true)}
                    >
                        <LocalGroceryStoreOutlinedIcon fontSize="medium" />
                    </Badge>
                </div>
                <BasketDrawer isBasketShow={isBasketShow} setIsBasketShow={setIsBasketShow} />
            </div>
        </>
    )
}