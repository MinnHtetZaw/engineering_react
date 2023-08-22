import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { url } from '../../utilities/api/urlResource';

const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const ShowBomSupQuoDialog = (props) => {


  
  return (
    <div>
        <Dialog open={props.open} onClose={props.close}>
        <DialogTitle  className='text-center'><b><span className='text-success'>({props.bno}'s)  </span>Supplier Quotation</b></DialogTitle>
        <DialogContent>
        <Form>
              
            <div className='row mt-3'>
            <img src={url+`quotation/${props.quo}`} className="img-fluid"/>      
            </div>
            <div className='row mt-4 text-center'>
             <h6>File Name : <span className='text-success'>{props.quoname}</span></h6>   
             <h6>Description : <span className='text-success'>{props.quodes}</span></h6> 
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

export default ShowBomSupQuoDialog