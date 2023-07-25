import React from 'react'
import { useLocation } from 'react-router-dom'
import Nav from './../Sidebar/Nav';

const PurchaseRequest = () => {

    const location = useLocation()
   
    const data = location.state.data
    
  return (
    <>
    <Nav/>
    <div>PurchaseRequest</div>


    </>
  )
}

export default PurchaseRequest