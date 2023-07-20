import React,{useEffect} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
`


const ShowRoom = (props) => {

    useEffect(()=>{

    },[])

  return (
   <>
      <Dialog open={props.open} onClose={props.close} id='showdialog' fullWidth  maxWidth='xs'>

<DialogTitle  className='text-center'><b>Add Floor</b></DialogTitle>
<DialogContent >
<Form>
  <div className='row'>
        <div className='col-12'>
        <div className="mt-4 text-center">
              {
                props.roomData.map((room,index)=>(
                    
                    <ul key={room.id}>
                        <li>{room.room_number}</li>
                    </ul>
                  
                    
                ))
              }
        </div>
        </div>
        
            </div>
          
                               
  </Form>
</DialogContent>
<DialogActions>
  <Button onClick={props.close}>Cancel</Button>
</DialogActions>
</Dialog> 
   </>
  )
}

export default ShowRoom