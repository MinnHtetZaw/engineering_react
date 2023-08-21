import React, { useEffect, useRef, useState } from 'react'
import Nav from '../../Sidebar/Nav'
import { Button, Card, Form, InputGroup } from 'react-bootstrap'
import { api } from '../../../api/apiResource'
import IssuesList from './IssuesList'
import AddIssueList from './AddIssueList'
import { useSelector } from 'react-redux'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'

const   CreateWarehouseTransfer = () => {

    const nav = useNavigate()

    const dateRef = useRef()
    const issueList = useSelector(state=>state.issue.issueList)
    const [wtoNo,setWtoNo] = useState(null)
    const [regWarehouses,setRegWarehouses] = useState([])
    const [project,setProject] = useState({})
    const [phases,setPhases] =useState([])
    const [issues,setIssues] = useState([])
    const [contact_person,setContact]=useState(null)
    const [regWareId,setRegWareId] =useState(null)

    useEffect(()=>{
        const getRegWarehouses =async()=>{
            const res = await api.get('regional_warehouse')
                setRegWarehouses(res.data.regionalwarehouses)
                
        }
    
        getRegWarehouses()
    },[])
        
    const selectRegWare=(val)=>{
        
      const filteredProject =  regWarehouses.filter((el)=>el.id == val)

            setRegWareId(val)
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

    const generateWto =async(e)=>{
        e.preventDefault()
     const res = await api.get('warehouse_transfer/generate_WTO')
     setWtoNo(res.data)
    }

    const handleSend =(e)=>{
        e.preventDefault()

        if(wtoNo == null)
        {
            swal('Error','You need to generate Wto No. !','error')
        }
        else{
            const data={
                issueList:issueList,
                date:dateRef.current.value,
                wto_no: wtoNo,
                regional_warehouse_id:regWareId
            }
                api.post('warehouse_transfer/create',data)
                .then((res)=> 
                    swal('Good',res.data.success,'success')
                    .then(()=>nav('/warehouse_transfer/list')))
                .catch((error)=>
                swal('Error','Something Went Wrong...!','error'))    
        }
       
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
                    <Form.Control value={wtoNo||''} readOnly/>
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
             <input className='form-control my-2' value={project.name || ''} disabled/>
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
            <Button variant="primary" onClick={handleSend}>Send Regional Warehouse </Button>
        </div>
       
        </Card.Body>
    </Card>
    </>
  )
}

export default CreateWarehouseTransfer