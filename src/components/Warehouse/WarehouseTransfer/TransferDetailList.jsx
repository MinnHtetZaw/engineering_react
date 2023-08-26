import React, { Fragment, useState } from 'react'
import { Badge, Button, Collapse,Table } from 'react-bootstrap'

const TransferDetailList = ({list,index}) => {

    const [open, setOpen] = useState(false)
    const [issueList,setIssueList] = useState({})

    const handleCollapse =(val)=>{
      setIssueList(val)
      setOpen(!open)
    }

  return (
    <>
     
                          <tr className='text-center' >
                              <td>{++index}</td>
                              <td>{list.warehouse_transfer_no}</td>
                              <td>{list.reg_ware?.warehouse_name}</td>
                              <td>{list.total_qty}</td>
                              <td>{list.date}</td>
                          <td>
                          <Button variant='primary' size='sm' aria-controls="transfer-detail"
                          aria-expanded={open} onClick={()=>handleCollapse(list)}>Detail </Button>  
                          </td>
                        </tr>
                      
                       
                            <tr hidden={!open}>
                            <td colSpan={9}>
                         
                    
                            <Collapse in={open}>
        <div id="transfer-detail">
        <Table hover>
                    <thead>
                        <tr className="text-success text-center">
                            <th>#</th>
                            <th>Material Issue</th>
                            <th>Project</th>
                            <th>Phase</th>
                            <th>Total Qty</th>
                            <th>Delivery Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           issueList.material_issues?.map((issue,index)=>(
                                <tr className='text-center' key={issue.id}>
                                    <td>{++index}</td>
                                    <td>{issue.material_issue_no}</td>
                                    <td>{issue.project?.name}</td>
                                    <td>{issue.phase?.phase_name}</td>
                                    <td>{issue.total_qty}</td>

                                    <td>
                                    {issue.delivery_order_status == 0 && <Badge bg="warning">Pending</Badge> }
                                    {issue.delivery_order_status == 1 && <Badge bg='success'>Delivery Oredered</Badge> }

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
  
    </>
  )
}

export default TransferDetailList