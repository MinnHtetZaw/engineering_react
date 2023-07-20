import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import styled from 'styled-components';
import { AddIcon } from '../Icons';
import { api } from '../../api/apiResource';


const Form = styled.form`
    min-width: 450px;
    display: flex;
    flex-direction: column;
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    color: #ffffff;
    padding: 5px 20px;
`
const DialogTitle = styled.div`
    padding: 8px 0px;
    background-color: #79a6fa;
`

const ProductSupplier = (props) => { 
 
  const [add, handleAdd] = useState();
 
  const [initialPurchaseAmount,setInitialPurchaseAmount]=useState('');
  const [initialPurchaseQty,setInitialPurchaseQty]=useState('');
  const [deliveryLeadTime,setDeliveryLeadTime]=useState('');
  const [lastPurchaseDate,setLastPurchaseDate]=useState('');
  const [minOrderQtyPrice,setMinOrderQtyPrice]=useState('');
  const [minOrderQty,setMinOrderQty]=useState('');
  const [unitPurchasePrice,setUnitPurchasePrice]=useState('');
  const [incoterms,getIncoterms]=useState([]);
  const [incotermData,selectedIncoterm]=useState('');
  const [currencys,getCurrencys]=useState([]);
  const [currencyData,setCurrencyData]=useState('');
  const [leadTimeType,selectedLeadTimeType]=useState('');
  const [productid,setProductid]=useState('');
  const [discountTab,setDiscountTab]=useState();
  const [creditTab,setCreditTab]=useState();
  const [discountAmount,setDiscountAmount]=useState('');
  const [discountType,setDiscountType]=useState('');
  const [discountCondition,setDiscountCondition]=useState('');
  const [discountConditionType,setDiscountConditionType]=useState('');
  const [creditTerm,setCreditTerm]=useState('');
  const [creditTermType,setCreditTermType]=useState('');
  const [creditCondition,setCreditCondition]=useState('');
  const [creditConditionType,setCreditConditionType]=useState('');
  const [creditAmount,setCreditAmount]=useState('');
  // const [open,setOpen]=useState();

  const addForm = (e) => {
    e.preventDefault();
 
    if(add === 'discount'){
      setDiscountTab(true)
    }
    if(add === 'credit'){
      setCreditTab(true)
      
    }
    
  }
  
   
  const data = {
    unitPurchasePrice: unitPurchasePrice,
    currencyData: currencyData,
    incotermData: incotermData,
    lastPurchaseDate: lastPurchaseDate,
    minOrderQtyPrice: minOrderQtyPrice,
    minOrderQty: minOrderQty,
    initialPurchaseQty: initialPurchaseQty,
    initialPurchaseAmount: initialPurchaseAmount,
    deliveryLeadTime: deliveryLeadTime,
    leadTimeType: leadTimeType,
    supplier_id: props.supplier.value,
    primary_flag : 2,
    product_id: productid,
    discountStatus : discountTab,
    discountAmount : discountAmount,
    discountType   : discountType,
    discountCondition : discountCondition,
    discountConditionType : discountConditionType,
    creditStatus : creditTab,
    creditTerm : creditTerm,
    creditTermType : creditTermType,
    creditCondition : creditCondition,
    creditConditionType : creditConditionType,
    creditAmount : creditAmount
  }

  const saveSupplierData =async ()=>{
    
    try{
     await api.post("supplier_data",data)
      
       .then(
      props.closeSecondary()
       )
    }
      catch(err){}
     
 
  }

  useEffect(() => {
    const getIncoterm = async () => {
      try{
          await api.get("incoterm")
          .then((res) => {
              getIncoterms(res.data.data);
             
          })
      }catch(err){}
  }
  const getCurrency = async () => {
    try{
      await api.get("currency")
      .then((res) => {
          getCurrencys(res.data.currency);
          
      })
  }catch(err){}
  }

  const getProductId = async()=>{
    try{
      await api.get("newProductid")
      .then((res)=>{
      
        setProductid(res.data);
      })
    }catch(err){}
  }
  
  
  getProductId();
  getCurrency();
  getIncoterm();
    },[]);
 


  
  
  return (

      <div>
    
    <Dialog open={props.openSecondary} onClose={props.closeSecondary}>
      <DialogTitle className='text-center'><Title>{props.supplier.label} Secondary Supplier Dialog</Title></DialogTitle>
      <DialogContent>
        <Form>
          <form>
             
            <div className='row'>
              <div className='col-6 mt-1'>
                    <select className="form-select" value={add} onChange={(e)=>handleAdd(e.target.value)}>
                      <option selected>Choose To Add</option>
                      <option value="discount">Discount</option>
                      <option value="credit">Credit</option>
                    </select>
              </div>
              <div className='col-6 mt-1'>
                <button className='btn btn-m btn-primary px-3' onClick={addForm}><AddIcon/> Add</button>
              </div>
    
      
            </div>
        </form>
        
   
          <hr />
          
          <div className='row'>
            <div className='col-6'>
                <label for="exampleFormControlInput1" className="form-label">Unit Purchase Price</label>
                <input type="text" className="form-control" name="contact_team" placeholder="" 
                value={unitPurchasePrice}
                onChange={(e) => setUnitPurchasePrice(e.target.value)} />
            </div>
            <div className='col-6'>
                <label for="exampleFormControlInput1" className="form-label">Currency Type</label>
                <select className="form-select" aria-label="" name="" value={currencyData} onChange={(e)=>setCurrencyData(e.target.value)}>
                  <option hidden>Choose Currency Type</option>
                  {
                    currencys.map((currency)=>(
                      <option value={currency.id}>{currency.name} - {currency.exchange_rate} Kyats</option>
                    ))
                  }
                </select>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-6'>
                <label for="exampleFormControlInput1" className="form-label">Incoterm Type</label>
                
                  
                    <select className="form-select" aria-label="" name="" value={incotermData} onChange={(e)=>selectedIncoterm(e.target.value)}>
                    <option hidden>Choose Incoterm Type</option>
                    {incoterms.map((incoterm)=>(
                    <option value={incoterm.id}>{incoterm.incoterm_name}</option>
                  
                  ))
                }
                  </select>
               
            </div>
            <div className='col-6'>
                <label for="exampleFormControlTextarea1" className="form-label">Last Purchase Date</label>
                <input type="date" className="form-control" placeholder=""
                value={lastPurchaseDate}
                onChange={(e) => setLastPurchaseDate(e.target.value)} />
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-6'>
                <label for="exampleFormControlInput1" className="form-label">Min Order Quantity</label>
                <input type="text" className="form-control" name="contact_team" placeholder=""
                 value={minOrderQty}
                 onChange={(e) => setMinOrderQty(e.target.value)} />
            </div>
            <div className='col-6'>
                <label for="exampleFormControlInput1" className="form-label">Min Order Quantity Price</label>
                <input type="text" className="form-control" name="contact_team" placeholder=""  
                value={minOrderQtyPrice}
                onChange={(e) => setMinOrderQtyPrice(e.target.value)}/>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-6'>
                <label for="exampleFormControlInput1" className="form-label">Initial Purchase Amount</label>
                <input type="text" className="form-control" name="contact_team" placeholder=""
                value={initialPurchaseAmount}
                onChange={(e) => setInitialPurchaseAmount(e.target.value)} />
            </div>
            <div className='col-6'>
                <label for="exampleFormControlInput1" className="form-label">Initial Purchase Quantity</label>
                <input type="text" className="form-control" name="contact_team" placeholder="" 
                value={initialPurchaseQty}
                onChange={(e) => setInitialPurchaseQty(e.target.value)}/>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col-6'>
                <label for="exampleFormControlInput1" className="form-label">Delivery Leadtime</label>
                <input type="text" className="form-control" name="contact_team" placeholder="" 
                value={deliveryLeadTime}
                onChange={(e) => setDeliveryLeadTime(e.target.value)}/>
            </div>
            <div className='col-6'>
                <label for="exampleFormControlInput1" className="form-label">Leadtime Type</label>
                <select className="form-select" aria-label="" name="" value={leadTimeType} onChange={(e)=>selectedLeadTimeType(e.target.value)}>
                  <option hidden>Choose Leadtime Type</option>
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                </select>
            </div>
          </div>
          <br/>
          
     { discountTab ? 
     
        <div>
      
         
          <hr />
         
       <div className='row mt-4'>
       <div className='col-6'>
           <label for="exampleFormControlInput1" className="form-label">Discount Amount</label>
           <input type="text" className="form-control" name="contact_team" placeholder="" 
           value={discountAmount}
           onChange={(e)=>setDiscountAmount(e.target.value)}/>
       </div>
       <div className='col-6'>
           <label for="exampleFormControlInput1" className="form-label">Discount Type</label>
           <select className="form-select" aria-label="" name=""
           value={discountType}
           onChange={(e)=>setDiscountType(e.target.value)}>
             <option hidden>Choose Discount Type</option>
             <option value="1">No Discount</option>
             <option value="2">Percentage</option>
             <option value="3">Amount</option>
           </select>
       </div>
     </div>
       <div className='row mt-4'>
       <div className='col-6'>
           <label for="exampleFormControlInput1" className="form-label">Discount Condition</label>
           <input type="text" className="form-control" name="contact_team" placeholder="" value={discountCondition}
           onChange={(e)=>setDiscountCondition(e.target.value)}/>
       </div>
       <div className='col-6'>
           <label for="exampleFormControlInput1" className="form-label">Discount Condition Type</label>
           <select className="form-select" aria-label="" name=""
           value={discountConditionType}
           onChange={(e)=>setDiscountConditionType(e.target.value)}>
             <option hidden>Choose Discount Condition Type</option>
             <option value="1">Purchase Quantity</option>
             <option value="2">Purchase Amount</option>
             <option value="3">Purchase Time</option>
           </select>
       </div>
     </div>
     <br />
     </div>
     
     : ''}

        
          { creditTab ? 

             
            <div>
          
          
          <hr />
       

              <div className='row mt-4'>
            <div className='col-6'>
                <label for="exampleFormControlInput1" className="form-label">Credit Term</label>
                <input type="text" className="form-control" name="contact_team" placeholder="" 
                value={creditTerm}
                onChange={(e)=>setCreditTerm(e.target.value)} />
            </div>
            <div className='col-6'>
                <label for="exampleFormControlInput1" className="form-label">Credit Term Type</label>
                <select className="form-select" aria-label="" name=""
                value={creditTermType}
                onChange={(e)=>setCreditTermType(e.target.value)}>

                  <option hidden>Choose Credit Term Type</option>
                  <option value="0">No Credit</option>
                  <option value="1">Day</option>
                  <option value="2">Week</option>
                  <option value="3">Month</option>
                </select>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-6'>
                <label for="exampleFormControlInput1" className="form-label">Credit Condition </label>
                <input type="text" className="form-control" name="contact_team" placeholder=""
                value={creditCondition}
                onChange={(e)=>setCreditCondition(e.target.value)} />
            </div>
            <div className='col-6'>
                <label for="exampleFormControlInput1" className="form-label">Credit Condition Type</label>
                <select className="form-select" aria-label="" name=""
                value={creditConditionType}
                onChange={(e)=>setCreditConditionType(e.target.value)}>
                  <option hidden>Choose Credit Condition Type</option>
                  <option value="1">Purchase Quantity</option>
                  <option value="2">Purchase Amount</option>
                  <option value="3">Purchase Time</option>
                </select>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-6'>
                <label for="exampleFormControlInput1" className="form-label">Credit Amount</label>
                <input type="text" className="form-control" name="contact_team" placeholder="" 
                value={creditAmount}
                onChange={(e)=>setCreditAmount(e.target.value)}/>
            </div>
           
          </div>
            </div>
          : '' }
          

        </Form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeSecondary} style={{backgroundColor: '#79a6fa', color: 'white'}}>Cancel</Button>
        <Button onClick={saveSupplierData} style={{backgroundColor: '#79a6fa', color: 'white'}}>Save</Button>
      </DialogActions>
    </Dialog>
    {/* kophyo */}
  </div>
)
}

export default ProductSupplier;