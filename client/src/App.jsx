import React from 'react'
import {Link, Outlet} from 'react-router-dom'
import MainRoutes from './routes/MainRoutes'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div className='overflow-x-hidden'>
      <ToastContainer />
      <Header />
      <main>
        <MainRoutes />
      </main>
      
    </div>
  )
}

export default App
