import './App.css';
import React from 'react';
import HomeMain from './Components/pages/Home/HomeMain';
import ProductListingMain from './Components/pages/ProductListing/ProductListingMain';
import ProductDetailsMain from './Components/pages/ProductDetails/ProductDetailsMain';
import Header from './Components/layout/header/Header';
import { RouterProvider } from 'react-router';
import { Routers } from './routes/unauth/Router';


function App() {
  return (
    <React.Fragment>
<RouterProvider router={Routers}/>
    </React.Fragment>
  );
}

export default App;
