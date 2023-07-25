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

const SalesOrderDetailDialog = ({open,close,products}) => {
 
  return (
 <>
  <Dialog open={open} onClose={close} id='showdialog' fullWidth  maxWidth='md'>

<DialogTitle  className=''><span>Sale Order Products</span><hr /></DialogTitle>
<DialogContent >
<Form>
        
        <div className="row bg-info fw-bold p-2 text-center rounded">
                <div className="col-md-1">
                <span>No</span>
                </div>
                <div className="col-md-3">
                <span>Product Name</span>
                </div>
                <div className="col-md-2">
                <span>Brand</span>
                </div>
                <div className="col-md-2">
                <span>Model Number</span>
                </div>
                <div className="col-md-2">
                <span>Request Stock Qty</span>
                </div>
                <div className='col-md-2'>
                    <span>Action</span>
                </div>
        </div>
    {
        products.map((product,index)=>(
      
            <div className="row mb-1 mt-3 text-center" key={index}>
                <div className="col-md-1">
                    <span>{++index}</span>
                </div>
                <div className="col-md-3">
                    <span>{product.product_name}</span>
                </div>
                <div className="col-md-2">
                    <span>{product.brand}</span>
                </div>
                <div className="col-md-2 ">
                    <span>{product.part_number}</span>
                </div>
                <div className="col-md-2 ">
                    <span>{product.qty}</span>
                </div>

                <div className="col-md-2 ">
                <Link to='/purchase_request' state={{data :product}}>
                    <button className='btn btn-primary btn-sm'>Request</button>
                    </Link>
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

export default SalesOrderDetailDialog