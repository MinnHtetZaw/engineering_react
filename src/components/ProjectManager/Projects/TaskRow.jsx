import React, { Fragment, useState } from 'react'
import  InfoIcon  from '@mui/icons-material/Info';
import  PhotoCameraIcon  from '@mui/icons-material/PhotoCamera';
import { api } from '../../../utilities/api/apiResource';

const TaskRow = ({task,index,setPhotoDialog,setVideoDialog}) => {

    const [reports, setReports] = useState([])
    const [show,setShow] = useState(false)

    const getReportList =async(val)=>
    {
      try{
        const res = await api.get('reportList/'+val)
        setReports(res.data.data)
      }
      catch(err){
  
      }
    }
    const showCollapse = (e, id) => {
    e.preventDefault();
    setShow(!show) 
    getReportList(id) 
  }

  

  return (
    <Fragment>
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
                          <button className='btn btn-sm btn-primary' onClick={(e)=>showCollapse(e,task.id)}>
                            <InfoIcon /> Report Detail
                          </button>
                        </td>
                      </tr>
                      <tr hidden={!show}>
                        <td colSpan='10'>
                          <div className='offset-1 col-10'>
                            <table className='table table-hover table-borderless'>
                              <thead className='bg-secondary text-white'>
                                <tr className='text-center'>
                                  <th className='bod-li'>No.</th>
                                  <th className='bod-li'>Checked By</th>
                                  <th className='bod-li'>Finish Date</th>
                                  <th className='bod-li'>Progress</th>
                                  <th className='bod-li'>Report File</th>
                                  <th className='bod-li'>Performance</th>

                                </tr>
                              </thead>
                              <tbody>
                                {
                                reports.map((report, i) =>(
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
                                      <span className="ml-2 mr-2" onClick={()=>setPhotoDialog(report.files[0].file)}><PhotoCameraIcon color="primary" fontSize="small"/>photo<sup className="bg-secondary text-white rounded px-1">{report.files[0].file.length}</sup></span>
                                      <button className='ms-3'> <span className="ml-2 mr-2" onClick={()=>setVideoDialog(report.files[1].file)}><PhotoCameraIcon color="primary" fontSize="small"/>video<sup className="bg-secondary text-white rounded px-1">{report.files[1].file.length}</sup></span></button>
                                      </td>
                                      <td className='bod-li'>
                                        {report.performance}
                                      </td>
                                    </tr>
                                  ))
                                }
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </Fragment>
  )
}

export default TaskRow