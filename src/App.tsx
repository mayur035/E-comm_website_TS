import './App.css';
import React from 'react';
import HomeMain from './Pages/HomeMain';
import ProductListingMain from './Pages/ProductListingMain';
import ProductDetailsMain from './Pages/ProductDetailsMain';
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
