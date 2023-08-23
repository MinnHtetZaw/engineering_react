import React,{useState,useEffect} from 'react'
import Nav from "../../../components/Sidebar/Nav"
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import UndoIcon from '@mui/icons-material/Undo';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useLocation,useNavigate  } from 'react-router-dom';
import EditReqSpec from '../../../components/ProjectManager/BOM/EditReqSpec'
import EditReqSpec1 from '../../../components/ProjectManager/BOM/EditReqSpec1'
import swal from 'sweetalert';
import { api } from '../../../utilities/api/apiResource';

const BOMRequestRegister = () => {
   const [products,setProducts] = useState([]);
   const [suppliers,setSuppliers] = useState([]);
   const [email, setEmail] = useState([]);
   const [reqno , setReqno] = useState('');
   const [title , setTitle] = useState('');
   const [description , setDescription] = useState('');
   const [supplierid , setSupplierid] = useState('');
   const [date , setDate] = useState('');
   const [viewspec , setViewSpec] = useState('');
   const [editid , setEditId] = useState('');
   const [reqspec , setReqSpec] = useState('');
   const [create, setCreate] = useState(false);
   const [create1, setCreate1] = useState(false);
   const location = useLocation();
   const navigate = useNavigate();
   const bom_id = location.pathname.split('/')[2];
   const bom_no = location.pathname.split('/')[3];
    const bgcolor = {
        backgroundColor : '#5a8dee'
      };

    const getProducts = async () =>{
    try{
        const res = await api.get("bomproduct/"+bom_id);
        
        setProducts(res.data.products);
        setSuppliers(res.data.suppliers);

    }catch(err){}

    };


    const allProducts = () =>{
        getProducts();
        setEmail('');
        document.getElementById('sup').selected =true;
    }

    useEffect(()=>{  

          getProducts(); 

    },[]);

    const supplierChange = (supid) => {
        const getSProducts = async () =>{
            try{
              const res = await api.get("bomproduct/"+bom_id+'/'+supid);
              setProducts(res.data.products);
              setEmail(res.data.email);
              setSupplierid(supid);
            }catch(err){}
          };
        
          getSProducts();
    };

    const cancelproduct = (pid) =>{
        setProducts(products.filter((el)=>el.id != pid));
    }

    const changeRequested = (val,id) => {
     
        products.map((el)=>el.id == id ? el.required_price = val : el.required_price)
     
    }

    const changeRequestedQty = (val,id) => {
   
        products.map((el)=>el.id == id ? el.required_qty =val : el.required_qty)
 
    }

    const savebomsupplier = () => {
    
            api.post('bomsupplier',{
        bom_id :  bom_id,
        supplier_id :  supplierid,
        req_no :  reqno,
        date : date,
        products : products,
        type : 3,
        }).then(function(response){
            swal("Successfully!", "Successfully Stored Bom Request.", "success");
            navigate(-1);
        })
    }

    const sendbomsupplier = () =>{
       api.post('bomsupplier',{
        bom_id :  bom_id,
        supplier_id :  supplierid,
        req_no :  reqno,
        date : date,
        products : products,
        title : title,
        body : description,
        type : 4,
        }).then(function(response){
            swal("Successfully!", "Successfully Stored Bom Request & Send Email.", "success");
            navigate(-1);
        })
    }

    const editdialog = (id,spec) =>{
        setEditId(id);
        setReqSpec(spec);
        setCreate(true);    
    }

    const viewdialog = (id) => {
        api.post('bomproductviewspec',{
            id : id,
            }).then(function(response){
                setViewSpec(response.data.data);
                setCreate1(true);
            })
    }

  return (
    <div>
        <Nav/>
        
        <div className='row m-2'>
        <div className='col-12 ma-auto'>
        <div className='card border-0 p-3 shadow-sm rounded-lg'>
        <div className='card-body'>

        <h5 className="text-center fw-normal text-secondary">{bom_no}'s Request Registration Form</h5>

        <div className='row  mt-5'>
            <div className="col-4">
            <label htmlFor="exampleFormControlInput1" className="form-label">Request No</label>
            <input type="text" className="form-control" placeholder="Enter Request Number" onChange={(e)=>setReqno(e.target.value)}/>
            </div>
            <div className="col-4">
            <label htmlFor="exampleFormControlInput1" className="form-label">Supplier</label>
            <select name="supplier" className='form-control' onChange={(e)=>supplierChange(e.target.value)}>
               <option id='sup'>Select Supplier</option>
               {suppliers.map(supplier=>(
                  <option  key={supplier.id} value={supplier.id}>
                     {supplier.name}
                  </option>
                 ))}
            </select>
            </div> 
            <div className="col-4 mt-4">
            <button className='btn btn-sm btn-secondary col-5 py-1'><span className='text-white'><InfoOutlinedIcon/>&nbsp;Detail</span></button>
            <button className='btn btn-sm btn-info col-5 py-1 mx-3'><span className='text-white'><VisibilityIcon/>&nbsp;Brand</span></button>
            </div> 
        </div>  
        <div className='row  my-4'>
            <div className="col-4">
            <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Supplier Email" value={email} disabled/>
            </div>
            <div className="col-4">
            <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
            <input type="text" className="form-control" placeholder="Enter Title"/>
            </div> 
            <div className="col-4">
            <label htmlFor="exampleFormControlInput1" className="form-label">Tendative Reply Date</label>
            <input type="date" className="form-control"  placeholder="Enter Date" onChange={(e)=>setDate(e.target.value)}/>
            </div> 
        </div>  
        <div className='row  my-4'>
            <div className="offset-1 col-10  text-center">
            <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
            <textarea name="description"  cols="25" rows="4" className='form-control'></textarea>
            </div>    
        </div>
        <hr className='my-4'/>
        <div className='row mt-2'>
        <h6 className='text-primary col-10 font-weight-normal'>Product List</h6>
        <button className='btn btn-sm btn-warning col-2 py-1' onClick={allProducts}><span className='text-white'><UndoIcon/>&nbsp;All Products</span></button>
        </div>
       
                <div className="row m-2">
      <div className="col-12 ma-auto">
      <div className="my-2">

              <table className="table table-hover table-borderless">
                <thead style={bgcolor}>
                <tr className="fw-normal text-white text-center" style={{'fontSize':'16px'}}>
                <th>No</th>
                <th>Name</th>                                   
                <th>Brand</th>
                <th>Required Qty</th>
                <th>Requested Qty</th>
                <th>Required Price</th>
                <th>Required Specs</th>
                <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product,index)=>(
                     <tr className="fw-normal text-center" key={index}>
                     <td>{++index}</td>
                     <td>{product.product?.product_name}</td>                                   
                     <td>{product.product?.brand?.brand_name}</td>
                     <td>{product.required_qty}</td>
                     <td><input type="text" placeholder={product.required_qty} className='border border-solid border-info' onChange={(e)=>changeRequestedQty(e.target.value,product.id)}/></td>
                     <td><input type="text" placeholder='0' className='border border-solid border-info' onChange={(e)=>changeRequested(e.target.value,product.id)}/></td>
                     <td>
                        <div className='row'>
    
                        <button className="px-1 rounded offset-3" style={{backgroundColor:'#5a8dee',maxHeight:'30px',maxWidth:'30px'}} onClick={()=>viewdialog(product.id)}><VisibilityIcon style={{fontSize:'medium',color:'white'}}/></button>
                        <button className="px-1 rounded bg-warning mx-2" style={{maxHeight:'30px',maxWidth:'30px'}} onClick={()=>editdialog(product.id,product.required_spec)}><EditIcon style={{fontSize:'medium',color:'white'}}/></button>
                        
                        </div>
                        
                     </td>
                     <td><button onClick={()=>cancelproduct(product.id)}><CancelIcon/></button></td>
                     </tr>
                ))}
                </tbody>
              </table>
        
              <button className='btn btn-sm btn-success offset-4 my-2' onClick={savebomsupplier}><span className='tex-white'><SaveIcon/>&nbsp;&nbsp;Save</span></button>
              <button className='btn btn-sm btn-primary mx-2 my-2'><span className='text-white' onClick={sendbomsupplier}><SendIcon/>&nbsp;&nbsp;Send Email</span></button>
               </div>
            </div>
            </div>
        </div>
        </div>
        </div>
        </div>
        <EditReqSpec open={create} close={()=>setCreate(false)} spec={reqspec} id={editid} type={1}/>
        <EditReqSpec1 open={create1} close={()=>setCreate1(false)} spec={viewspec} id={editid}/>
    </div>
  )
}

export default BOMRequestRegister