import React, { useEffect, useRef, useState } from 'react'
import Nav from '../../../components/Sidebar/Nav'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { api} from '../../../utilities/api/apiResource'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'

const CreateFrom = () => {

    const [roles,setRoles] = useState([]);
    const formRef = useRef('');
    const prefixRef = useRef('');
    const approveByRef = useRef(null);
    const checkByRef = useRef(null);
    const prepareByRef = useRef(null);
    const nav = useNavigate();

    const getRoles = async ()=>{
        const res = await api.get('roles')
        setRoles(res.data)
    }

    useEffect(()=>{
        

        getRoles()
    },[])

    const handleAddForm =(e)=>{
        e.preventDefault()
        const data ={
            form_name : formRef.current.value,
            prefix : prefixRef.current.value,
            approve_by : approveByRef.current.value,
            check_by : checkByRef.current.value,
            prepare_by : prepareByRef.current.value,
        }
        api.post('form/create',data)
        .then((res)=>
            res.status === 201 && 
            swal('Excellent','You created successfully!','success')
            .then(()=>
            nav('/from_lists'))
            )
    
        .catch((err)=>

            err.response.status === 422 &&
            swal('Validation','You need to Fill all the fields','error'))
        
    }

  return (
 <>
 <Nav/>
    <Container className='mt-4'>
        <Card className='col-8 offset-2'>
            <Card.Header className='bg-primary'>
                <Card.Title className='text-white'>
                        Form Register
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleAddForm}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Form Name</Form.Label>
                        <Form.Control type="text"  ref={formRef} placeholder="eg.Good Receive Note" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPrefix">
                        <Form.Label>Prefix</Form.Label>
                        <Form.Control type="text" ref={prefixRef} placeholder="eg.GRN" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPrefix">
                        <Form.Label>Approve By</Form.Label>
                        <Form.Select ref={approveByRef}>
                            <option hidden>Select Role</option>
                            {
                                roles.map((role)=>(
                                    <option value={role.id} key={role.id}>{role.role}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPrefix">
                        <Form.Label>Check By</Form.Label>
                        <Form.Select ref={checkByRef}>
                            <option hidden>Select Role</option>
                            {
                                roles.map((role)=>(
                                    <option value={role.id} key={role.id}>{role.role}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPrefix">
                        <Form.Label>Prepare By</Form.Label>
                        <Form.Select ref={prepareByRef}>
                            <option hidden>Select Role</option>
                            {
                                roles.map((role)=>(
                                    <option value={role.id} key={role.id}>{role.role}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <Button type='submit'>Submit </Button>
                </Form>
            </Card.Body>
            {/* <Card.Footer className='bg-white text-end border-top-0'> 
                    
            </Card.Footer> */}
        </Card>
    </Container>

 </>
  )
}

export default CreateFrom