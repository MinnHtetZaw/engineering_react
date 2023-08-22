
import React, { useRef } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Form } from '../../../style';
import { Badge, Button } from 'react-bootstrap';
import { api } from '../../../utilities/api/apiResource';
import swal from 'sweetalert';

const ReceivePersonDialog = ({open,close,doData,setDOList}) => {

    const personRef = useRef()
    const phoneRef  = useRef()
    const dateRef   = useRef()
    const locationRef = useRef()

    const submitForm=async(e)=>{
      e.preventDefault()
        try
        {
          const res = await api.post('site_delivery_order/receive_person',{
                receive_person : personRef.current.value,
                phone : phoneRef.current.value,
                deliver_date : dateRef.current.value,
                location : locationRef.current.value,
                DOid : doData.id
            })
        
            swal('Update','Successfully Update Receiving Info!','success')
            setDOList(res.data.data)
            close()
        }
       catch(err)
       {
        console.error(err);
       }
        
    }
  return (
    <>
    <Dialog open={open} onClose={close} id='showdialog' fullWidth  maxWidth='sm'>
  
  <DialogTitle  className=''><span>Receiving Person Information</span><hr /></DialogTitle>
  <DialogContent >
  <Form onSubmit={submitForm}>
          <div className='text-center'>
            <h5>Material Issue Date - <span><Badge bg='danger'>{doData.dispatch_date} </Badge></span></h5> 
          </div>

        <div className="my-2">
            <label>Receiving Person:</label>
            <input type="text" className='form-control' ref={personRef}/>
        </div>

        <div className="my-2">
            <label>Phone:</label>
            <input type="tel" className='form-control' ref={phoneRef}/>
        </div>

        <div className="my-2">
            <label>Deliver Date:</label>
            <input type="date" className='form-control' ref={dateRef}/>
        </div>

        
        <div className="my-2">
            <label>Location:</label>
            <textarea className='form-control' cols="30" rows="3" ref={locationRef}></textarea>
        </div>

        <div className="my-2 text-end">
          <Button variant='secondary' className='me-2' onClick={close}>Close</Button>
          <Button variant='primary'type='submit' >Submitit</Button>
        </div>
                   
    </Form>
  </DialogContent>
  <DialogActions>
  
  </DialogActions>
  </Dialog> 
    </>
  )
}

export default ReceivePersonDialog