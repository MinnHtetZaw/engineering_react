import React, { useState, useEffect } from 'react'
import Nav from '../Sidebar/Nav'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { api } from '../../api/apiResource'
import InfoIcon from '@mui/icons-material/Info'
import { useParams } from 'react-router-dom'
import ReportPhotoDialog from './ReportPhotoDialog';
import ReportVideoDialog from './ReportVideoDialog';

const TaskList = () => {
  const { id } = useParams()
  const [tasks, setTasks] = useState([])
  const [reports, setReports] = useState([])
  const [photos,setPhotos] = useState([])
  const [create, setCreate] = useState(false)
  const [videos,setVideos] = useState([])
  const [create2, setCreate2] = useState(false)


  const bgcolor = {
    backgroundColor: '#5a8dee'
  }

  const setPhotoDialog = (val)=>{
    setPhotos(val)
    setCreate(true)
  }
  const getTaskList = async () => {
    try {
      const res = await api.get('taskList/' + id)

      setTasks(res.data.tasks)
    } catch (err) {}
  }
  
  const getReportList =async()=>
  {
    try{
      const res = await api.get('reportList/'+id)
      setReports(res.data.data)
    }
    catch(err){

    }
  }

  const showCollapse = (e, id) => {
    e.preventDefault();
    if (document.getElementById("showReport" + id).getAttribute("value") === "0")
    {
      document.getElementById("show" + id).hidden = false;
      document.getElementById("showReport" + id).setAttribute("value", "1");
    } else {
      document.getElementById("show" + id).hidden = true;
      document.getElementById("showReport" + id).setAttribute("value", "0");
    }
    
  }
  const setVideoDialog=(val)=>{
    setVideos(val)
    setCreate2(true)
  
  }

  useEffect(() => {
    getTaskList()
    getReportList()
  }, [])

  return (
    <div>
      <Nav />
      <h5 className='col-10 fw-normal text-secondary m-3'>Project Task List</h5>

      <div className='row m-2'>
        <div className='col-12 ma-auto'>
          <div className='my-2'>
            <div className='card border-0 p-3 shadow-sm rounded-lg'>
              <table className='table table-borderless'>
                <thead style={bgcolor}>
                  <tr>
                    <th className='fw-normal text-white text-center'>No.</th>
                    <th className='fw-normal text-white text-center'>
                      task Name
                    </th>
                    <th className='fw-normal text-white text-center'>
                      Description
                    </th>
                    <th className='fw-normal text-white text-center'>
                      Start Date
                    </th>
                    <th className='fw-normal text-white text-center'>
                      End Date
                    </th>
                    <th className='fw-normal text-white text-center'>
                      Complete
                    </th>
                    <th className='fw-normal text-white text-center'>
                      Report Task Detail
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <>
                      <tr key={index}>
                        <td className='fw-normal  text-center'>
                          {++index}
                        </td>
                        <td className='fw-normal  text-center'>
                          {task.task_name}
                        </td>
                        <td className='fw-normal  text-center'>
                          {task.description}
                        </td>
                        <td className='fw-normal  text-center'>
                          {task.start_date}
                        </td>
                        <td className='fw-normal  text-center'>
                          {task.end_date}
                        </td>
                        <td className='fw-normal  text-center'>
                          {task.complete === 0 ? 'Not Complete' : 'Complete'}
                        </td>
                        <td className='fw-normal  text-center'>
                          <button className='btn btn-sm btn-primary' onClick={(e)=>showCollapse(e,task.id)}   id={"showReport" + task.id} value="0">
                            <InfoIcon /> Report Detail
                          </button>
                        </td>
                      </tr>
                      <tr id={'show' + task.id} hidden>
                        <td colSpan='10'>
                          <div className='offset-1 col-10'>
                            <table className='table table-hover table-borderless'>
                              <thead className='bg-info text-light'>
                                <tr className='text-center'>
                                  <th className='bod-li'>No.</th>
                                  <th className='bod-li'>Checked By</th>
                                  <th className='bod-li'>Finish Date</th>
                                  <th className='bod-li'>Progress</th>
                                  <th className='bod-li'>Materials</th>
                                  <th className='bod-li'>Report File</th>
                                  <th className='bod-li'>Performance</th>

                                </tr>
                              </thead>
                              <tbody>
                                {reports &&
                                (reports.map((report, i) =>(
                                    <tr
                                      className='text-center'
                                      key={i}
                                    >
                                        <td className='bod-li'>
                                        {++i}
                                      </td>
                                      <td className='bod-li'>
                                        {report.checked_by}
                                      </td>
                                      <td className='bod-li'>
                                        {report.finished_date}
                                      </td>
                                      <td className='bod-li'>
                                        {report.progress}
                                      </td>
                                      <td className='bod-li'>
                                        {/* {report.progress} */}
                                      </td>
                                      <td className='bod-li'>
                                      <span className="ml-2 mr-2" onClick={()=>setPhotoDialog(report.files[0].file)}><PhotoCameraIcon color="primary" fontSize="small"/>photo<sup className="bg-secondary text-white rounded px-1">{report.files[0].file.length}</sup></span>
                                      <button className='ms-3'> <span className="ml-2 mr-2" onClick={()=>setVideoDialog(report.files[1].file)}><PhotoCameraIcon color="primary" fontSize="small"/>video<sup className="bg-secondary text-white rounded px-1">{report.files[1].file.length}</sup></span></button>
                                      </td>
                                      <td className='bod-li'>
                                        {report.performance}
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ReportPhotoDialog
        open={create}
        close={() => setCreate(false)}
        photos={photos}
      />
      <ReportVideoDialog
        open={create2}
        close={() => setCreate2(false)}
        videos={videos}
      />
    </div>
  )
}

export default TaskList
