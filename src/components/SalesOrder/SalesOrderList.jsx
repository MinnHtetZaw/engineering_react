import React, { useEffect, useState } from 'react'
import Nav from '../Sidebar/Nav'
import { api } from '../../api/apiResource'
import { Link } from 'react-router-dom';

const SalesOrderList = () => {

    const [orders,setOrders] = useState([])

    useEffect(()=>{
        const getOrders= async()=>{
            const res = await api.get('sales_order')
            setOrders(res.data.data)
        }

        getOrders()
    },[])
  return (
    <>
    <Nav/>

        <div className="card shadow p-3 mb-5 bg-white rounded mx-3 my-3">
         
          <div className="card-body">
           
            <h5 className="card-title">Sales Order</h5>
            <Link to="/add_sales_order">    
            <button className='btn btn-primary float-end mb-3'>Add Sale Order</button>
            </Link>
            <table className="table table-striped">
                <thead className="bg-soft text-light">
                    <tr className='text-center'>
                        <th>#</th>
                        <th>Sale Order No</th>
                        <th>Project Name</th>
                        <th>Phase Name</th>
                        <th>Delivery Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {orders.length === 0 &&      
                    <tr>
                        <td colSpan="9" className='text-center text-danger'>There is No Orders Yet</td>
                    </tr>
                    }
                    {
                        orders.map((order,index)=>
                        (
                        <tr key={index}>
                            <td>{++index}</td>
                            <td>{order.sale_order_no}</td>
                            <td>{order.project}</td>
                            <td>{order.phase}</td>
                            <td>{order.delivery_date}</td>
                            <td></td>
                        </tr>
                        ))
                    }
                   
                </tbody>
            </table>
          </div>    
        </div>

    </>

  )
}

export default SalesOrderList