import { useEffect, useState, useCallback, useContext } from 'react'
import './App.css'
import { useRoutes } from 'react-router-dom'
import routes from './routes'
// import Nav from './components/nav/nav'
// import Footer from './components/footer/footer.jsx'
import { ProductsContext } from './Contexts/ProductsContext'
import { AuthContext } from './Contexts/AuthContext'
import AlertContext from './Contexts/AlertContext'
import AlertPortal from './components/AlertPortal/AlertPortal'

function App() {
  let router = useRoutes(routes)
  const [serverProducts, setServerProducts] = useState([])
  const [getUser, setGetUser] = useState()
  const [token, setToken] = useState()
  const [userInfo, setUserInfo] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [alert, setAlert] = useState({
    msg: null,
    isAlertShow: false,
    isSuccess: false
  })

  useEffect(() => {
    const localToken = JSON.parse(localStorage.getItem('token'))
    if (localToken) {
      setToken(localToken)
      function parseJwt(localToken) {
        const base64Url = localToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        return JSON.parse(jsonPayload);
      }
      const decodedToken = parseJwt(localToken);
      const userId = decodedToken.sub;

      fetch(`http://localhost:3000/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localToken}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setUserInfo(data)
          setIsLoggedIn(true)
        })
    }

    fetch('http://localhost:3000/products')
      .then(res => {
        if (!res.ok) {
          throw new Error
        } else {
          return res.json()
        }
      })
      .then(data => {
        setServerProducts(data)
      })
  }, [])
  useEffect(() => {
    setTimeout(() => {
      if (alert.isAlertShow) {
        setAlert(prev => ({ ...prev, isAlertShow: false }))
      }
    }, 3000);
  }, [alert])

  const showAlertToast = useCallback((msg, isAlertShow, isSuccess) => {
    setAlert(prev => ({
      ...prev,
      msg,
      isAlertShow,
      isSuccess
    }))
  }, [])

  const login = (userData, token) => {
    localStorage.setItem('token', JSON.stringify(token))
    setToken(token)
    setUserInfo(userData)
    setIsLoggedIn(true)
  }
  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUserInfo(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
        userInfo,
        isLoggedIn,
      }}
    >
      <ProductsContext.Provider value={serverProducts}>
        <div className='flex flex-col justify-between h-screen'>
          <AlertContext.Provider value={{ alert, showAlertToast }}>
            {router}
            {alert.isAlertShow && <AlertPortal />}
          </AlertContext.Provider>
        </div>
      </ProductsContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
