import React from 'react'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import Header from '../Components/layout/header/Header'
import Footer from '../Components/layout/footer/Footer'
import HomeMain from '../Pages/HomeMain'
import ProductListingMain from '../Pages/ProductListingMain'
import CartMain from '../Pages/CartMain'
import AboutUsMain from '../Pages/AboutUsMain'
import ContactUsMain from '../Pages/ContactUsMain'
import ErrorPage from '../Pages/ErrorPage'
import ProductDetailsMain from '../Pages/ProductDetailsMain'
import ScrollToTop from './scrollToTop'
import { checkAuthentication } from '../utils/CheckAuth'
import Login from '../Pages/login-signup/login/login'
import Signup from '../Pages/login-signup/signup/signup'
import Address from '../Components/pages/Address/Address'
import Profile from '../Components/pages/Profile/Profile'
import OrderDetails from '../Pages/Orders/order-details/order-details'
import OrderListing from '../Pages/Orders/order-listing/order-listing'
const Router = () => {
    return (
        <React.Fragment>
            <ScrollToTop />
            <Header/>
            <Outlet/>
            <Footer/>
        </React.Fragment>
    )
}

export default Router
export const Routers = createBrowserRouter([
    {
        path: '/',
        element: <Router />,
        errorElement:<ErrorPage/>,
        children:[
            {
                path:'',
                element:<HomeMain/>
            },{
                path:'/productListing',
                element:<ProductListingMain/>
            },{
                path:'/productDetails',
                element:<ProductDetailsMain/>,
            },{
                path:'/cart',
                element:<CartMain/>,
                loader:checkAuthentication
            },{
                path:'/aboutUs',
                element:<AboutUsMain/>
            },{
                path:'/contactUs',
                element:<ContactUsMain/>
            },{
                path:'/login',
                element:<Login/>
            },{
                path:'/signup',
                element:<Signup/>
            }
            ,{
                path:'/profile',
                element:<Profile/>,
                loader:checkAuthentication
            },{
                path:'/address',
                element:<Address/>,
                loader:checkAuthentication
            },{
                path:'/orderDetails',
                element:<OrderDetails/>,
                loader:checkAuthentication
            },{
                path:'/orderListing',
                element:<OrderListing/>,
                loader:checkAuthentication
            }
        ]
    }
])