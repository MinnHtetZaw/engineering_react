import React, { Fragment, useEffect, useState } from 'react'
import { api } from '../../../api/apiResource'
import Nav from '../../Sidebar/Nav'
import { Badge, Button, Card, Table } from 'react-bootstrap'

const DOList = () => {

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
              <th>Update / Required Item</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
           { 
           doList.map((list,index)=>(
              <tr className='text-center' key={list.id}>
                  <td>{++index}</td>
                  <td>{list.do_no}</td>
                  <td>-</td>
                  <td>{list.project}</td>
                  <td>{list.project_phase}</td>
                  <td>{list.delivery_date ? list.delivery_date : <span className='fw-bold text-danger'>not yet</span>  }</td>
                  <td>{list.location ? list.location :  <span className='fw-bold text-danger'>not yet</span> }</td>
                  <td>
                  <Button variant='outline-warning' size='sm'>Add Info
                  </Button>
                  </td>
                  <td>{list.status}</td>
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

export default DOList