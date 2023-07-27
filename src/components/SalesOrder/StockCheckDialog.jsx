import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Form = styled.form`
display: flex;
flex-direction: column;
`


const StockCheckDialog = ({products,open,close}) => {

  return (
    <>
    <Dialog open={open} onClose={close} id='showdialog' fullWidth  maxWidth='md'>
  
  <DialogTitle  className=''><span>Sale Order Products</span><hr /></DialogTitle>
  <DialogContent >
  <Form>
          
          <div className="row bg-info fw-bold p-2 text-center rounded">
                  <div className="col-md-3">
                  <span>Product Name</span>
                  </div>
                  <div className="col-md-3">
                  <span>Request Quantity</span>
                  </div>
                  <div className="col-md-3">
                  <span>Instock Quantity</span>
                  </div>
                  <div className="col-md-3">
                  <span>Required Quantity</span>
                  </div>
          </div>
      {
          products.map((product,index)=>(
        
              <div className="row mb-1 mt-3 text-center" key={index}>
                 
                  <div className="col-md-3">
                      <span>{product.product_name}</span>
                  </div>
                  <div className="col-md-3">
                      <span>{product.qty}</span>
                  </div>
                  <div className="col-md-3">
                      <span>{product.instock_qty}</span>
                  </div>
                  <div className="col-md-3">
                    {
                        product.required_qty >0 ? <span class="badge badge-danger">{product.required_qty}</span> :
                        <span class="badge badge-success">{product.required_qty}</span>
                    }
                      
                  </div>
  
              </div>
         
          ))
      }

        <div className="text-center mt-5">
                <Link to='/purchase_request' state={{data :products}}>
                    <button className='btn btn-primary btn-sm'>Request</button>
                </Link>
        </div>
                              
    </Form>
  </DialogContent>
  <DialogActions>
  
  </DialogActions>
  </Dialog> 
   </>
  )
}

export default StockCheckDialog