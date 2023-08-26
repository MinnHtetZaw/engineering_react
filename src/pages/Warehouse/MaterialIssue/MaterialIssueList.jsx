import React, { useEffect, useState } from 'react'
import Nav from '../../../components/Sidebar/Nav'
import { Badge, Button, Card, Table } from 'react-bootstrap'
import { api } from '../../../utilities/api/apiResource'
import IssueDetailDialog from '../../../components/Warehouse/MaterialIssue/IssueDetailDialog'

const MaterialIssueList = () => {

    const [issueLists,setIssueLists] = useState([])
    const [show,setShow] = useState(false)
    const [itemsList,setItemList] = useState([])

    useEffect(()=>{
        const getMaterialIssues = async()=>{
            const res = await api.get('materialIssue/list')
            
            setIssueLists(res.data.data)
        }

        getMaterialIssues()
    },[])

    const handleDialog=(val)=>{
        setItemList(val)
        setShow(!show)
    }

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
                    <thead className="text-center bg-primary text-white">
                        <tr>
                            <th>#</th>
                            <th>Material Issue No</th>
                            <th>Customer Name</th>
                            <th>Phone</th>
                            <th>Project</th>
                            <th>Phase</th>
                            <th>Action</th>
                            <th>Status</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                 {
                    issueLists.map((list,index)=>(
                        <tr className="text-center" key={index}>
                        <td>{++index}</td>
                        <td>{list.material_issue_no}</td>
                        <td>{list.customer_name}</td>
                        <td>{list.phone}</td>
                        <td>{list.project_name}</td>
                        <td>{list.phase_name}</td>  
                        <td> 
                        <Button variant='outline-primary' onClick={()=>handleDialog(list.items)}>
                            Detail
                        </Button>
                        </td>
                        <td>
                            {list.delivery_order_status == 0 &&  <span><Badge bg='warning'>Pending</Badge></span> }
                            {list.delivery_order_status == 1 &&  <span><Badge bg='success'>Delivery Oredered</Badge></span> }
                           </td>
                        {/* <td><span className="badge badge-success p-1">Delivery Oredered</span></td> */}
                    </tr>
                    ))
                 }
                      

               </tbody>
                </Table>
            </Card.Body>
        </Card>
      <IssueDetailDialog open={show} close={()=>setShow(!show)}  itemsList={itemsList}/>
    </div>
    
  )
}

export default MaterialIssueList