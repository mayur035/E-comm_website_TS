import React from 'react'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import Header from '../../Components/layout/header/Header'
import Footer from '../../Components/layout/footer/Footer'
import HomeMain from '../../Pages/HomeMain'
import ProductListingMain from '../../Pages/ProductListingMain'
import CartMain from '../../Pages/CartMain'
import AboutUsMain from '../../Pages/AboutUsMain'
import ContactUsMain from '../../Pages/ContactUsMain'
const Router = () => {
    return (
        <React.Fragment>
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
        children:[
            {
                path:'',
                element:<HomeMain/>
            },
            {
                path:'/productListing',
                element:<ProductListingMain/>
            },
            {
                path:'/cart',
                element:<CartMain/>
            },{
                path:'/aboutUs',
                element:<AboutUsMain/>
            },{
                path:'/contactUs',
                element:<ContactUsMain/>
            }
    
        ]
    }
])