import React from 'react'
import { Badge, Collapse,Table } from 'react-bootstrap'

const TransferDetailList = ({open,issues}) => {
  return (
    <>
    <Collapse in={open}>
        <div id="transfer-detail">
        <Table>
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
                            issues.map((issue,index)=>(
                                <tr className='text-center' key={index}>
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
    </>
  )
}

export default TransferDetailList