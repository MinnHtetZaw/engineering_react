
import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Form } from '../../../style';
import { DialogTitle } from '@mui/material';





const DoDetailDialog = ({open,close,doData}) => {
   

  return (
    <>
    <Dialog open={open} onClose={close} id='showdialog' fullWidth  maxWidth='md'>
  <DialogTitle>
    <div className="row mt-3">
        <div className="col-8">
            <h5 className='text-success'>Receive Persion - {doData.receive_person ? <span className='text-danger'>{doData.receive_person}</span>  : <span className='text-danger'>Not Yet</span> } </h5>
        </div>

        <div className="col-4">
            <h5 className='text-success'>Phone  - {doData.phone ? <span className='text-danger'>{doData.phone}</span> : <span className='text-danger'>Not Yet</span> } </h5>
        </div>
    </div>
  </DialogTitle>
  <DialogContent >
  <Form className='mt-3'>
          
          <div className="row bg-primary text-white fw-bold p-2 text-center rounded">
                  <div className="col-md-1">
                  <span>No</span>
                  </div>

                  <div className="col-md-2">
                  <span>Product Name</span>
                  </div>
                  
                  <div className="col-md-3">
                  <span>Model</span>
                  </div>
                  
                  <div className="col-md-3">
                  <span> Issue Qty</span>
                  </div>

                  <div className="col-md-3">
                  <span> Reject Qty</span>
                  </div>

          </div>
      {
         doData.delivery_order_list?.map((item,index)=>(
         
              <div className="row mb-1 mt-3 text-center fw-bold" key={index}>
                  <div className="col-md-1">
                      <span>{++index}</span>
                  </div>
                  <div className="col-md-2">
                      <span>{item.product_name}</span>
                  </div>
                  <div className="col-md-3">
                      <span>{item.item_model}</span>
                  </div>
                  <div className="col-md-3 ">
                         <span>{item.issue_qty}</span>
                  </div>
                  <div className="col-md-3 ">
                         <span>{item.reject_qty}</span>
                  </div>
                  </div>
      
          ))
      }
                   
    </Form>
  </DialogContent>
  <DialogActions>
  
  </DialogActions>
  </Dialog> 
   </>
  
  )
}

export default DoDetailDialog








    
   

