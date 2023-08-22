/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import Nav from '../Sidebar/Nav'
import {AddIcon,EyeIcon ,ListIcon} from "../Icons";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import {api} from '../../utilities/api/apiResource'
import { Collapse } from '@mui/material';

import  PhotoCameraIcon  from '@mui/icons-material/PhotoCamera';
import ReportReqPhotoDialog from './ReportReqPhotoDialog';
import ReportReqVideoDialog from './ReportReqVideoDialog';


const RequestMaintenance = () => {

  
  const [requests,setRequests]=useState([])
  const navigate = useNavigate();


 const  getRequest =async()=>{
    const res = await api.get("request_list")
    setRequests(res.data.requests)
 }

useEffect(()=>{ 
      getRequest()
    },[])
 

function Row ({request}){

 const [open, setOpen] = useState(false)
 const [reports,setReports] = useState([])
 const [photos,setPhotos] = useState([])
 const [videos,setVideos] = useState([])
 const [create, setCreate] = useState(false)
 const [create2, setCreate2] = useState(false)


 const setPhotoDialog = (val)=>{
  setPhotos(val)
  setCreate(true)
}

const setVideoDialog=(val)=>{
  setVideos(val)
  setCreate2(true)

}

 const setCollapse=(id)=>{

  api.get('reportReqMaintainList/'+id)
  .then((res)=>
  setReports(res.data.data)
  )
  setOpen(!open)
 }

 return (
   <>
                                <tr className="text-center" key={request.id} style={{"height":"70px"}}>
                                <td className="bod-li"></td>
                                <td className="bod-li">{request.request_no}</td>                                   
   
                                <td className="bod-li">{request.asset.name}</td>
                        
                                <td className="bod-li">{request.condition}</td>
                
                                  
                                <td className="bod-li">{request.due_date}</td>
                                <td className="bod-li">{
                                    request.employee_id == null ?<span className='bg-danger text-white rounded px-2'>Not Assigned</span> : request.employee.name
                                  }
                                  </td>
                                  
                                <td className="bod-li">{
                                    request.finish_status == 0 ?<span className='bg-danger text-white rounded px-2'>Not Finished</span> : <span className='bg-success text-white rounded px-2'>Finished</span>
                                  }
                                  </td>
                                  <td>
                                <Link to={"/request_detail/"+request.id} className="col-6">
                                <EyeIcon/>
                                </Link>
                                
                                <button><ListIcon style={{"margin-left":"20px"} } color='primary' sx={{ fontSize: 30 }} onClick={()=>setCollapse(request.id)} value="0"/></button>
                                  </td>

                                </tr>
                                  <tr>
                                  <td colSpan={10}>
                                  <Collapse in={open} timeout="auto" unmountOnExit>
                                
                                  <div className="offset-1 col-10">
                                                    <table className="table table-striped">
                                                      <thead className="bg-info text-light">
                                                        <tr className="text-center">
                                                          <th className="bod-li">No.</th>
                                                          <th className="bod-li">Checked by</th>
                                                          <th className="bod-li">Finish Date</th>
                                                          <th className="bod-li">Progress</th>
                                                          <th className="bod-li">Materials</th>
                                                          <th className="bod-li">Report File</th>
                                                          <th className="bod-li">Performance</th>

                                                        </tr>
                                                      </thead>
                                                      <tbody>
                                                        { 
                                                          reports && (
                                                          reports.map((report, i) =>
                                                         (
                                                            <tr className="text-center" key={report.id}>
                                                              <td className="bod-li">{++i}</td>
                                                              <td className="bod-li">{report.checked_by}</td>
                                                              <td className="bod-li">{report.finished_date}</td>
                                                              <td className="bod-li">{report.progress}</td>
                                                              <td className="bod-li"></td>
                                                              <td className="bod-li">
                                                              
                                                              <button className='me-3'> <span className="ml-2 mr-2" onClick={()=>setPhotoDialog(report.files[0].file)}><PhotoCameraIcon color="primary" fontSize="small"/>photo<sup className="bg-secondary text-white rounded px-1">{report.files[0].file.length}</sup></span></button>
                                                              <button className='ms-3'> <span className="ml-2 mr-2" onClick={()=>setVideoDialog(report.files[1].file)}><PhotoCameraIcon color="primary" fontSize="small"/>video<sup className="bg-secondary text-white rounded px-1">{report.files[1].file.length}</sup></span></button>
                                                              </td>
                                                             
                                                              <td className="bod-li">{report.performance}</td>

                                                            
                                                            </tr>
                                                          ))
                                                          )
                                                          
                                                        }
                                                      </tbody>
                                                    </table>
                                                  </div>
                                    </Collapse>
                                    </td>
                                  </tr>
                                  <ReportReqPhotoDialog
        open={create}
        close={() => setCreate(false)}
        photos={photos}
      /><ReportReqVideoDialog
      open={create2}
      close={() => setCreate2(false)}
      videos={videos}
    />

                               </>

 )
}
  return (
  
 <>
    <Nav/>
    <div className='flex'>
            <h5 className="col-10 fw-normal text-secondary fb">Request Maintenance List</h5>
            <button className="col-2 btn btn-primary border-0" onClick={()=>navigate('/add_request')} ><AddIcon/> Request</button>
      </div>
      
        <div className="row m-1">
            <div className="col-12 ma-auto">
            <div className="my-2">
                <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="rfq" role="tabpanel" aria-labelledby="rfq-tab">
                    <table className="table table-striped">
                        <thead className="bg-soft text-light">
                      <tr>
                                <th scope="col" className="p-2 text-center bod-li">No</th>
                                <th scope="col" className="p-2 text-center bod-li">Request No</th>
                                {/* <th scope="col" className="p-2 text-center bod-li">Request Date</th> */}
                                <th scope="col" className="p-2 text-center bod-li">Asset</th>
                               
                                <th scope="col" className="p-2 text-center bod-li">Condition</th>
     
                                <th scope="col" className="p-2 text-center bod-li">Due Date</th>
                                <th scope="col" className="p-2 text-center bod-li">Employee</th>
                                <th scope="col" className="p-2 text-center bod-li">Status</th>
                                <th scope="col" className="p-2 text-center bod-li">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                           {
                            requests.map((request,i)=>

                              <Row key={i} request={request}/>
                  
                            )}
                           
                            
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

 </>
  )
}

export default RequestMaintenance