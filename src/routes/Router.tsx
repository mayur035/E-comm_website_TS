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
import SignupMain from '../Pages/SignupForm/SignupMain'
import { checkAuthentication } from '../utils/CheckAuth'
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
                path:'/productDetails/:productID',
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
                path:'/signup',
                element:<SignupMain/>
            }
        ]
    }
])