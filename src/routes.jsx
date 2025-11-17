import Home from './pages/home/home'
import Products from './pages/products/products'
import Login from './pages/login/login'
// import Articles from './pages/articles/articles'
import Register from './pages/register/register'
import ProductDetail from './pages/productDetail/productDetail'
import Panel from './pages/panel/panel'
import Profile from './pages/panel/profile/profile'
import Basket from './pages/panel/basket/basket'
import Coments from './pages/panel/coments/coments'
import NotFound from './pages/notFound/notFound.jsx'

let routes = [
    {path:'/', element: <Home/>},
    {path:'/products', element: <Products/>},
    {path:'/ProductDetail/:productId', element: <ProductDetail/>},
    {path:'/login', element: <Login/>},
    // {path:'/articles', element: <Articles/>},
    {path:'/register', element: <Register/>},
    {path:'/panel/*', element: <Panel/>, children:[
        {path:'profile', element: <Profile/>},
        {path:'basket', element: <Basket/>},
        {path:'comments', element: <Coments/>},
        // {path:'*', element:<NotFound/>}
    ]},
    {path:'/*', element:<NotFound/>}

]

export default routes