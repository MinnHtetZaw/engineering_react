import React, { Fragment, useEffect, useState } from 'react'
import { api } from '../../../utilities/api/apiResource'
import Nav from '../../../components/Sidebar/Nav'
import { Badge, Button, Card, Table } from 'react-bootstrap'
import ReceivePersonDialog from '../../../components/RegionalWarehouse/DeliveryOrder/ReceivePersonDialog'
import DoDetailDialog from '../../../components/RegionalWarehouse/DeliveryOrder/DoDetailDialog'

const DOList = () => {

  const [doList,setDOList]=useState([])
  const [show,setShow] = useState(false)
  const [doData,setDO] = useState({})
  const [show1,setShow1] = useState(false)

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

  const handleDialog=(val)=>{
    setDO(val)
    setShow(!show)
  }
  const handleDetailDialog=(val)=>{
    setDO(val)
    setShow1(!show1)
  }
  return (
   <Fragment>

    <Nav/>
    <div className='row m-3'>
        <h5 className='fst-italic'> Deilvery Order List</h5>
    </div>
    <div className='container'>
    <Card className='shadow border-0 m-5'>
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
                  <td>{list.customer_name}</td>
                  <td>{list.project}</td>
                  <td>{list.project_phase}</td>
                  <td>{list.delivery_date ? list.delivery_date : <span className='fw-bold text-danger'>not yet</span>  }</td>
                  <td>{list.location ? list.location :  <span className='fw-bold text-danger'>not yet</span> }</td>
                  <td>
                  <Button variant='warning' size='sm' className='me-1' onClick={()=>handleDialog(list)}>Add Info
                  </Button>
                  <Button variant='primary' size='sm' onClick={()=>handleDetailDialog(list)}>Detail
                  </Button>
                  </td>
                  <td>
                  {list.status == 0 && <span className='fw-bold text-warning'>Pending</span>}
                  {list.status == 1 && <span className='fw-bold text-success'>Approved</span>}
    
                  </td>
              </tr>
           ))
         }
          </tbody>
        </Table>
      </Card.Body>
    </Card>
    </div>
    <DoDetailDialog open={show1} close={()=>setShow1(!show1)} doData={doData}/>

    <ReceivePersonDialog open={show} close={()=>setShow(!show)} doData={doData} setDOList={setDOList}/>
    </Fragment>
  )
}

export default DOList