import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom";

import {api} from '../../utilities/api/apiResource'
import PhaseDialog from './PhaseDialog'
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Projectlist = () => {
  const bgcolor = {
    backgroundColor : '#5a8dee'
  };
  const [projects,setprojects] = useState([]);
  const [create,setCreate] = useState(false);
  const [projectid,setProjectId] = useState('');

  useEffect(()=>{
    const getproject = async () =>{
      try{
        const res = await api.get("project");

        setprojects(res.data.project);
        
      }catch(err){}
    };
    getproject();
  },[])

  const create_phase = (id) =>{
    setProjectId(id);
    setCreate(true);
 }
  return (
    <div>
      <div className='row m-3'>
      <h5 className="col-10 fw-normal text-secondary">Sale Project List</h5>
      <Link to="/project_register" className="col-2 btn btn-sm btn-primary">
      <AddIcon/> Add Project
      </Link>
      
      </div>
       
    
      <div className="row m-2">
      <div className="col-12 ma-auto">
      <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <label className="nav-link active"  data-bs-toggle="pill" data-bs-target="#proj"  role="tab" aria-controls="proj" aria-selected="true">Project Management</label>
            </li>
            <li className="nav-item" role="presentation">
              <label className="nav-link"  data-bs-toggle="pill" data-bs-target="#finance"  role="tab" aria-controls="finance" aria-selected="false">Financial Management</label>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="proj" role="tabpanel" aria-labelledby="proj-tab">
            <div className="my-2">
               <div className="card border-0 p-3 shadow-sm rounded-lg">

              <table className="table table-hover table-borderless">
                <thead style={bgcolor}>
                <tr>
                  <th className="fw-normal text-white text-center">No.</th>
                  <th className="fw-normal text-white text-center">Name</th>
                  <th className="fw-normal text-white text-center">Submission Date</th>
                  <th className="fw-normal text-white text-center">Estimate Date</th>
                  <th className="fw-normal text-white text-center">ROI</th>
                  <th className="fw-normal text-white text-center">Add Phase</th>
                  <th className="fw-normal text-white text-center">Phase List</th>
                </tr>
                </thead>
                <tbody>
                {projects.map((pro,index)=>(
            <tr key={pro.id}>
            <td className="fw-normal  text-center">{++index}</td>
            <td className="fw-normal  text-center">{pro.name}</td>
            <td className="fw-normal  text-center">{pro.submission_date}</td>
            <td className="fw-normal  text-center">{pro.estimate_date}</td>
            <td className="fw-normal  text-center">{pro.roi_value}</td>
            <td className="fw-normal  text-center">
            <td className="btn btn-sm btn-primary" onClick={()=>create_phase(pro.id)}>
            <AddCircleOutlineIcon/> Add Phase
            </td>
            </td>
            <td className="fw-normal  text-center">
            <Link to={"/phase/"+pro.id} className="btn btn-sm btn-primary">
            <InfoIcon/>Check Phase List
            </Link>
            </td>
          </tr>        
      ))}
                
                </tbody>


              </table>

        </div>
               </div>
             </div>
             <div className="tab-pane fade show" id="finance" role="tabpanel" aria-labelledby="finance-tab">
            <div className="my-2">
        <div className="card border-0 p-3 shadow-sm rounded-lg">
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="rfq-tab" data-bs-toggle="pill" data-bs-target="#rfq" type="button" role="tab" aria-controls="rfq" aria-selected="true">RFQ State</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="bid-tab" data-bs-toggle="pill" data-bs-target="#bid" type="button" role="tab" aria-controls="bid" aria-selected="false">Bidded State</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="award-tab" data-bs-toggle="pill" data-bs-target="#award" type="button" role="tab" aria-controls="award" aria-selected="false">Awarded State</button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="rfq" role="tabpanel" aria-labelledby="rfq-tab">

              <table className="table table-hover table-borderless">
                <thead style={bgcolor}>
                <tr>
                  <th className="fw-normal text-white text-center">No.</th>
                  <th className="fw-normal text-white text-center">Name</th>
                  <th className="fw-normal text-white text-center">Project Value</th>
                  <th className="fw-normal text-white text-center">Expected Budget</th>
                  <th className="fw-normal text-white text-center">ROI</th>
                  <th className="fw-normal text-white text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                {projects.map((pro,index)=>(
            <tr key={pro.id}>
            <td className="fw-normal  text-center">{++index}</td>
            <td className="fw-normal  text-center">{pro.name}</td>
            <td className="fw-normal  text-center">{pro.project_value}</td>
            <td className="fw-normal  text-center">{pro.expected_budget}</td>
            <td className="fw-normal  text-center">{pro.roi_value}</td>
            <td className="fw-normal  text-center">
            <button className='btn btn-sm btn-danger'><span className='tex-white'>Change Status</span></button>
            &nbsp;&nbsp;
            <button className='btn btn-sm btn-warning text-white'>Invoice</button>
            &nbsp;&nbsp;
            <button className='btn btn-sm btn-info text-white'>Purchase Order</button>
            </td>
          </tr>        
      ))}
                
                </tbody>


              </table>
            </div>

            
                   
          </div>

        </div>
      </div>      
             </div>
          </div>
     
    </div>
      </div>
      <PhaseDialog open={create} close={()=>setCreate(false)} project_id = {projectid}/>
    </div>
  )
}

export default Projectlist