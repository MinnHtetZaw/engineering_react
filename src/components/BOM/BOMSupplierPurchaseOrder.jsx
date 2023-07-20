import React,{useState,useEffect} from 'react';
import Nav from "../Sidebar/Nav";
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useLocation,useNavigate  } from 'react-router-dom';
import EditReqSpec from './EditReqSpec';
import EditReqSpec1 from './EditReqSpec1';
import swal from 'sweetalert';
import { api } from '../../api/apiResource';


const BOMSupplierPurchaseOrder = () => {
   const [products,setProducts] = useState([]);
   const [bomproduct,setBomProduct]=useState('');
   const [suppliername,setSupplierName] = useState('');
   const [email, setEmail] = useState([]);
   const [pono , setPono] = useState('');

   const [date , setDate] = useState('');
   const [file , setFile] = useState('');
   const [viewspec , setViewSpec] = useState('');
   const [editid , setEditId] = useState('');
   const [reqspec , setReqSpec] = useState('');
   const [title , setTitle] = useState('');
   const [description , setDescription] = useState('');
   const [create, setCreate] = useState(false);
   const [create1, setCreate1] = useState(false);
   const location = useLocation();
   const navigate = useNavigate();
 

   const bom_sup_id = location.pathname.split('/')[2];
   const bom_no = location.pathname.split('/')[3];
    const bgcolor = {
        backgroundColor : '#5a8dee'
      };

    const getProducts = async () =>{
    try{
        const res = await api.get("bomsupplierproduct/"+bom_sup_id);
        

        setBomProduct(res.data.bomproducts)
        setProducts(res.data.products);
        setSupplierName(res.data.suppliername);
        setEmail(res.data.supplieremail);
    }catch(err){}
    };

    useEffect(()=>{
        getProducts();
    },[]);


    const cancelproduct = (pid) =>{
        setProducts(products.filter((el)=>el.id != pid));
    }
    
    const changeRequested = (val,id) => {
      api.post('bomproductid',{
        id :  id,
        price : val,
        type : 2,
        }).then(function(response){
            console.log('success');
        })
    products.map((el)=>el.id == id ? el.requested_price = val : el.requested_price)
    }

    const changeRequestedQty = (val,id) => {
    api.post('bomproductqty',{
            id :  id,
            qty : val,
            type: 2,
            }).then(function(response){
                console.log('success');
            })
     products.map((el)=>el.id == id ? el.requested_qty =val : el.requested_qty)
    }

    const savepo = () => {
        
      api.post('send/request_email',{
            title : title,
            body : description,
            type : 1,
            bom_sup_id : bom_sup_id,
            date : date,
            file : file,
            pono : pono,
            edit : 1,
            },
            {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

       api.post('test',{
            test : products,
            bsi : bom_sup_id,
            pn : pono,
            title : title,
            body : description,
            type : 1,
            edit : 1,
            }).then(function(response){
                swal("Successfully!", "Successfully Stored Purchaase Order.", "success");
                navigate(-1);
            })
    }

    const editdialog = (id,spec) =>{
        setEditId(id);
        setReqSpec(spec);
        setCreate(true);    
    }

    const viewdialog = (id) => {
         api.post('bomsupplierproductviewspec',{
            id : id,
            }).then(function(response){
                setViewSpec(response.data.data);
                setCreate1(true);
            })
    }

    const sendmailpo = () =>{
       
        api.post('send/request_email',{
            title : title,
            body : description,
            type : 2,
            bom_sup_id : bom_sup_id,
            date : date,
            file : file,
            pono : pono,
            edit : 1,
            },
            {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function(response){
                console.log('success');
            })

       api.post('test',{
            test : products,
            bsi : bom_sup_id,
            pn : pono,
            title : title,
            body : description,
            type : 2,
            edit : 1,
            }).then(function(response){
                swal("Successfully!", "Successfully Stored Purchaase Order.", "success");
                navigate(-1);
            })
    }
    
  return (
    <div>
        <Nav/>
        
        <div className='row m-2'>
        <div className='col-12 ma-auto'>
        <div className='card border-0 p-3 shadow-sm rounded-lg'>
        <div className='card-body'>

        <h5 className="text-center fw-normal text-secondary">{bom_no}'s BOM Supplier Purchase Order Form</h5>

        <div className='row  mt-5'>
            <div className="col-6">
            <label for="exampleFormControlInput1" className="form-label">Supplier PO No</label>
            <input type="text" className="form-control" placeholder="Enter Request Number" onChange={(e)=>setPono(e.target.value)}/>
            </div>
            <div className="col-6">
            <label for="exampleFormControlInput1" className="form-label">Supplier Name</label>
            <input type="text" className="form-control"  value={suppliername} readOnly/>
            </div> 
        </div>  
        <div className='row  my-4'>
        <div className="col-6">
            <label for="exampleFormControlInput1" className="form-label">Title</label>
            <input type="text" className="form-control" placeholder="Enter Title" onChange={(e)=>setTitle(e.target.value)}/>
            </div> 

            <div className="col-6">
            <label for="exampleFormControlInput1" className="form-label">Supplier Email</label>
            <input type="email" className="form-control" placeholder="Supplier Email"   value={email} readyOnly/>
            </div>
             
        </div>
        <div className='row  my-4'>
        <div className="col-6">
            <label for="exampleFormControlInput1" className="form-label">Attach File</label>
            <input type="file" className="form-control" placeholder="Enter Title" onChange={(e)=>setFile(e.target.files[0])}/>
            </div> 

            <div className="col-6">
            <label for="exampleFormControlInput1" className="form-label">Date</label>
            <input type="date" className="form-control" placeholder="Supplier Email"   onChange={(e)=>setDate(e.target.value)}/>
            </div>
             
        </div>    
        <div className='row  my-4'>
            <div className="offset-1 col-10  text-center">
            <label for="exampleFormControlInput1" className="form-label">Description</label>
            <textarea name="description"  cols="25" rows="4" className='form-control' onChange={(e)=>setDescription(e.target.value)}></textarea>
            </div>    
        </div>
        <hr className='my-4'/>
        <div className='row mt-2'>
        <h6 className='text-primary col-10 font-weight-normal'>Product List</h6>
        </div>
       
                <div className="row m-2">
      <div className="col-12 ma-auto">
      <div className="my-2">

              <table className="table table-hover table-borderless">
                <thead style={bgcolor}>
                <tr className="fw-normal text-white text-center" style={{'font-size':'16px'}}>
                <th>No</th>
                <th>Name</th>                                   
                <th>Brand</th>
                <th>Required Qty</th>
                <th>Order Qty</th>
                <th>Order Price</th>
                <th>Required Specs</th>
                <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product,index)=>(
              
                     <tr className="fw-normal text-center">
                   
                     <td>{++index}</td>
                     <td>{product.productdetail.product_name}</td>                                   
                     <td>{product.productdetail.brand.brand_name}</td>
                     <td>{bomproduct.required_qty}</td>
                     <td><input type="text" placeholder={product.requested_qty} className='border border-solid border-info' onChange={(e)=>changeRequestedQty(e.target.value,product.id)}/></td>
                     <td><input type="text" placeholder={product.requested_price} className='border border-solid border-info' onChange={(e)=>changeRequested(e.target.value,product.id)}/></td>
                     <td>
                        <div className='row'>
                        <button className="px-1 rounded offset-3" style={{backgroundColor:'#5a8dee',maxHeight:'30px',maxWidth:'30px'}} onClick={()=>viewdialog(product.id)}><VisibilityIcon style={{fontSize:'medium',color:'white'}}/></button>
                        <button className="px-1 rounded bg-warning mx-2" style={{maxHeight:'30px',maxWidth:'30px'}} onClick={()=>editdialog(product.id,product.requested_specs)}><EditIcon style={{fontSize:'medium',color:'white'}}/></button>
                        
                        </div>
                        
                     </td>
                     <td><button onClick={()=>cancelproduct(product.id)}><CancelIcon/></button></td>
                     </tr>
                ))}
                </tbody>
              </table>
        
              <button className='btn btn-sm btn-success offset-4 my-2'><span className='tex-white' onClick={savepo}><SaveIcon/>&nbsp;&nbsp;Save</span></button>
              <button className='btn btn-sm btn-primary mx-2 my-2'><span className='text-white' onClick={sendmailpo}><SendIcon/>&nbsp;&nbsp;Send Email</span></button>
               </div>
            </div>
            </div>
        </div>
        </div>
        </div>
        </div>
        <EditReqSpec open={create} close={()=>setCreate(false)} spec={reqspec} id={editid} type={2}/>
        <EditReqSpec1 open={create1} close={()=>setCreate1(false)} spec={viewspec} id={editid}/>
    </div>
  )
}

export default BOMSupplierPurchaseOrder