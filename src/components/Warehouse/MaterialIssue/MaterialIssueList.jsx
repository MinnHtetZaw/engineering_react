import React, { useEffect } from 'react'
import Nav from '../../Sidebar/Nav'
import { Card, Table } from 'react-bootstrap'

const MaterialIssueList = () => {

    useEffect(()=>{
        
    },[])


  return (
    <div>
        <Nav/>
        <Card className='m-4'>
            <Card.Header>
                <Card.Title>
                 Material Issue Lists
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <Table striped bordered hover>
                    <thead className="text-center bg-info text-white">
                        <th>#</th>
                        <th>Material Issue No</th>
                        <th>Customer Name</th>
                        <th>Phone</th>
                        <th>Project</th>
                        <th>Phase</th>
                        <th>Action</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                 
                        <tr className="text-center">
                            <td></td>
                            <td>Material Issue No</td>
                            <td>Customer Name</td>
                            <td> - </td>
                            <td>Project</td>
                            <td>Phase</td>  
                            <td>Action</td>
                            <td><span className="badge badge-warning p-1">Pending</span></td>
                            {/* <td><span className="badge badge-success p-1">Delivery Oredered</span></td> */}
                        </tr>

               </tbody>
                </Table>
            </Card.Body>
        </Card>
      
    </div>
  )
}

export default MaterialIssueList