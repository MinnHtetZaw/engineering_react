
import React,{useState,useEffect} from 'react';
import Nav from "../../../components/Sidebar/Nav";
import { useLocation  } from 'react-router-dom';
import { AiFillPlusSquare } from "react-icons/ai";
import { Link } from "react-router-dom";
import { api } from '../../../utilities/api/apiResource';
import swal from 'sweetalert';

const GRNData = () => {

   const [products,setProducts] = useState([]);
   const [grnno , setGRNno] = useState('');
   const [poData,setPO]=useState('');
   const [date , setDate] = useState('');
   const [existGRNData,setExistGRNData]=useState({});
   const [receive,setReceiveby]=useState('');
   const [deliver,setDeliverby]=useState('');
   const location = useLocation();
   const bom_sup_id = location.pathname.split('/')[2];
   const bom_no = location.pathname.split('/')[3];
    const bgcolor = {
        backgroundColor : '#5a8dee'
      };

const showCollapseGRN =(e,id)=>{
  e.preventDefault();
  if (document.getElementById("show_GRN" + id).getAttribute("value") === "0")
  {
    document.getElementById("showGRN" + id).hidden = false;
    document.getElementById("show_GRN" + id).setAttribute("value", "1");
  } else {
    document.getElementById("showGRN" + id).hidden = true;
    document.getElementById("show_GRN" + id).setAttribute("value", "0");
  }
  
}
const data={

  grnNo:grnno,
  grnDate:date,
  po_id:poData.id,
  po_qty:poData.po_total_qty,
  bom_supplier_id:poData.bom_supplier_id,
  receive:receive,
  deliver:deliver
}


const saveGRNData=async()=>{

  
  try{
    const res = await api.post("bomsupplierGRNData_save",data)
      swal('Good',res.data.success,'success')

    window.location.reload()
  }catch(err)
  {
    console.error(err);
  } 
 
}


useEffect(()=>{

    const PoData= async()=>{

        const res= await api.get("bomsupplierproduct/"+bom_sup_id)
        console.log(res.data);
        setProducts(res.data.bomproducts);
        setPO(res.data.view);
        setGRNno(res.data.grnNo)

        if(res.data.existGRNData != null){
          setExistGRNData(res.data.existGRNData)
        }
        else {
          setExistGRNData(null)
        }
        
    }
    
    PoData()
},[bom_sup_id])

  return (
    <div>
        <Nav/>
       
        <div className='row m-2'>
        <div className='col-12 ma-auto'>
        <div className='card border-0 p-3 shadow-sm rounded-lg'>
        <div className='card-body'>

        <h5 className="text-center fw-normal text-secondary">{bom_no}'s BOM Supplier Good Receive Notes Form</h5>

        <div className='row  mt-5'>
            <div className="col-6">
            <label className="form-label">GRN No</label>
            <input type="text" className="form-control" placeholder="Enter Request Number"  value={!existGRNData ? grnno : existGRNData.grn_no } disabled/>
            </div>
            <div className="col-6">
            <label className="form-label">Date</label>
            { 
            !existGRNData ?
              <input type="date" className="form-control" placeholder="Supplier Email" value={date||''}  onChange={(e)=>setDate(e.target.value)}/> :
              <input type="date" className="form-control" placeholder="Supplier Email" value={existGRNData.grnDate || ''} disabled/>
            }
           
            </div>
        </div>  
        <div className='row  mt-5'>
            <div className="col-6">
            <label  className="form-label">Received by</label>

            {
            !existGRNData ?
            <input type="text" className="form-control" placeholder="Enter Receiver Name"  value={receive || ''} onChange={(e)=>setReceiveby(e.target.value)}/>:
            <input type="text" className="form-control" placeholder="Enter Receiver Name"  value={existGRNData.recevied_by || ''} disabled/>
            }
           
            </div>
            <div className="col-6">
            <label className="form-label">Delivered by</label>
            {
            !existGRNData ?
            <input type="text" className="form-control" placeholder="Enter Deliver Name"  value={deliver || ''} onChange={(e)=>setDeliverby(e.target.value)}/>:
            <input type="text" className="form-control" placeholder="Enter Deliver Name"  value={existGRNData.delivered_by || ''} disabled/>
            }
            </div>
        </div>  
        {
          !existGRNData ?
          <div className="d-flex justify-content-center mt-5">
              <button className="btn btn-success" onClick={saveGRNData}>Save</button>
        </div>
        :false
        }
        

       {
        existGRNData ?
        <>
         <hr className='my-4'/>
        <div className='row mt-2'>
        <h6 className='text-primary col-10 font-weight-normal'>Product List</h6>
        </div>
       
                <div className="row m-2">
      <div className="col-12 ma-auto">
      <div className="my-2">

              <table className="table table-hover table-borderless">
                <thead style={bgcolor}>
                <tr className="fw-normal text-white text-center" style={{'fontSize':'16px'}}>
          
                <th>Name</th>                                   
                <th>Brand</th>
                <th>Order Qty</th>
                <th>Arrived Qty</th>
                <th>Action</th>
                </tr>
                </thead>
                <tbody>
               
                  <>
                
                     <tr className="fw-normal text-center">
                    
                     <td>{products.product?.product_name}</td>                                   
                     <td>{products.product?.brand.brand_name}</td>
                     <td>{existGRNData.po_total_qty}</td>
                     <td>{existGRNData.arrived_qty}
                   
                     </td>
                    <td>
                        <div className="row">
                        {
                          existGRNData.arrived_qty < existGRNData.po_total_qty ?
                          <Link to={"/bom_supplier_GRN_item/"+existGRNData.id+"/"+products.product_id} className="col-6">
                            <AiFillPlusSquare size="40px"/>
                          </Link>
                          :''
                        }
                           
                            
                            <div className="col-6"> 
                   
                              <button className="btn btn-primary"  onClick={(e) => showCollapseGRN (e, products.id)}
                                id={"show_GRN" + products.id}
                                value="0"> Related </button>
                            </div>

                        </div>
                    </td>
                
                     </tr>
                      <tr id={"showGRN" + products.id} hidden >
                      <td colSpan="10">
                        <div className="offset-1 col-10">
                          <table className="table table-striped">
                            <thead className="bg-secondary text-light">
                              <tr className="text-center">
                                <th className="bod-li">S/N</th>
                                <th className="bod-li">Size</th>
                                <th className="bod-li">Color</th>
                                <th className="bod-li">Dimension</th>
                                <th className="bod-li">Purchase Price</th>
                                <th className="bod-li">Quantity</th>
                              </tr>
                            </thead>
                  
                            <tbody>
                              {
                                 existGRNData.item &&(
                              existGRNData.item.map((existGRNItem,i)=>

                              <tr className="text-center" key={existGRNItem.id}>
                                <td className="bod-li">{existGRNItem?.serial_no}</td>
                                <td className="bod-li">{existGRNItem?.size}</td>
                                <td className="bod-li">{existGRNItem?.color}</td>
                                <td className="bod-li">{existGRNItem?.dimension}</td>
                                <td className="bod-li">{existGRNItem?.unit_purchase_price}</td>
                                <td className="bod-li">{existGRNItem?.stock_qty}</td>
                              </tr>
                                
                                )
                                 )
                              }
                              
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                    </> 
             
                </tbody>
              </table>
        
               </div>
            </div>
            </div>
        </>
        : false
       }
            
        </div>
        </div>
        </div>
        
        </div>
   
       
    </div>
  )
}
export default GRNData;
