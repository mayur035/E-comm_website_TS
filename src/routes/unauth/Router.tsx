import React from 'react'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import Header from '../../Components/layout/header/Header'
import Footer from '../../Components/layout/footer/Footer'
import HomeMain from '../../Components/pages/Home/HomeMain'
import ProductListingMain from '../../Components/pages/ProductListing/ProductListingMain'
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
                element:<ProductListingMain/>,
                children:[
                    {
                        
                    }
                ]
            },
    
        ]
    }
])