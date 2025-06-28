import React, { useEffect, useState, useContext } from "react"
import Styles from './navbar.module.css'
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
            .then(res=> res.json())
            .then(data=> setBasketProducts(data))
    }, [authContext.userInfo]);

    const logout = () => {
        navigate('/')
        authContext.logout()
    }

    return (
        <>
            <div className={Styles.navbar}>
                <span
                    className={Styles.menuIcon}
                >

                    <MenuIcon
                        onClick={() => setIsDrawerShow(true)}
                    />
                    <Link to={'/'} className={Styles.homeIcon}>
                        <HomeIcon />
                    </Link>
                </span>

                <Drawer
                    open={isDrawerShow}
                    onClose={() => setIsDrawerShow(false)}
                    anchor="right"
                    className={Styles.drawer}
                >
                    <CloseIcon onClick={() => setIsDrawerShow(false)} />
                    <List className={Styles.links}>
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
                            <NavLink>
                                <NavLink to={'/login'}>ورود / ثبت نام</NavLink>
                            </NavLink>
                        }
                    </List>
                </Drawer>

                <div className={Styles.rightSec}>
                    {authContext.isLoggedIn ?
                        <Link to={'/panel'} className="text-3xl pb-2">
                            <PersonOutlineOutlinedIcon />
                        </Link>
                        :
                        <Link to={'/login'} className="text-3xl pb-2">
                            <LoginIcon />
                        </Link>
                    }
                    <div className={Styles.tabs}>
                        <NavLink to='/'>صفحه اصلی</NavLink>
                        <NavLink to='/products'>محصولات</NavLink>
                        <NavLink to='/articles'>مقالات</NavLink>
                    </div>
                </div>
                <div className={Styles.leftSec}>
                    <span className={Styles.searchBox}>
                        <SearchBox />
                    </span>
                    <Badge
                        badgeContent={basketProducts.length}
                        color="primary"
                        fontSize="medium"
                        className={Styles.basketIcon}
                        onClick={() => setIsBasketShow(true)}
                    >
                        <LocalGroceryStoreOutlinedIcon fontSize="medium" />
                    </Badge>
                </div>
                <BasketDrawer isBasketShow={isBasketShow} setIsBasketShow={setIsBasketShow}/>
            </div>
        </>
    )
}