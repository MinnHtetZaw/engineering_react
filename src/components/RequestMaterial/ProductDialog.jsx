import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { Badge } from 'react-bootstrap';

const Form = styled.form`
display: flex;
flex-direction: column;
`

const ProductDialog = ({open,close,list}) => {
   
  return (
 <>
 
  <Dialog open={open} onClose={close} id='showdialog' fullWidth  maxWidth='sm'>

<DialogTitle  className=''><span>Sale Order Products</span><hr /></DialogTitle>
<DialogContent >
<Form>
        
        <div className="row bg-info fw-bold p-2 text-center rounded">
                <div className="col-md-1">
                <span>No</span>
                </div>

                <div className="col-md-6">
                <span>Product Name</span>
                </div>
              
                <div className="col-md-5">
                <span>Quantity</span>
                </div>
               

        </div>
    {
       list.products?.map((product,index)=>(
       
            <div className="row mb-1 mt-3 text-center fw-bold" key={index}>
                <div className="col-md-1">
                    <span>{++index}</span>
                </div>

                <div className="col-md-6">
                    <span>{product.name}</span>
                </div>
              
                <div className="col-md-5 ">
                    <span>{product.approved_quantity}</span>

                </div>
             
            </div>
        ))
    }
             <div className="text-center mt-5">
    {
        
             list.isIssued == 1 && <h4><Badge bg='success' size='md'>Material Issue Done!</Badge></h4> 
           
    }     
    {       list.isRequested  == 1 &&
                       <h4><Badge bg='success' size='md'>Request Done!</Badge></h4> 
           
    }
        
            
 </div>                   
  </Form>
</DialogContent>
<DialogActions>

</DialogActions>
</Dialog> 
 </>


  )
}

export default ProductDialog