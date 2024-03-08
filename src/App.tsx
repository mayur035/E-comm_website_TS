import './App.css';
import React from 'react';
import { Routers } from './routes/unauth/Router';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <RouterProvider router={Routers} />
    </React.Fragment>
  );
}

export default App;
