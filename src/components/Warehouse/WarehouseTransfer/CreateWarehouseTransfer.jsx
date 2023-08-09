import React, { useEffect, useRef, useState } from 'react'
import Nav from '../../Sidebar/Nav'
import { Button, Card, Form, InputGroup } from 'react-bootstrap'
import { api } from '../../../api/apiResource'
import IssuesList from './IssuesList'
import AddIssueList from './AddIssueList'

const CreateWarehouseTransfer = () => {

    const wtoRef = useRef()
    const dateRef = useRef()
    const [regWarehouses,setRegWarehouses] = useState([])
    const [project,setProject] = useState({})
    const [phases,setPhases] =useState([])
    const [issues,setIssues] = useState([])
    const [contact_person,setContact]=useState(null)

    useEffect(()=>{
        const getRegWarehouses =async()=>{
            const res = await api.get('regional_warehouse')
                setRegWarehouses(res.data.regionalwarehouses)
                
        }
    
        getRegWarehouses()
    },[])

    const selectRegWare=(val)=>{
        
      const filteredProject =  regWarehouses.filter((el)=>el.id == val)

            setProject(filteredProject[0].project)

            api.get('regional_warehouse/project/'+filteredProject[0].project.id)
            .then((res)=>
            setPhases(res.data.data))
    }

    const selectPhase = async (value)=>{
        
    const res= await  api.get('regional_warehouse/project/phase/'+value)
             setIssues(res.data.data) 
             setContact(res.data.contact_person) 
    }

    const generateWto =()=>{
        api.get('generate_WTO')
        .then((res)=>
        wtoRef.target.value= res.data)
    }

  return (
    <>
    <Nav/>
    <Card className='m-4 p-2'>
        <Card.Body>
        <div className="row">
            <div className="col-md-6">
             <label className='fs-6 fw-bold'>Warehouse Transfer No:</label>
             <InputGroup className="my-2">
                <InputGroup.Text className='bg-dark text-white'>wto</InputGroup.Text>
                <InputGroup.Text className='bg-secondary text-white'>0000</InputGroup.Text>
                    <Form.Control ref={wtoRef} required/>
                    <Button variant="warning" onClick={generateWto}>
                        Generate
                    </Button>
            </InputGroup>
            </div>

            <div className='col-md-6'>
                 <label className='fs-6 fw-bold'>Order Date:</label>
                <input className='form-control my-2' type='date' ref={dateRef}  />
            </div>
        </div>

        <div className='row mt-2'>
            <div className="col-md-6">
             <label className='fs-6 fw-bold'>Regional Warehouse No:</label>
             <Form.Select className='my-2' onChange={(e)=>selectRegWare(e.target.value)}>
                <option hidden>Open Regional Warehouse</option>
                {
                    regWarehouses.map((regWarehouse)=>(
                        <option value={regWarehouse.id} key={regWarehouse.id}>{regWarehouse.warehouse_name}</option>
                    ))
                }
              </Form.Select>
           
            </div>
            <div className="col-md-3">
             <label className='fs-6 fw-bold'>Project:</label>
             <input className='form-control my-2' value={project.name} />
            </div>
            <div className="col-md-3">
             <label className='fs-6 fw-bold'>Phase :</label>
             <Form.Select className='my-2' onChange={(e)=>selectPhase(e.target.value)}>
                <option hidden>Open Phase</option>
                {
                   phases.length >0 ? phases.map((phase)=>(
                        <option value={phase.id} key={phase.id}>{phase.phase_name}</option>
                    ))
                    :
                    <option>No Phase Yet</option>
                }
              </Form.Select>
           
            </div>
        </div>

        <div className='row my-4'>
            <IssuesList issues={issues} contact_person={contact_person} />
            <AddIssueList contact_person={contact_person}/>
        </div>
        <div className='text-center'>
            <Button variant="primary">Send Regional Warehouse </Button>
        </div>
        </Card.Body>
    </Card>
    </>
  )
}

export default CreateWarehouseTransfer