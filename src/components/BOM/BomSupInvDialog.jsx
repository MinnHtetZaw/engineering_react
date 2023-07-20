import React,{useState} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import swal from 'sweetalert';
import { useLocation } from 'react-router-dom';
import { api } from '../../api/apiResource';

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const BomSupInvDialog = (props) => {

  const [invno, setInvNo] = useState('');
  const [filename, setFileName] = useState('');
  const [file, setFile] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [show,setShow] = useState(true);

   const location = useLocation();

  
  const saveInvoice = () =>{

    let formdata =
    {
        file:file,
        invno:invno,
        filename: filename,
        date : date, 
        description : description,   
        supplier_id : props.id,
      }
      console.log(formdata)
      
     api.post('bomsupplierinvoice', formdata,
      {
          headers: {
          'Content-Type': 'multipart/form-data'
      }
      }).then(function(response){
        setShow(false);
        swal("Successfully!", "Successfully Stored Invoice form.", "success");
        location.reload();
    })
  }
  return (
    <div>
       { show ? 
        <Dialog open={props.open} onClose={props.close}>
        <DialogTitle  className='text-center'><b><span className='text-success'>({props.no}'s)  </span>Supplier Invoice</b></DialogTitle>
        <DialogContent>
        <Form>
              
            <div className='row'>
            <div className='col-6'>
            <div className="form-group  mt-3">
                    <label>Invoice No:</label>

            <div className="form-group">
                <input type="text" name="start_date" className="form-control" placeholder='Enter Invoice No' onChange={(e)=>setInvNo(e.target.value)}/>
            </div>
                
            </div>
            </div>
            <div className='col-6'>
            <div className="form-group  mt-3">
                <label>Date:</label>

            <div className="form-group">
                <input type="date" name="start_date" className="form-control" onChange={(e)=>setDate(e.target.value)}/>
            </div>
        </div>	
            </div>
        </div>
        <div className='row'>
            <div className='col-6'>
            <div className="form-group  mt-3">
                    <label>File Name:</label>

            <div className="form-group">
                <input type="text" name="start_date" className="form-control" onChange={(e)=>setFileName(e.target.value)}/>
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
                <label for="description">Description</label>
                <textarea className="form-control" name="description" id="description" rows="3" placeholder="Enter description" onChange={(e)=>setDescription(e.target.value)}></textarea>
            </div>
          
                 			     
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
          <Button onClick={saveInvoice}>Save</Button>
        </DialogActions>
      </Dialog> : ''
    }
    </div>
  )
}

export default BomSupInvDialog