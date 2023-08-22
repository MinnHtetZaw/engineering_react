import React,{useState} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import swal from 'sweetalert';
import { api } from '../../../utilities/api/apiResource';

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const AddMaintenanceDialog = (props) => {

  const [maintenanceDate, setMaintainDate] = useState('');
  const [nextMaintainDate,setNextMaintainDate] =useState('')
  const [person, setPerson] = useState('');
  const [file, setFile] = useState('');
  const [type, setType] = useState('');
  const [remark, setRemark] = useState('');
  const [show,setShow] = useState(true);
  
  const saveQuotation = (e) =>{
    e.preventDefault()
    let formdata={
        file:file,
        last_maintenance_date:maintenanceDate,
        next_maintenance_date:nextMaintainDate,
        person: person,
        type : type, 
        remark : remark,   
        asset_id : props.assetID,
      }
      
      api.post('maintenance_store', formdata,
      {
          headers: {
          'Content-Type': 'multipart/form-data'
      }
      }).then(function(response){
        setShow(false);
        swal("Successfully!", "Successfully Stored Maintenance form.", "success");
        window.location.reload();
    })
  }
  return (
    <div>
       { show ? 
        <Dialog open={props.open} onClose={props.close}>
        <DialogTitle  className='text-center'><b><span className='text-success'>{props.assetCode}'s  </span>Maintenance</b></DialogTitle>
        <DialogContent>
        <Form>
              
            <div className='row'>
            <div className='col-4'>
            <div className="form-group  mt-3">
                    <label>Maintenance Date</label>

            <div className="form-group">
                <input type="date" name="start_date" className="form-control" onChange={(e)=>setMaintainDate(e.target.value)}/>
            </div>
                
            </div>
            </div>
            <div className='col-4'>
            <div className="form-group  mt-3">
                <label>Person</label>

            <div className="form-group">
                <input type="text" name="start_date" className="form-control" onChange={(e)=>setPerson(e.target.value)}/>
            </div>
        </div>	
            </div>
            <div className='col-4'>
            <div className="form-group  mt-3">
                <label>Type</label>

            <div className="form-group">
               <select className='form-control' value={type} onChange={(e)=>setType(e.target.value)}>
                <option hidden>Choose Type</option>
                <option value="Prevent Maintenance">Prevent Maintenance</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Repair">Repair</option>
          
               </select>
            </div>
        </div>	
            </div>
        </div>
        <div className='row'>
            <div className='col-6'>
            <div className="form-group  mt-3">
                    <label>Next Maintenance Date</label>

            <div className="form-group">
                <input type="date" name="start_date" className="form-control" onChange={(e)=>setNextMaintainDate(e.target.value)}/>
            </div>
                
            </div>
            </div>
            <div className='col-6'>
            <div className="form-group  mt-3">
                <label>Attach File:</label>

            <div className="form-group">
                <input type="file" name="start_date" className="form-control" onChange={(e)=>setFile(e.target.files[0])}/>
            </div>
        </div>	
            </div>
        </div>
            
            <div className="form-group mt-3">
                <label for="description">Remark</label>
                <textarea className="form-control" name="description" id="description" rows="3" placeholder="Enter Remark" onChange={(e)=>setRemark(e.target.value)}></textarea>
            </div>
          
                 			     
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
          <Button onClick={saveQuotation}>Save</Button>
        </DialogActions>
      </Dialog> : ''
    }
    </div>
  )
}

export default AddMaintenanceDialog