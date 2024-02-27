import React from 'react'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import Header from '../../Components/layout/header/Header'
import Footer from '../../Components/layout/footer/Footer'
import HomeMain from '../../Pages/HomeMain'
import ProductListingMain from '../../Pages/ProductListingMain'
import Cart from '../../Components/pages/ProductCart/Cart'
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
                element:<Cart/>
            }
    
        ]
    }
])