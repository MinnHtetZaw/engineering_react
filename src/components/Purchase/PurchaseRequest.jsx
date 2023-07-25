import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from './../Sidebar/Nav';

const PurchaseRequest = () => {

    const location = useLocation()
    const data = location.state.data

    const [show,setShow]=useState(false)
    
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
                  <select className="form-control">
                    <option>Select Project</option>
                
                  </select>
              </div>
              <div className="form-group col-6 my-4">
                  <label className='my-1'>Phase</label>
                  <select className="form-control">

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
                  <input type="date" className="form-control"/>
              </div>
             
            </div>
        
          {show && (
              <div className="col-6 offset-3 mt-4">

              <table className="table">
                    <thead className="text-center">
                        <tr>
                            <th>Name</th>
                            <th>Stock Quantity</th>
                        </tr>
                       
                    </thead>
                    <tbody>
                        <tr className='text-center'>
                            <td>{data.product_name}</td>
                            <td>{data.qty}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
          ) }

            <div className="text-center mt-5">
                  <button className="btn btn-primary btn-submit">Submit</button>
            </div>
             
          </div>
      
    </div>
        
	</div>

</div>

    </>
  )
}

export default PurchaseRequest