import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Nav from './../Sidebar/Nav';
import { api } from './../../api/apiResource';
import swal from 'sweetalert';

const PurchaseRequest = () => {

    const {id} = useParams();
    const location = useLocation()
    const requiredItems = location.state?.data
    const  pid= location.state?.projects[0]
    const  phid= location.state?.projects[1]
    const [show,setShow]=useState(false)
    const [projects,setProjects]=useState([])
    const dateRef = useRef('')
    const filteredproject = projects.filter(el=>el.id == pid)
    const filterphase = filteredproject[0]?.phases.filter(el=>el.id ==  phid)
    const nav = useNavigate()


    useEffect(()=>{

      const getProjects=async()=>{
        const res = await api.get('project')
        setProjects(res.data.project)
      }
        
      getProjects()
    },[])
    
    
    
  const handleSubmit=async()=>{
    const data ={
      project_id:filteredproject[0]?.id,
      phase_id:filterphase[0]?.id,
      date:dateRef.current.value,
      products:requiredItems,
      request_material_id: id,
    }

    const res = await api.post('purchase/request',data)

      swal('Success',res.data.success,'success')
      .then(()=>nav('/request_material_list'))
    
  }
  return (
    <>
    <Nav/>
    <div className="row">
  	<div className="col-12 col-sm-12 col-lg-12">

    <div className="card m-3 shadow">
      <div className="card-header bg-primary">
          <h5 className="text-white fst-italic">Purchase Order Form</h5>
      </div>

          <div className="card-body">
            <div className="row">
            <div className="form-group col-6 my-4">
                  <label className='my-1'>Project</label>
                  <select className="form-control" disabled>
                    {
                      filteredproject && <option value={filteredproject[0]?.id}>
                        {filteredproject[0]?.name}
                      </option>
                    }

                  </select>
              </div>
              <div className="form-group col-6 my-4">
                  <label className='my-1'>Phase</label>
                  <select className="form-control" disabled>
                  {
                      filterphase && <option value={filterphase[0]?.id}>
                        {filterphase[0]?.phase_name}
                      </option>
                    }
                  </select>
              </div>
            </div>

            <div className="row">
            <div className="form-group col-6 mt-4">
                  <label className='me-3 fw-semibold fst-italic'>Product List : </label>
                  <button className="btn btn-primary mx-2 btn-sm" onClick={()=>setShow(!show)}>Check Required Product</button>
            </div>
              <div className="form-group col-6">
                  <label>Required Date</label>
                  <input type="date" ref={dateRef} className="form-control"/>
              </div>
             
            </div>
        
          {show && (
              <div className="col-6 offset-3 mt-4">

              <table className="table">
                    <thead className="text-center">
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                        </tr>
                       
                    </thead>
                    <tbody>
                        {requiredItems.map((item,index)=>(
                          
                              <tr className='text-center' key={index}>
                              <td>{item.name}</td>
                           
                              <td>{item.required_quantity}</td>
                              </tr>
                        ))}
                       

                    </tbody>
                </table>
            </div>
          ) }

            <div className="text-center mt-5">
                  <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
             
          </div>
      
    </div>
        
	</div>

</div>

    </>
  )
}

export default PurchaseRequest