import React, { useState } from 'react'
import { EyeIcon } from '../Icons'
import ProductlistDialog from './ProductlistDialog'
import { api } from '../../api/apiResource'
import swal from 'sweetalert'

const RequestListManager = ({materials}) => {
  const [show,setShow] = useState(false)
  const [products,setProducts]=useState([])
  const [material_id,setMaterialId]=useState(null)

  const handleDialog =(val,id)=>{

    setMaterialId(id)
    setShow(!show)
    setProducts(val)
  }

  return (
    <>
    <div className='flex'>
            <h5 className="col-10 fw-normal text-secondary fb">Request Material List</h5>
          
      </div>
      
        <div className="row m-1">
            <div className="col-12 ma-auto">
            <div className="my-2">
                <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="rfq" role="tabpanel" aria-labelledby="rfq-tab">
                    <table className="table table-striped">
                        <thead className="bg-soft text-light">
                      <tr>
                                <th scope="col" className="p-2 text-center bod-li">No</th>
                                <th scope="col" className="p-2 text-center bod-li">Requested by</th>
                                <th scope="col" className="p-2 text-center bod-li">Request Date</th>
                                <th scope="col" className="p-2 text-center bod-li">Reason</th>
                                <th scope="col" className="p-2 text-center bod-li">From User</th>
                                <th scope="col" className="p-2 text-center bod-li">Status</th>
                                <th scope="col" className="p-2 text-center bod-li">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                materials && (
                                    materials.map((material,index)=>(
                                    <tr className="text-center" key={material.id}>
                                        <td className="bod-li">{++  index}</td>

                                        <td className="bod-li">{material.requested_by ?? "-"}</td>
                                        <td className="bod-li">{material.request_date}</td>                                   
           
                                        <td className="bod-li">{material.reason ?? "-"}</td>
                                        <td className="bod-li">
                                          <span className='badge bg-danger'>{material.isApproved}
                                            </span></td>
                                        
                                        <td className="bod-li">{material.from_employee ?? "-"}</td>
                        
                                          
                                        <td className="bod-li">
                                            <EyeIcon onClick={()=>handleDialog(material.products,material.id)} />
                                            
                                        </td>
                                    </tr>
                                    ))
                                )
                            }
                          
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
       <ProductlistDialog open={show} close={()=>setShow(!show)} products={products} id={material_id} />
    </>
  )
}

export default RequestListManager