import React, { Fragment, useEffect, useState } from 'react'
import { api } from '../../../utilities/api/apiResource'
import Nav from '../../Sidebar/Nav'
import { Badge, Button, Card, Table } from 'react-bootstrap'
import swal from 'sweetalert'

const ApproveDeliveryOrderList = () => {

  const [doList,setDOList]=useState([])
  

  const getDOList=async()=>{
    try{

      const res = await api.get('site_delivery_order')
        setDOList(res.data.data)
    }catch(err)
    {
      console.error(err);
    }
  }

  useEffect(()=>{

    getDOList()

  },[])

  const handleApprove=async(id)=>{
    
    const res = await api.post('site_delivery_order/approve',{ id : id})

    swal('Approved','Successfully Approve DO!','success')
     setDOList(res.data.data)
  }
  
  return (
   <Fragment>

    <Nav/>
    <div className='row m-3'>
        <h5 className='fst-italic'> Deilvery Order List</h5>
    </div>
    <div className='container'>
    <Card>
      <Card.Body>
        <Table striped>
          <thead className='text-white' style={{backgroundColor:"gray"}}>
            <tr className='text-center'>
              <th>#</th>
              <th>D0_No</th>
              <th>Customer Name</th>
              <th>Project Name</th>
              <th>Phase Name</th>
              <th>Delivery Date</th>
              <th>location</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
           { 
           doList.map((list,index)=>(
              <tr className='text-center' key={list.id}>
                  <td>{++index}</td>
                  <td>{list.do_no}</td>
                  <td>{list.customer_name}</td>
                  <td>{list.project}</td>
                  <td>{list.project_phase}</td>
                  <td>{list.delivery_date ? list.delivery_date : <span className='fw-bold text-danger'>not yet</span>  }</td>
                  <td>{list.location ? list.location :  <span className='fw-bold text-danger'>not yet</span> }</td>
                  <td>
                  <Button variant='primary' size='sm' className='me-1'>Detail</Button>
                  {list.status == 0 &&
             
                    <Button variant='danger' size='sm' onClick={()=>handleApprove(list.id)}>Approve</Button>
              
                  }
                  {list.status == 1 && <span> <Badge bg='success'>Done</Badge></span>}
    
                  </td>
              </tr>
           ))
         }
          </tbody>
        </Table>
      </Card.Body>
    </Card>
    </div>
    </Fragment>
  )
}

export default ApproveDeliveryOrderList