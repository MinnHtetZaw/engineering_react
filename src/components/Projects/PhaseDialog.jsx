import React,{useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { api } from '../../utilities/api/apiResource'

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const PhaseDialog = (props) => {
    const [users,setUsers] = useState([]);
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [startdate,setStartdate] = useState('');
    const [enddate,setEnddate] = useState('');
    const [userid,setUserid] = useState('');
    const navigate = useNavigate();

    const getUsers = async () =>{
      try{
        const res = await api.get("project");
        setUsers(res.data.user);
      }catch(err){}
    }

    const data ={
      project_id : props.project_id,
      name : name,
      description : description,
      start_date : startdate,
      end_date : enddate,
      user_id : userid,
    }

    const savephase = () =>{
     
    api.post('phase',data)
            .then(function(response){
               alert('success store');
               navigate('/phase/'+props.project_id);
           })
             .catch(function(error){
                alert('fail store');
            })
    }

    useEffect(()=>{
      
      getUsers()

    },[]);
  return (
    <div>
        <Dialog open={props.open} onClose={props.close}>
        <DialogTitle  className='text-center'><b>Create A New Phase</b></DialogTitle>
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
                    <label for="phase_name">Phase Name</label>
                    <input type="text" className="form-control" name="phase_name" id="phase_name" placeholder="Enter Phase Name" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="form-group mt-3">
                    <label for="description">Description</label>
                    <textarea className="form-control" name="description" id="description" rows="3" placeholder="Enter description" onChange={(e)=>setDescription(e.target.value)}></textarea>
                </div>
                <div className="form-group mt-3">
                <label>Supervisor</label>
                <select className="custom-select form-control" name="user_id" onChange={(e)=>setUserid(e.target.value)}>
                    <option hidden>Choose Supervisor</option>
                {users.map(user=>(
                    <option  key={user.id} value={user.id}>
                       {user.name}
                    </option>
                     ))}
                
                </select>
                </div>     			     
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
          <Button onClick={savephase}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default PhaseDialog