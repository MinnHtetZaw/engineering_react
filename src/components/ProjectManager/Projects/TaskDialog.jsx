import React,{useState} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import {api} from '../../../utilities/api/apiResource';

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const TaskDialog = (props) => {

    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [startdate,setStartdate] = useState('');
    const [enddate,setEnddate] = useState('');
    const navigate = useNavigate();

    const data ={
      phase_id : props.phase_id,
      name : name,
      description : description,
      start_date : startdate,
      end_date : enddate
    }

    const savetask = () =>{
    api.post('task',data)
        .then(function(response){
            alert('success store');
            navigate('/task/'+props.phase_id);
          }).catch(function(error){
             alert('fail store');
          })
    }

  return (
    <div>
        <Dialog open={props.open} onClose={props.close}>
        <DialogTitle  className='text-center'><b>Create A New Task</b></DialogTitle>
        <DialogContent>
          <Form>
          <div className='row'>
                <div className='col-6'>
                <div className="form-group  mt-3">
                        <label>Start Date:</label>

                <div className="form-group">
                    <input type="date" name="start_date" className="form-control" onChange={(e)=>setStartdate(e.target.value)}/>
                </div>
                    
                </div>
                </div>
                <div className='col-6'>
                <div className="form-group  mt-3">
                    <label>End Date:</label>

                <div className="form-group">
                    <input type="date" name="start_date" className="form-control" onChange={(e)=>setEnddate(e.target.value)}/>
                </div>
            </div>	
                </div>
            </div>
                <div className="form-group mt-3">
                    <label for="phase_name">Task Name</label>
                    <input type="text" className="form-control" name="phase_name" id="phase_name" placeholder="Enter Phase Name" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="form-group mt-3">
                    <label for="description">Description</label>
                    <textarea className="form-control" name="description" id="description" rows="3" placeholder="Enter description" onChange={(e)=>setDescription(e.target.value)}></textarea>
                </div>       			     
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
          <Button onClick={savetask}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default TaskDialog