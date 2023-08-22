import React,{useState,useEffect} from 'react'
import Nav from "../../components/Sidebar/Nav"
import { AiFillPlusSquare,AiFillCloseSquare } from "react-icons/ai";
import AddProductDialog from '../../components/BOM/AddProductDialog'
import { useSelector,useDispatch } from 'react-redux';
import { removeProduct,resetProduct,changeStatus} from '../../utilities/redux/bomRedux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { api } from '../../utilities/api/apiResource';


const BOMRegister = () => {
    const [projects,setProjects] = useState([]);
    const [products,setProducts] = useState([]);
    const [allproducts,setAllProducts] = useState([]);
    const [categories,setCategories] = useState([]);
    const [subcategories,setSubCategories] = useState([]);
    const [brands,setBrands] = useState([]);
    const [departments,setDepartments] = useState([]);
    const [depid,setDepId] = useState('');
    const [catid,setCatId] = useState('');
    const [subcatid,setSubcatId] = useState('');
    const [create ,setCreate] = useState(false);
    const [productid, setProductid] = useState('');
    const [projectid, setProjectId] = useState('');
    const [bomno, setBomno] = useState('');
    const [date, setDate] = useState('');
    let tot_qty = 0;
    const bom_products = useSelector(state=>state.bom.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bgcolor = {
        backgroundColor : '#5a8dee'
    };
   
    useEffect(()=>{
        const getProjects = async () =>{
            try{
              const res = await api.get("project");
          
              setProjects(res.data.project);
            }catch(err){}
          };
          const getProducts = async () =>{
            try{

              const res = await api.get("product")
              setAllProducts(res.data.productData)
              
            }catch(err){}
          };

          const getDepartment=async()=>{
            const res = await api.get('department')
            setDepartments(res.data);
          }

          getDepartment()
          getProjects();
          getProducts();
      
    },[])

    const addproduct = (id) =>{
        setCreate(true);
        setProductid(id);
        dispatch(changeStatus());
    }

    const changeDepartment= (departmentid) =>{
      api.post('proj_dep_fil',{
        department_id :  departmentid,
  }).then(function(response){
      setDepId(departmentid);
   
      setCategories(response.data.categories);
  })
    }

  const changeCategory = (id) =>{
      api.post('proj_cat_fil',{
        department_id :  depid,
        category_id :  id,
  }).then(function(response){
    console.log(response.data.subcategories);
      setCatId(id);
   
      setSubCategories(response.data.subcategories)
     
  })
    }

    const changeSubCategory = (id) =>{
      api.post('proj_subcat_fil',{
        department_id :  depid,
        category_id :  catid,
        subcategory_id : id,
  }).then(function(response){
      setSubcatId(id);
      setBrands(response.data.brands);
    
  })
    }

  const changeBrand = (id) =>{
    api.post('proj_brand_fil',{
        department_id :  depid,
        category_id :  catid,
        subcategory_id : subcatid,
        brand_id : id,
  }).then(function(response){
      console.log(response.data.products);
      setProducts(response.data.products);
  })
    }
  
  const closeproduct = (id) => {
    dispatch(removeProduct({id:id}));
  }

  const savebom = () => {
   api.post('bom',{
        project_id : projectid,
        bom_no : bomno,
        date : date,
        total_qty : tot_qty,
        products : bom_products,
  }).then(function(response){

      dispatch(resetProduct());
      navigate('/bom');
      swal("Successfully!", "Successfully Stored bill of materials form.", "success");
  })
  }

  return (
    <div>
        <Nav/>
        <h5 className="text-center mt-4 fw-normal text-secondary">Bill Of Material Register</h5>
        <div className='row  m-3'>
        <div className='col-6'>
            <div className='card border-0  shadow-sm rounded-lg' style={{"borderRadius": "50px 0px 50px 50px", "borderBottom": "5px solid red"}}>
                <div className='card-header' style={bgcolor}>
                <h6 className='text-white text-center font-weight-normal'>Bill Of Material (BOM)</h6>
                </div>
                <div className='card-body'>
                <div className='row  my-3'>
                <div className="col-6">
                <label htmlFor="exampleFormControlInput1" className="form-label">Sale Project</label>
                <select className="form-select" aria-label="Default select example" name="location" onChange={(e)=>setProjectId(e.target.value)}>
                <option hidden>Select RFQ Project</option>
                {projects.map(project=>(
                  <option  key={project.id} value={project.id}>
                     {project.name}
                  </option>
                 ))}
                </select>
                </div>
                <div className="col-6 mt-4">
                <button className='btn btn-sm btn-danger py-1'><span className='tex-white'>Detail</span></button>
                &nbsp;&nbsp;
                <button className='btn btn-sm btn-warning text-white py-1'>RFQ File</button>
                </div> 
                </div>
                <div className='row  my-3'>
                <div className="col-6">
                <label htmlFor="exampleFormControlInput1" className="form-label">BOM No</label>
                <input type="text" className="form-control" placeholder="Enter BOM Number" onChange={(e)=>setBomno(e.target.value)}/>
                </div>
                <div className="col-6">
                <label htmlFor="exampleFormControlInput1" className="form-label">Date</label>
                <input type="date" className="form-control"  placeholder="Enter Date" onChange={(e)=>setDate(e.target.value)}/>
                </div> 
                </div>     
                </div>
                <hr></hr>
                <h6 className='text-primary font-weight-normal mt-2'>Product List</h6>
                <div className="row m-2">
      <div className="col-12 ma-auto">
      <div className="my-2">

              <table className="table table-hover table-borderless">
                <thead style={bgcolor}>
                <tr className="fw-normal text-white text-center" style={{'fontSize':'12px'}}>
                <th>No</th>
                <th>Name</th>                                   
                <th>Brand</th>
                <th>Category</th>
                <th>Required Qty</th>
                <th>Required Specs</th>
                <th>Action</th>
                
                </tr>
                </thead>
                <tbody>
                {bom_products.map((aproduct,index)=>(
                  allproducts.map((pro,i)=>(
                    aproduct.product_id == pro.id ?
                  <tr className="text-center" style={{'fontSize':'13px'}}>
                  <td>{++index}</td>
                  <td>{pro.product_name}</td>
                  <td>{pro.brand?.brand_name}</td>
                  <td>{pro.category?.category_name}</td>
                  <td>{aproduct.req_qty}<input type='hidden' value={tot_qty += parseInt(aproduct.req_qty)}/></td>
                  <td>{aproduct.req_spec}</td>
                  <td><a onClick={()=>closeproduct(aproduct.product_id)}><AiFillCloseSquare size="25px"/></a></td>
                  </tr> : ''
                  ))
                
                 ))}
                </tbody>
              </table>
              <h6 className='text-primary font-weight-normal mt-2'>Total Quantity : <span>{tot_qty}</span></h6>
              <button className='btn btn-sm btn-success offset-10 mt-2 mb-2' onClick={()=>savebom()}><span className='tex-white'>Save</span></button>
               </div>
            </div>
            </div>
            </div>
        </div>
        <div className='col-6'>
        <div className='card border-0  shadow-sm rounded-lg' style={{"borderRadius": "50px 0px 50px 50px", "borderBottom": "5px solid red"}}>
                <div className='card-header' style={bgcolor}>
                <h6 className='text-white text-center font-weight-normal'>Inventory</h6>
                </div>
                <div className='card-body'>
                <div className='row  my-3'>
                <div className="col-6">
                <label htmlFor="exampleFormControlInput1" className="form-label">Department</label>
                <select className="form-select" aria-label="Default select example" name="location" onChange={(e)=>changeDepartment(e.target.value)}>
                <option hidden>Select Department</option>
               
                {departments.map(department=>(
                  <option  key={department.id} value={department.id}>
                     {department.name}
                  </option>
                 ))}
                 
                </select>
                </div>
                <div className="col-6">
                <label htmlFor="exampleFormControlInput1" className="form-label">Category</label>
                <select className="form-select" aria-label="Default select example" name="location" onChange={(e)=>changeCategory(e.target.value)} id='filter_cat'>
                <option hidden>Select Category</option>
                {categories.map(category=>(
                  <option  key={category.id} value={category.id}>
                     {category.category_name}
                  </option>
                 ))}
                </select>
                </div> 
                </div>  
                <div className='row  my-3'>
                <div className="col-6">
                <label htmlFor="exampleFormControlInput1" className="form-label">Subcategory</label>
                <select className="form-select" aria-label="Default select example" name="location" onChange={(e)=>changeSubCategory(e.target.value)}>
                <option hidden>Select Subcategory</option>
                {subcategories.map(subcategory=>(
                  <option  key={subcategory.id} value={subcategory.id}>
                     {subcategory.subcategory_name}
                  </option>
                 ))}
                </select>
                </div>
                <div className="col-6">
                <label htmlFor="exampleFormControlInput1" className="form-label">Brand</label>
                <select className="form-select" aria-label="Default select example" name="location" onChange={(e)=>changeBrand(e.target.value)}>
                <option hidden>Select Brand</option>
                {brands.map(brand=>(
                  <option  key={brand.id} value={brand.id}>
                     {brand.brand_name}
                  </option>
                 ))}
                </select>
                </div> 
                </div>
                <div className="row m-2">
      <div className="col-12 ma-auto">
      <div className="my-2">

              <table className="table table-hover table-borderless">
                <thead style={bgcolor}>
                <tr className="text-white text-center" style={{'fontSize':'12px'}}>
                <th>No</th>
                <th>Product Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Instock Qty</th>
                <th>Action</th>
                </tr>
                </thead>
                <tbody >
            
                  {products.map((product,index)=>(
                    <tr className="text-center" style={{'fontSize':'13px'}}>
                    <td>{++index}</td>
                    <td>{product.product_name}</td>
                    <td>{product.brand?.brand_name}</td>
                    <td>{product.category?.category_name}</td>
                    <td>{product.items_count}</td>
                    <td><a onClick={()=>addproduct(product.id)}><AiFillPlusSquare size="25px"/></a></td>
                    </tr>
                  ))}
                </tbody>
               
              </table>
               </div>
            </div>
            </div> 
                </div>
                
            </div>
        </div>
        </div>
        <AddProductDialog open={create} close={()=>setCreate(false)} productid={productid}/>
    </div>
  )
}

export default BOMRegister