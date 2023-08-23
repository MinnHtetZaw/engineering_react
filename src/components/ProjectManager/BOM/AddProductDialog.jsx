import React,{useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { useDispatch,useSelector } from 'react-redux';
import { addProduct,changeStatus } from '../../../utilities/redux/bomRedux';
import { api } from '../../../utilities/api/apiResource';

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const AddProductDialog = (props) => {
    const [suppliers,setSuppliers] = useState([]);
    const [show,setShow] = useState(false);
    const [supplierid, setSupplierid] = useState('');
    const [reqqty, setReqQty] = useState('');
    const [reqspec, setReqSpec] = useState('');
    const dispatch = useDispatch();
    const isshow = useSelector(state=>state.bom.isShow);
   

    useEffect(()=>{
      const getSuppliers = async () =>{
        try{
          const res = await api.get("supplier");
          setSuppliers(res.data.suppliers);
        }catch(err){}
      }
      getSuppliers()

    },[]);

 
    const showsup = (val) =>{     
        if(val == 0){
            setShow(true);
        }else{
            setShow(false);
        }
    }

    const addproduct = (id) =>{
       dispatch(addProduct({product_id:id,supplier_id:supplierid,req_qty:reqqty,req_spec:reqspec}));
       setShow(false);
       console.log('fineee');
       dispatch(changeStatus());
    }

  return (
    <div>
      {
        isshow  ?  <Dialog open={props.open} onClose={props.close} id='showdialog'>
        <DialogTitle  className='text-center'><b>Add Product</b></DialogTitle>
        <DialogContent  width='1500px'>
          <Form>
          <div className='row mt-3'>
                    <div className='offset-3 col-3'>
                    <input type="radio" name="carry"  value='1' onClick={(e)=>showsup(e.target.value)}/>&nbsp;&nbsp;&nbsp;Instock
                    </div>
                    <div className='col-6'>
                    <input type="radio" name="carry" value='0' onClick={(e)=>showsup(e.target.value)}/>&nbsp;&nbsp;&nbsp;Order  
                </div>
            </div>
            {
                show ? 
                <div className='col-12'>
                <div className="form-group  mt-3">
                        <label>Supplier</label>

                <div className="form-group">
                <select className='form-control' onChange={(e)=>setSupplierid(e.target.value)}>
                  <option hidden>
                      Choose Supplier
                  </option>
                  {suppliers.map(supplier=>(
                  <option  key={supplier.id} value={supplier.id}>
                     {supplier.name}
                  </option>
                 ))}
                </select>
                </div>
                    
                </div>
                </div> : ''
            }   
          <div className='row'>
                <div className='col-6'>
                <div className="form-group  mt-4">
                        <label>Required Qantity</label>

                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Enter Quantity" onChange={(e)=>setReqQty(e.target.value)}/>
                </div>
                    
                </div>
                </div>
                <div className='col-6'>
                <div className="form-group  mt-4">
                    <label>Required Specification</label>

                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Enter Specification" onChange={(e)=>setReqSpec(e.target.value)}/>
                </div>
            </div>	
                </div>
            </div>
                      			     
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
          <Button onClick={()=>addproduct(props.productid)}>Save</Button>
        </DialogActions>
      </Dialog> : ''
      }      
    </div>
  )
}

export default AddProductDialog