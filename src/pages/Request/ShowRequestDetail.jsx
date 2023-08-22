import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Nav from '../../components/Sidebar/Nav';
import swal from 'sweetalert';
import { api } from '../../utilities/api/apiResource';


const ShowRequestDetail = () => {

  const {id} =useParams();
  const navigate = useNavigate()

  const [reqData,setRequestData] =useState({})
  const [room,setRoom] = useState({})
  const [building,setBuilding] = useState({})
  const [asset,setAsset] = useState({})
  const [employees,setEmployee] = useState([])
  const [employee_id,setEmpId] =useState(0)

  const addAssign =()=>{
    api.post("approveRequest",{
      employee_id:employee_id,
      id:reqData.id,
    })
    .then((res)=>
    swal("Successfully!", "Successfully Assigned.", "success"),
    )

    navigate(-1)
  }

  useEffect(()=>{
    
    const getRequest = async()=>{
      const res = await api.get("request/"+id)

      setRequestData(res.data.request)
      setAsset(res.data.asset)
      setRoom(res.data.room)
      setBuilding(res.data.building)
    }

    const getEmployee = async()=>{
      const res = await api.get("employee")
      setEmployee(res.data.employee)
    }
    getEmployee()
    getRequest()
  },[id])
  
  return (
    <>
    <Nav />
    <div className="row mt-5">
      <div className="offset-1 col-10 ma-auto">
        <div className="card shadow-3-strong border-0 p-3 shadow-sm rounded-lg">
          <h5 className="text-center mt-2">
           Request Maintenance Form
          </h5>
        <div className='row'>
        <div className='col-6'>
        <div className="form-group  mt-3">
            <label>Request No.</label>
          <input type="text" className="form-control" value={reqData.request_no} disabled/>
       
        </div>
        </div>
        <div className='col-6'>
        <div className="form-group  mt-3">
            <label>Request Date</label>
            <input type="text" className="form-control" value={reqData.request_no} disabled/>
    </div>	
          </div>
          
    </div>

    <div className='row'>
       
    <div className='col-6'>
        <div className="form-group  mt-3">
                <label>Due Date</label>
                <input type="text" className="form-control" value={reqData.due_date} disabled />
            
        </div>
            </div>
          </div>
          <div className="row">
        <div className='col-4'>
        <div className="form-group  mt-3">
            <label>Building</label>
            <input type="text" className="form-control" value={building.name} disabled />
    </div>	
          </div>
          
        <div className='col-4'>
        <div className="form-group  mt-3">
            <label>Room</label>
            <input type="text" className="form-control" value={room.room_number} disabled />
       
    </div>	
          </div>
        
         
              <div className='col-4'>
              <div className="form-group  mt-3">
            <label>Asset</label>
            <input type="text" className="form-control" value={asset.name} disabled />
       
           </div>	
          </div>
          
   </div>
          <div className='row'>
          <div className='col-12'>
        <div className="form-group  mt-3">
            <label>Condition</label>
             
            
        <textarea className="form-control" value={reqData.condition} disabled></textarea>
        </div>
          </div>
          </div>  

        <div className='row'>
       
        <div className='col-12'>
        <div className="form-group  mt-3">
            <label>Requirement Remark</label>
            <textarea className="form-control" value={reqData.requirement_remark} disabled></textarea>

    </div>	
        </div>
          </div>
          <div className='row'>
       
        <div className='col-6'>
        <div className="form-group  mt-3">
            <label>Assign Employee</label>
            <select className='form-control mt-1' onChange={(e)=>setEmpId(e.target.value)}>
            <option hidden>Choose Engineer</option>
            {
                employees.map((employee)=>(

                  <option key={employee.id} value={employee.id}>{employee.name}</option>
                ))
            }
            </select>
    </div>	
        </div>
          </div>
          <div className="text-center mt-5">

            <button className='btn btn-success' onClick={addAssign} >Assign</button>
          </div>
        </div>
      
      </div>
      </div>
 </>
   
  )
}

export default ShowRequestDetail

