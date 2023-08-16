import React, { useState } from 'react'
import { Badge, Button, Collapse,Table } from 'react-bootstrap'
import { api } from '../../../api/apiResource'
import ProductDialog from './ProductDialog'

const TransferListDetail = ({open,transferList}) => {
    const [show,setShow] =useState(false)
    const [items,setItems] =useState([])


  const  handleDialog=(id)=>{
    try{
        api.get('regional_warehouse/searchProducts/'+id)
        .then((res)=>{
            setItems(res.data.data)
        })
        .then(()=>
        setShow(!show))

    }catch(error)
    {
        console.error();
    }
       
  }
  return (
    <>
    <tr>
                          <td colSpan={9}>
    <Collapse in={open}>
        <div id="transfer-detail" className='col-10 offset-1'>
        <Table>
                    <thead>
                        <tr className="text-success text-center">
                            <th>#</th>
                            <th>Material Issue</th>
                            <th>Request Code</th>
                            <th>Project</th>
                            <th>Phase</th>
                            <th>Total Qty</th>
                            <th>Products</th>
                            <th>Deliver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transferList.material_issues?.map((issue,index)=>(
                                <tr className='text-center' key={index}>
                                    <td>{++index}</td>
                                    <td>{issue.material_issue_no}</td>
                                    <td>{issue.request_materials?.request_code}</td>
                                    <td>{issue.project?.name}</td>
                                    <td>{issue.phase?.phase_name}</td>
                                    <td>{issue.total_qty}</td>
                                    <td>
                                        <Button variant='outline-success' size='sm' onClick={()=>handleDialog(issue.id)}> Show
                                        </Button>
                                    </td>
                                    <td>
                            {
                             transferList.deliver_status == 0 && transferList.accept_status == 0 &&  

                              <Button variant='secondary' size='sm' disabled >Deliver </Button>
                            }
                            {
                             transferList.deliver_status == 0 && transferList.accept_status == 1 &&  
                              
                              <Button variant='primary' size='sm'>Deliver </Button>
                            }
                            {
                              transferList.deliver_status == 1 && transferList.accept_status == 1 &&  
                              <span>  <Badge bg='success' >Delivered </Badge> </span>
                             
                            }
                         
                          </td>
                                 
                                </tr>
                            ))
                        }

                        
                    </tbody>
                </Table>
        </div>

    </Collapse>
    </td>
    </tr>
                        
    <ProductDialog open={show}  close={()=>setShow(!show)} items={items}/>
    </>
  )
}

export default TransferListDetail