import React, { Fragment, useEffect, useState } from 'react'
import Nav from '../../Sidebar/Nav'
import { Button, Card, Table } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { api } from '../../../api/apiResource'
import { LoadingDialog } from '../../Loading'
import TransferDetailList from './TransferDetailList'

const WarehouseTransferList = () => {
 
    const [lists,setLists]=useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [issues,setIssues] = useState([])

    const handleCollapse =(val)=>{
      setIssues(val)
      setOpen(!open)
    }
    useEffect(()=>{
        const getTransferList = async()=>{
            try{
                const res = await api.get('warehouse_transfer/list')
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
        <div className="row m-4">
            <div className="col-md-9">
                <h5>Warehouse Transfer Order Lists</h5>
            </div>
            <div className="col-md-3">
                <Button to="/warehouse_transfer/create"  as={NavLink} variant="primary">New Warehouse Transfer Order</Button>
            </div>
        </div>

        <Card className='shadow border-0 mt-5' >
          <Card.Body>
              <Table striped hover>
                  <thead>
                  <tr className="text-success text-center">
                    <th>#</th>
                    <th>Warehouse Transfer No</th>
                    <th>Regional Name</th>
                    <th>Total Qty</th>
                    <th>Date</th>
                    <th>Material Issue Lists</th>
                  </tr>
                </thead>
                <tbody>
                  {
                      lists.map((list,index)=>(
                        <Fragment key={list.id}>
                          <tr className='text-center' >
                              <td>{++index}</td>
                              <td>{list.warehouse_transfer_no}</td>
                              <td>{list.reg_ware?.warehouse_name}</td>
                              <td>{list.total_qty}</td>
                              <td>{list.date}</td>
                          <td>
                          <Button variant='primary' size='sm' aria-controls="transfer-detail"
                          aria-expanded={open} onClick={()=>handleCollapse(list.material_issues)}>Detail </Button>  
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={9}>
                        
                          <TransferDetailList open={open} issues={issues} />

                        
                          </td>
                        </tr>
                        
                      
                        </Fragment>
                      ))
                  }

                  
                
                </tbody>
              </Table>
          </Card.Body>
        </Card>
      
    </div>
    {
        isLoading === true && <LoadingDialog />
    }
    </>
  )
}

export default WarehouseTransferList