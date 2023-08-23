import React, {useState,useEffect} from 'react'
import Nav from "../../../components/Sidebar/Nav"
import {api} from '../../../utilities/api/apiResource';
import { Link, useParams } from "react-router-dom";
import TaskDialog from '../../../components/ProjectManager/Projects/TaskDialog'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InfoIcon from '@mui/icons-material/Info';

const PhaseList = () => {
    const {id} = useParams()
    const [phases,setPhases] = useState([]);
    const [create,setCreate] = useState(false);
    const [phaseid,setPhaseId] = useState('');

    const bgcolor = {
        backgroundColor : '#5a8dee'
    };

    const getproject = async () =>{
    
      try{
        const res = await api.get('phaseList/'+id);
        setPhases(res.data.phase);
        
      }catch(err){}
    };

   

    const create_task = (id) =>{
        setPhaseId(id);
        setCreate(true);
     }

     useEffect(()=>{
      getproject()
},[]);
  return (
    <div>
        <Nav/>
      <h5 className="col-10 fw-normal text-secondary m-3">Project Phase List</h5>    

      <div className="row m-2">
      <div className="col-12 ma-auto">
      <div className="my-2">
               <div className="card border-0 p-3 shadow-sm rounded-lg">

              <table className="table table-hover table-borderless">
                <thead style={bgcolor}>
                <tr>
                  <th className="fw-normal text-white text-center">No.</th>
                  <th className="fw-normal text-white text-center">Phase Name</th>
                  <th className="fw-normal text-white text-center">Supervisor</th>
                  <th className="fw-normal text-white text-center">Description</th>
                  <th className="fw-normal text-white text-center">Start Date</th>
                  <th className="fw-normal text-white text-center">End Date</th>
                  <th className="fw-normal text-white text-center">Add Task</th>
                  <th className="fw-normal text-white text-center">Task List</th>
                  <th className="fw-normal text-white text-center">Document List</th>
                </tr>
                </thead>
                <tbody>
                {phases.map((phase,index)=>(
            <tr key={phase.id}>
            <td scope="col"  className="fw-normal  text-center">{++index}</td>
            <td scope="col"  className="fw-normal  text-center">{phase.phase_name}</td>
            <td scope="col"  className="fw-normal  text-center">{phase.supervisor.name}</td>
            <td scope="col"  className="fw-normal  text-center">{phase.description}</td>
            <td scope="col"  className="fw-normal  text-center">{phase.start_date}</td>
            <td scope="col"  className="fw-normal  text-center">{phase.end_date}</td>
            <td scope="col"  className="fw-normal  text-center">
            <a  className="btn btn-sm btn-primary" onClick={()=>create_task(phase.id)}>
            <AddCircleOutlineIcon/>Add Task
            </a>
            </td>
            <td scope="col"  className="fw-normal  text-center">
            <Link to={"/task/"+phase.id} className="btn btn-sm btn-primary">
            <InfoIcon/>Check Task List
            </Link>
            </td>
            <td scope="col"  className="fw-normal  text-center">
            <a  className="btn btn-sm btn-primary" >
            <InfoIcon/>Check Document List
            </a>
            </td>
          </tr>        
            ))}   
                </tbody>


              </table>

        </div>
               </div>
      </div>
      </div>
      <TaskDialog open={create} close={()=>setCreate(false)} phase_id = {phaseid}/>
    </div>
  )
}

export default PhaseList