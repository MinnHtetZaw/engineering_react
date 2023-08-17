import React, { useEffect, useState } from 'react'
import Nav from '../../Sidebar/Nav'
import { Badge, Button, Card, Table } from 'react-bootstrap'
import { api } from '../../../api/apiResource'
import { LoadingDialog } from '../../Loading'
import TransferListDetail from './TransferListDetail'
import { DoneIcon } from '../../Icons'
import swal from 'sweetalert'


const RegionalWarehouseTransferList = () => {
  const [lists,setLists]=useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [transferList,setTransferList] = useState({})

  const handleCollapse =(val)=>{
    setTransferList(val)
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
  },[transferList])


  const handleAccept=async(id)=>{
      
   const res = await api.get('regional_warehouse/accept/'+id)
    
            swal('Success',res.data.message,'success')
            setLists(res.data.data)
           res.data.data.map((el)=>el.id == id &&  setTransferList(el))
  }

  const handleDeliver= async(id)=>{

    try
    {
       const res = await api.get('regional_warehouse/deliver/'+id)
      
        swal('Success',res.data.message,'success')
        setLists(res.data.data)
        res.data.data.map((el)=>el.id == id &&  setTransferList(el))

    }catch(err)
    {
        console.error(err);
    }

  }

  return (
    <>
    <Nav/>
    <div className='container col-10 offset-1'>
        <div className="row m-4">
            <div className="col-md-9">
                <h5>Warehouse Transfer Order Lists For Regional</h5>
            </div>
        </div>

        <Card className='shadow border-0 mt-5' >
          <Card.Body>
              <Table striped >
                  <thead>
                  <tr className="text-success text-center">
                    <th>#</th>
                    <th>Warehouse Transfer No</th>
                    <th>Regional Name</th>
                    <th>Total Qty</th>
                    <th>Date</th>
                    <th>Lists</th>
                    <th>Action</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {
                      lists.map((list,index)=>(
                        <>
                          <tr className='text-center' key={list.id}>
                              <td>{++index}</td>
                              <td>{list.warehouse_transfer_no}</td>
                              <td>{list.reg_ware?.warehouse_name}</td>
                              <td>{list.total_qty}</td>
                              <td>{list.date}</td>
                          <td>
                          <Button variant='primary' size='sm' aria-controls="transfer-detail"
                          aria-expanded={open} onClick={()=>handleCollapse(list)}>Detail </Button>  
                          </td>
                          <td>
                          {
                           list.accept_status == 0 &&  

                           <Button variant='primary' size='sm' onClick={()=>handleAccept(list.id)}> <DoneIcon fontSize='sm' /> Accept </Button>  
                            }
                  
                          {
                           list.accept_status == 1 &&  

                           <span>  <Badge bg='success' >Accepted </Badge> </span>
                            }

                          </td>
                          
                        </tr>
                        
                          <TransferListDetail open={open} transferList={transferList}  handleDeliver={handleDeliver}/>

                        </>
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

export default RegionalWarehouseTransferList

