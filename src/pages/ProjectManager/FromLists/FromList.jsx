import React, { useState } from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Nav from '../../../components/Sidebar/Nav'
import { Plus, Wrench } from '../../../components/Icons'
import UpdateDialog from '../../../components/ProjectManager/FromLists/updateDialog'

const FromList = () => {

    const [open,setOpen] = useState(false)

    const handleUpdate=()=>{
        setOpen(!open)
    }
  return (
    <>
    <Nav/>
    <div className="row m-3">
        <div className="col-12">
          <Card className=' border-start-0 border-top-0 shadow'>
            <Card.Header className='flex bg-white' >
              <Card.Title className='fst-italic text-decoration-underline' >Form List</Card.Title>
           
              <Link to='/create_from'><Button variant='outline-primary'><Plus fontSize='sm'/> Create Form</Button> </Link>
            </Card.Header>
           
        
            <Card.Body>
           
              <Table bordered striped>
                <thead className="text-center">
                	<tr>
                        <th>No</th>
                        <th>Form Name</th>
                        <th>Approve By</th>
                        <th>Check By</th>
                        <th>Prepare By</th>
                        <th>Index Digit</th>
                        <th>Prefix Syntax</th>
                        <th>Action</th>
                    </tr>
                </thead>
             
                <tbody className="text-center">
                    <tr>
                        <td></td>
                        <td></td>
                        <td className="text-danger"></td>
                        <td className="text-info"></td>
                        <td className="text-success"></td>
                        <td className=""></td>
                        <td></td>
                        <td>
                        <Button variant='success' size='sm' onClick={handleUpdate}><Wrench fontSize='sm'/>  Update</Button>
                    </td>

                    </tr>
               
                </tbody>
               
              </Table>
              
            </Card.Body>
          </Card>
</div>


</div>
<UpdateDialog open={open} close={()=>setOpen(!open)}/>
    </>
  )
}

export default FromList