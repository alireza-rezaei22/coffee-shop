import React, { useContext, useEffect } from 'react'
import Styles from './panel.module.css'
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer/footer'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { AuthContext } from '../../Contexts/AuthContext'

export default function Panel() {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (authContext?.isLoggedIn) {
            navigate('profile')
        } else {
            navigate('/login')
        }
    }, [authContext.isLoggedIn])
    const logout = () => {
        navigate('/')
        authContext.logout()
    }

    return (
        <>
            <Navbar />
            <div className={Styles.panelBox}>
                <div className={Styles.staticSec}>
                    <div className={Styles.info}>
                        <span className={Styles.avatar}>
                            <PersonOutlineOutlinedIcon fontSize='large' />
                        </span>
                        <h3>{authContext.userInfo?.username}</h3>
                    </div>
                    <ul className={Styles.pages}>
                        <NavLink to='profile'>پروفایل</NavLink>
                        <NavLink to='basket'>سبد خرید</NavLink>
                        <NavLink to='coments'>کامنت ها</NavLink>
                        <NavLink onClick={logout}>
                            خروج
                        </NavLink>
                    </ul>
                </div>
                <div className={Styles.content}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    )
}
