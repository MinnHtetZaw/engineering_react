import React, { Fragment, useEffect, useState } from 'react'
import Nav from '../../../components/Sidebar/Nav'
import { Button, Card, Table } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { api } from '../../../utilities/api/apiResource'
import { LoadingDialog } from '../../../components/Loading'
import TransferDetailList from '../../../components/Warehouse/WarehouseTransfer/TransferDetailList'

const WarehouseTransferList = () => {
 
    const [lists,setLists]=useState([])
    const [isLoading,setIsLoading] = useState(true)
   
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
              <Table striped>
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
                        <TransferDetailList list={list} key={index} index={index}/>
                       
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