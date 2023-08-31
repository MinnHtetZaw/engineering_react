import React, { useEffect, useState } from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Nav from '../../../components/Sidebar/Nav'
import { Plus, Wrench } from '../../../components/Icons'
import { api } from '../../../utilities/api/apiResource'
import UpdateFormDialog from '../../../components/ProjectManager/FromLists/UpdateFormDialog'

const FromList = () => {

    const [open,setOpen] = useState(false)
    const [formLists,setFormLists]=useState([])
    const [singleList,setSingleList]= useState({})

    useEffect(()=>{
      const getFormLists = async()=>{
        const res = await api.get('form/lists')
        setFormLists(res.data.data)
      }
      getFormLists()
    },[])


    const handleUpdate=(val)=>{
        setSingleList(val)
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
                <thead className="text-center bg-secondary text-white"> 
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
                  {
                    formLists.map((list,index)=>(
                      <tr key={index}>
                        <td>{++index}</td>
                        <td>{list.form_name}</td>
                        <td className="text-danger">{list.approve_by_role}</td>
                        <td className="text-info">{list.check_by_role}</td>
                        <td className="text-success">{list.prepare_by_role}</td>
                        <td className="">{list.index_digit}</td>
                        <td>{list.prefix}</td>
                        <td>
                        <Button variant='success' size='sm' onClick={()=>handleUpdate(list)}><Wrench fontSize='sm'/>  Update</Button>
                        </td>

                      </tr>
                    ))
                  }
                   
               
                </tbody>
               
              </Table>
              
            </Card.Body>
          </Card>
</div>


</div>
<UpdateFormDialog open={open} close={()=>setOpen(!open)} singleList={singleList}/>
    </>
  )
}

export default FromList