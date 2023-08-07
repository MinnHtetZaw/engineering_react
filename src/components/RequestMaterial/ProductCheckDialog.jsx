import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../api/apiResource';
import swal from 'sweetalert';
import { Badge } from 'react-bootstrap';


const Form = styled.form`
display: flex;
flex-direction: column;
`

const ProductCheckDialog = ({open,close,isRequired,list}) => {

    
    const nav = useNavigate()

    const requiredItems= list.products?.filter((product)=>product.required_quantity > 0 )
 
    const handleIssue= async(e)=>{

        e.preventDefault()
      
        const res = await api.get('materialIssue/save/'+list.id)

        swal('Success',res.data.succes,'success').then(()=> nav('/request_material_list'))
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
        
        isRequired == false ?  
             list.isIssued   == 1 ? <h4><Badge bg='success' size='md'>Material Issue Done!</Badge></h4> :
                                   <button className='btn btn-success' onClick={handleIssue}>Material Issue</button>

                      :
            list.isRequested   == 1 ?    
                       <h4><Badge bg='success' size='md'>Request Done!</Badge></h4> 
                      :
                      <Link to={'/warehouse_purchase_request/'+list.id} state={{data:requiredItems,projects:[list.project_id , list.project_phase_id]}}>
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