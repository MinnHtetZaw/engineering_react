
import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { url } from '../../api/urlResource';

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const ViewPOFile = (props) => {
  
  return (
    <div>
        <Dialog open={props.open} onClose={props.close}>
        <DialogTitle  className='text-center'><b>Purchase Order File</b></DialogTitle>
        <DialogContent>
        <Form>
              
            <div className='row mt-3'>
            <img src={url+`purchaseorder/${props.file}`} className="img-fluid"/>      
            </div>

          </Form>
        </DialogContent>
        <DialogActions>
        <Button onClick={props.close}>Cancel</Button>
        </DialogActions>
      </Dialog> 
    </div>
  )
}

export default ViewPOFile