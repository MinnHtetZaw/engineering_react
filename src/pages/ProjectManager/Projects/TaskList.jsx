/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Nav from '../../../components/Sidebar/Nav'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { api } from '../../../utilities/api/apiResource'
import InfoIcon from '@mui/icons-material/Info'
import { useParams } from 'react-router-dom'
import ReportPhotoDialog from '../../../components/ProjectManager/Projects/ReportPhotoDialog';
import ReportVideoDialog from '../../../components/ProjectManager/Projects/ReportVideoDialog';
import TaskRow from '../../../components/ProjectManager/Projects/TaskRow';

const TaskList = () => {
  const { id } = useParams()
  const [tasks, setTasks] = useState([])
  
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
  
  

  
  const setVideoDialog=(val)=>{
    setVideos(val)
    setCreate2(true)
  
  }

  useEffect(() => {
    getTaskList()
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
                    <TaskRow key={index} task={task} index={index} setVideoDialog={setVideoDialog} setPhotoDialog={setPhotoDialog}/>
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
