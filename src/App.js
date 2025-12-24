import React from 'react'
import Navbar from './component/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './component/Footer'

export default function App() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}