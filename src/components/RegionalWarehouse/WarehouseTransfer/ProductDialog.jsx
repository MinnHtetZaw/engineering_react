
import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';


const Form = styled.form`
display: flex;
flex-direction: column;
`

const ProductDialog = ({open,close,items}) => {
   

  return (
    <>
    <Dialog open={open} onClose={close} id='showdialog' fullWidth  maxWidth='md'>
  
  <DialogTitle  className=''><span>Transfer Products</span><hr /></DialogTitle>
  <DialogContent >
  <Form>
          
          <div className="row bg-info fw-bold p-2 text-center rounded">
                  <div className="col-md-1">
                  <span>No</span>
                  </div>
                  <div className="col-md-2">
                  <span>Brand</span>
                  </div><div className="col-md-3">
                  <span>Model</span>
                  </div>
                  <div className="col-md-3">
                  <span> Serial No.</span>
                  </div>
                  <div className="col-md-3">
                  <span> Issue Qty</span>
                  </div>
                  
                
          </div>
      {
          items.map((item,index)=>(
         
              <div className="row mb-1 mt-3 text-center fw-bold" key={index}>
                  <div className="col-md-1">
                      <span>{++index}</span>
                  </div>
                  <div className="col-md-2">
                      <span>{item.item_model}</span>
                  </div>
                  <div className="col-md-3">
                      <span>{item.item_serial_no}</span>
                  </div>
                  <div className="col-md-3 ">
                         <span>{item.item_brand}</span>
                  </div>
                  <div className="col-md-3 ">
                         <span>{item.issue_qty}</span>
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

export default ProductDialog








    
   

