import React,{useState} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { api } from '../../../utilities/api/apiResource';

const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const AddBuilding = (props) => {

    const [number,setNumber]=useState(0)
    const [buildingName, setBuildingName] = useState('')
   
    const data = {
        name: buildingName,
        number:number
    }
    
    const addBuilding = () => {

        api.post("building_store",data)
            .then((res) =>
        window.location.reload())
    }


    return (
   
      <Dialog open={props.open} onClose={props.close} id='showdialog' fullWidth  maxWidth='xs'>

        <DialogTitle  className='text-center'><b>Add Building</b></DialogTitle>
        <DialogContent >
        <Form>
          <div className='row'>
                <div className='col-12'>
                <div className="form-group  mt-4">
                        <label>Building Name</label>

                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Enter Name" onChange={(e)=>setBuildingName(e.target.value)}/>
                </div>
                    
                </div>
                </div>
                
                    </div>
                      <div className='row'>
                    <div className='col-12'>
                <div className="form-group  mt-4">
                    <label>Number of Room per Floor</label>
                    <input className='form-control' onChange={(e)=>setNumber(e.target.value)}></input>
          
              </div>	
                        </div>
                        </div>
                      			     
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
          <Button onClick={addBuilding}>Save</Button>
        </DialogActions>
      </Dialog> 
      

    )
}

export default AddBuilding