import React, { useContext, useEffect } from 'react'
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
            <div className="flex-1 m-2">
                <div className="flex flex-col items-center p-5">
                    <div className="flex flex-col items-center gap-2">
                        <span className="bg-gray-300 p-4 w-fit rounded-full">
                            <PersonOutlineOutlinedIcon fontSize='large' />
                        </span>
                        <h3>{authContext.userInfo?.username}</h3>
                    </div>
                    <ul className="mt-3 flex gap-3">
                        <NavLink to='profile'>پروفایل</NavLink>
                        <NavLink to='basket'>سبد خرید</NavLink>
                        <NavLink to='comments'>کامنت ها</NavLink>
                        <button onClick={logout}>
                            خروج
                        </button>
                    </ul>
                </div>
                <div className="flex justify-center">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    )
}