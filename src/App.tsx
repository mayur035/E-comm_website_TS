import './App.css';
import React from 'react';
import { Routers } from './routes/unauth/Router';
import { RouterProvider } from 'react-router-dom';


function App() {
  return (
    <React.Fragment>
      <RouterProvider router={Routers} />
    </React.Fragment>
  );
}

export default App;
