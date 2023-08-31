import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { api } from '../../utilities/api/apiResource';
import swal from 'sweetalert';



const Form = styled.form`
display: flex;
flex-direction: column;
`

const ProductCheckDialog = ({open,close,isRequired,list}) => {
 
    const requiredItems= list.products?.filter((product)=>product.required_quantity > 0 )
 
    const handleIssue= (e)=>{

        e.preventDefault()
      
       api.get('materialIssue/save/'+list.id)
        .then((res)=>
       swal('Success',res.data.success,'success') )
        .then(()=>
        window.location.reload())
        .catch((err)=>
        console.error(err))
     
    }
   
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
                <div className="col-md-3">
                <span>InStock Qty</span>
                </div>
                <div className="col-md-3">
                <span>Approved Stock Qty</span>
                </div>
                <div className="col-md-2">
                <span>Required Qty</span>
                </div>

        </div>
    {
       list.products?.map((product,index)=>(
       
            <div className="row mb-1 mt-3 text-center fw-bold" key={index}>
                <div className="col-md-1">
                    <span>{++index}</span>
                </div>
                <div className="col-md-3">
                    <span>{product.name}</span>
                </div>
                <div className="col-md-3 ">
                    <span>{product.instock_quantity}</span>

                </div>
                <div className="col-md-3 ">
                    <span>{product.approved_quantity}</span>

                </div>
                <div className="col-md-2 ">
                    <span>{product.required_quantity}</span>

                </div>
                </div>
        ))
    }
             <div className="text-center mt-5">
    {
             isRequired == false  &&   <button className='btn btn-success' onClick={handleIssue}>Material Issue</button>
    }     
    {     
            isRequired == true  &&   <Link to={'/warehouse_purchase_request/'+list.id} state={{data:requiredItems,projects:[list.project_id , list.project_phase_id]}}>
                      <button className='btn btn-danger'>Purchase Request</button>
                      </Link>
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

export default ProductCheckDialog