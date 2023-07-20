import React,{useState} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { api } from '../../api/apiResource';

const Form = styled.form`
    display: flex;
    flex-direction: column;
`


const Floor = (props) => {

    const [number, setFloorNumber] = useState(0)
   

    const data = {
        number: number,
        building_id:props.bid
    }
    
    const addFloor = () => {

        api.post("floor_store",data)
            .then((res) =>
            window.location.reload())
    }
    
    return (
   
      <Dialog open={props.open} onClose={props.close} id='showdialog' fullWidth  maxWidth='xs'>

        <DialogTitle  className='text-center'><b>Add Floor</b></DialogTitle>
        <DialogContent >
        <Form>
          <div className='row'>
                <div className='col-12'>
                <div className="form-group  mt-4">
                        <label>Floor Number</label>

                <div className="form-group">
                    <input type="number" className="form-control" placeholder="Enter Floor Number" onChange={(e)=>setFloorNumber(e.target.value)}/>
                </div>
                    
                </div>
                </div>
                
                    </div>
                  
                      			     
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
          <Button onClick={addFloor}>Save</Button>
        </DialogActions>
      </Dialog> 
      

    )
}

export default Floor;
