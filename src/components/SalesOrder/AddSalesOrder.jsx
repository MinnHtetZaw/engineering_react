import React, { useEffect, useState } from 'react'
import Nav from '../Sidebar/Nav'
import { api } from '../../utilities/api/apiResource'
import AddSaleProduct from './AddSaleProduct'
import { Minus, Plus } from '../Icons'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'

const AddSalesOrder = () => {

    const [projects,setProjects] = useState([])
    const [phases,setPhases]= useState([])
    const [project_id,setProjectID]=useState('')
    const [phase_id,getPhase]=useState(0)
    const [date,setDeliveryDate]=useState('')
    const [products,setProducts]=useState([])
    const [selectedProducts,getSelectedProduct]=useState([])
    const nav = useNavigate()

  useEffect(()=>{
    getProject()
    getProducts()
  },[])  

 

  const getProject = async()=>{
    try{
        const res = await api.get('project')
        setProjects(res.data.project)

    }catch(error) 
    {
        console.log(error);
    }

}
const getProducts = async()=>{
    try{
        const res = await api.get('product_display')
        setProducts(res.data.products)
    }
    catch(error)
    {
        console.error();
    }
}

  const getProjectID =(id)=>{
    setProjectID(id)
    projects.map((el)=>el.id == id && setPhases(el.phases) )
  
  }

  const handleAddProduct =(id)=>{

        products.map((el)=>el.id === id && 

           getSelectedProduct( current=> {
           return [...current,{ 
                product_id: el.id,
                product_name: el.product_name,
                brand : el.brand.brand_name,
                category : el.category.category_name,
                subcategory : el.subcategory.subcategory_name,
                qty : 1 
              }]})
  )     
   
  }

 
  const saveSaleOrder =(e)=>{
    e.preventDefault()
    const data = {
      project_id : project_id,
      phase_id: phase_id,
      delivery_date : date,
      products : selectedProducts
     }
     
      api.post('sales_order_save',data)
      .then((res)=>
      swal("Successfully!",res.data.succes, "success")
      , nav('/sales_order_list')
      )
  }

  return (
<>
<Nav/>
<div className="row mt-3 mx-3">
  	<div className="col-6">

    <div className="card card-primary">
      <div className="card-header bg-primary text-center">
          <label className="card-title text-white">Sale Order Register</label>
      </div>
      <form onSubmit={saveSaleOrder}>
          <div className="card-body">
              <div className="form-group my-2">
                  <label>Project</label>
                  <select className="form-control" onChange={(e)=>getProjectID(e.target.value)}>
                    <option hidden>Choose Project</option>
                    {
                        projects.map((project,index)=>(
                            <option key={index} value={project.id}>{project.name} </option>
                        ))
                    }
                  </select>
              </div>
              <div className="form-group my-2">
                  <label>Phase</label>
                  <select className="form-control" onChange={(e)=>getPhase(e.target.value)} >
                  <option hidden>Choose Phase</option>

                    {
                        phases.map((phase,index)=>(
                            <option key={index} value={phase.id}>{phase.phase_name} </option>
                        ))
                    }
                  </select>
              </div>

              <div className="form-group my-2">
                  <label>Delivery Date</label>
                  <input type="date" className="form-control" onChange={(e)=>setDeliveryDate(e.target.value)} />
              </div>

              <div className="form-group my-3">
                  <label className='fw-bold mb-3'>Product List : </label>

                <div className="col-12">

                <div className="card">
                    <div className="card-body">
                    <div className="table-responsive">

                    <table className="table table-striped">
                        <thead className="text-center">
                            <tr>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>SubCategory</th>
                            <th className='text-nowrap'>Stock Quantity</th>
                            <th>Action</th>
                            </tr>
                          
                        </thead>
                        <tbody className="text-center">
                        {selectedProducts.length === 0 && 
                        <tr>
                           
                          <td colSpan="9" className='text-danger'>
                              There is no selected items yet!
                          </td>
                        </tr>}
                          {selectedProducts.map((selected,index)=>(
                
                            <tr key={index}>
                              
                              <td>{selected.product_name}</td>
                              <td>{selected.brand}</td>
                              <td>{selected.category}</td>
                              <td>{selected.subcategory}</td>
                              <td><Minus className='me-1' fontSize='small' color="primary" onClick={()=>getSelectedProduct((prev) => {
                                let newData = [...prev]
                                prev[index].qty--  
                                return newData
                              })}/>{selected.qty}<Plus className='ms-1' fontSize='small' color="primary" onClick={()=>getSelectedProduct((prev) => {
                                let newData = [...prev]
                                prev[index].qty++  
                                return newData
                              })} /></td>
                              <td></td>
                            </tr>
                          ))}

                        </tbody>
                    </table>
                    </div>
                    </div>
               

                </div>
                 
                <div className="my-3 float-end bg-white">
                  <button type="submit" className="btn btn-primary btn-submit">Submit</button>
                </div>
                            
                </div>
              </div>

          </div>
          </form>
    </div>
        

	</div>
	
	
  <AddSaleProduct products={products}  handleAddProduct={handleAddProduct}/>
	</div>

</>
  )
}

export default AddSalesOrder