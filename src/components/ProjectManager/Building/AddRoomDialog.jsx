import React,{useEffect, useState} from 'react'
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
const Room = (props) => {

    const [prefix, setRoomPrefix] = useState('')
    const [roomtypes,setRoomType] = useState([])
    const [type,setType] =useState(0)

    const data = {
        room_prefix: prefix,
        building_id:props.bid,
        room_type:type
    }
    
    const addRoom = () => {

        api.post("room_store",data)
            .then((res) =>
            window.location.reload())
    }

    useEffect(()=>{

        const RoomType = async()=>{
            try{
                const res= await api.get("roomtype")
                setRoomType(res.data.roomtypes)
            }catch(err){

            }
        }
        RoomType()
    },[])
    
    return (
   
      <Dialog open={props.open} onClose={props.close} id='showdialog' fullWidth  maxWidth='xs'>

        <DialogTitle  className='text-center'><b>Add Room</b></DialogTitle>
        <DialogContent >
        <Form>
          <div className='row'>
                <div className='col-12'>
                <div className="form-group  mt-4">
                        <label>Room Type</label>

                        <select className='form-control' onChange={(e)=>setType(e.target.value)} >
                                    <option hidden>Choose Room Type</option>
                                    {
                                        roomtypes.map((roomtype,i) =>
                                            <option key={roomtype.id} value={roomtype.id}>{roomtype.name}</option>
                                        )
                                }
                </select>
                    
                </div>
                <div className="form-group  mt-4">
                        <label>Room Prefix</label>

                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Enter Prefix" onChange={(e)=>setRoomPrefix(e.target.value)}/>
                </div>
                    
                </div>
                </div>
                
                    </div>
                  
                      			     
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
          <Button onClick={addRoom}>Save</Button>
        </DialogActions>
      </Dialog> 
      

    )
}

export default Room;
