import React, { useEffect, useState } from 'react'
import Nav from './../../Sidebar/Nav';
import { Badge, Button, Card, Table } from 'react-bootstrap';
import { ThumbUpIcon } from '../../Icons';
import { api } from '../../../api/apiResource';

const WarehouseTransferMonitor = () => {

    const [lists,setIssueList] = useState([])
 
    useEffect(()=>{
        const getIssueList = async()=>{
            const res = await api.get('material_issue_list')
            setIssueList(res.data.data)
        }

        getIssueList()
    },[])
  return (
   <>
   <Nav/>
   <Card className='m-4 rounded' >
    <Card.Body>
    <Table striped bordered hover>
        <thead className='bg-info text-white text-center'>
            <tr>
                <th>#</th>
                <th>Material Issue No</th>
                <th>Project</th>
                <th>Phase </th>
                <th>Transfer Date</th>
                <th>Approval</th>
                <th>Regional Warehouse Transfer</th>
                <th>Site Delivery Order</th>
            </tr>
        </thead>
        <tbody>
            <tr className='text-center'>
                <td>1</td>
                <td>Material Issue No</td>
                <td>Material Issue No</td>
                <td>@Material Issue No</td>
                <td>@Material Issue No</td>
                <td>
                <Button variant="outline-primary" size='sm'> <ThumbUpIcon fontSize='small'/> Approve</Button>
                </td>
                <td>
                    <span>
                        <Badge bg="warning">Pending...</Badge>
                    </span>
                </td>
                <td>  
                    <span>
                        <Badge bg="warning">Pending...</Badge>
                    </span>
                </td>
            </tr>
      </tbody>
    </Table>
    </Card.Body>
   </Card>

   </>
  )
}

export default WarehouseTransferMonitor