import React, { useEffect, useState } from 'react'
import Nav from '../../../components/Sidebar/Nav';
import { Badge, Button, Card, Table } from 'react-bootstrap';
import { api } from '../../../utilities/api/apiResource';

const WarehouseTransferMonitor = () => {

    const [lists,setIssueList] = useState([])
 
    useEffect(()=>{
        const getIssueList = async()=>{
            const res = await api.get('materialIssue/list')
            setIssueList(res.data.data)
        }

        getIssueList()
    },[])
  return (
   <>
   <Nav/>
   <div className='fs-5 fst-italic ms-5 mt-3'>
   Check Warehouse Transfer
   </div>
   <Card className='m-4 rounded border-0 shadow' >
    <Card.Body>
    <Table striped bordered hover>
        <thead className='bg-primary text-white text-center'>
            <tr>
                <th>#</th>
                <th>Material Issue No</th>
                <th>Project</th>
                <th>Phase </th>
                <th>Customer Name</th>
                <th>Transfer Date</th>
           
                <th>Regional Warehouse Transfer</th>
                <th>Site Delivery Order</th>
            </tr>
        </thead>
        <tbody>
            {
                lists.map((list,index)=>(
                    <tr className='text-center' key={list.id}>
                        <td>{++index}</td>
                        <td>{list.material_issue_no}</td>
                        <td>{list.project_name}</td>
                        <td>{list.phase_name}</td>
                        <td>{list.customer_name}</td>
                        <td>{list.transfer_date}</td>
                        <td>
                            
                        {list.warehouse_transfer_status == 0 &&
                            <span>
                                <Badge bg="warning">Pending...</Badge>
                            </span>}

                        {list.warehouse_transfer_status == 1 &&
                            <span>
                                <Badge bg="success">Transferred</Badge>
                            </span>}

                        </td>
                        <td>  
                            {list.delivery_order_status == 0 &&
                            <span>
                                <Badge bg="warning">Pending...</Badge>
                            </span>}

                        {list.delivery_order_status == 1 &&
                            <span>
                                <Badge bg="success">Delivered</Badge>
                            </span>}
                        </td>
                    </tr>
                ))
            }
         
      </tbody>
    </Table>
    </Card.Body>
   </Card>

   </>
  )
}

export default WarehouseTransferMonitor