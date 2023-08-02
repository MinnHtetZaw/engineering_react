import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { api } from '../../api/apiResource';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus } from '../Icons';


const Form = styled.form`
display: flex;
flex-direction: column;
`

const ProductlistDialog = ({open,close,products,id}) => {
    
    const nav = useNavigate()

    
    const Approve =(e)=>{
       e.preventDefault()
       api.post('request_material_status',{
           request_id:id,
           isApproved : 1
         })
       
         .then(()=>
         swal('Approve','Request is Approved Successfully','success'))
        .then(()=>
        nav('/request_material_list'))
         

       }
     
    const Decline=(e)=>{
       e.preventDefault()
        
       api.post('request_material_status',{
           request_id:id,
           isApproved : 2
         })
         .then(()=>
         swal('Decline','Request is Declinced Successfully','success'))
         
         .then(()=> 
         nav('/request_material_list'))
      
       
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
                <div className="col-md-4">
                <span>Product Name</span>
                </div>
                <div className="col-md-4">
                <span>Request Stock Qty</span>
                </div><div className="col-md-3">
                <span>Approve Stock Qty?</span>
                </div>
        </div>
    {
        products.map((product,index)=>(
       
            <div className="row mb-1 mt-3 text-center fw-bold" key={index}>
                <div className="col-md-1">
                    <span>{++index}</span>
                </div>
                <div className="col-md-4">
                    <span>{product.name}</span>
                </div>
                <div className="col-md-4">
                    <span>{product.requested_quantity}</span>
                </div>
                <div className="col-md-3 ">
                {/* <Minus className='me-1' fontSize='small' color="primary" onClick={()=>{ return product.approved_quantity--}}/> */}
                              <span>{product.approved_quantity}</span>
                {/* <Plus className='ms-1' fontSize='small' color="primary" onClick={()=>PlusQty(index)} /> */}
                    
                    
                </div>
                </div>
    
        ))
    }

             <div className="text-end mt-5">
 
          <button className='btn btn-success me-2' onClick={Approve}>Approve</button>
           <button className='btn btn-danger' onClick={Decline}>Decline</button>
  
 
 </div>                   
  </Form>
</DialogContent>
<DialogActions>

</DialogActions>
</Dialog> 
 </>


  )
}

export default ProductlistDialog