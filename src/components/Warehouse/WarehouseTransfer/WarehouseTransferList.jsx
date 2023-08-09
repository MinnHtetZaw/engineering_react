import React, { useEffect, useState } from 'react'
import Nav from '../../Sidebar/Nav'
import { Button, Table } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { api } from '../../../api/apiResource'
import { LoadingDialog } from '../../Loading'

const WarehouseTransferList = () => {
 
    const [lists,setLists]=useState([])
    const [isLoading,setIsLoading] = useState(true)
    useEffect(()=>{
        const getTransferList = async()=>{
            try{
                const res = await api.get('warehouse_tranfer/list')
                setLists(res.data.data)
            }catch(err)
            {
            }
            finally{
                setIsLoading(false)
            }
        }

        getTransferList()
    },[])

  return (
    <>
    <Nav/>
    <div className='container m-3'>
        <div className="row mb-4">
            <div className="col-md-9">
                <h5>Warehouse Transfer Order Lists</h5>
            </div>
            <div className="col-md-3">
                <Button to="/warehouse_transfer/create"  as={NavLink} variant="primary">New Warehouse Transfer Order</Button>
            </div>
        </div>
        <Table striped hover>
      <thead>
        <tr className="text-success text-center">
          <th>#</th>
          <th>Warehouse Transfer No</th>
          <th>Regional Name</th>
          <th>Date</th>
          <th>Material Issue Lists</th>
        </tr>
      </thead>
      <tbody>
        {
            lists.map((list,index)=>(
                <tr className='text-center' key={index}>
                    <td>{++index}</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                <td>
                <Button variant='primary' size='sm'>Detail </Button>  
                </td>
              </tr>
            ))
        }
     
       
      </tbody>
    </Table>
    </div>
    {
        isLoading === true && <LoadingDialog />
    }
    </>
  )
}

export default WarehouseTransferList