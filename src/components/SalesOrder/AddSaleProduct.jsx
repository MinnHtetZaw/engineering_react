import React, { memo } from 'react'

const AddSaleProduct = ({products ,handleAddProduct}) => {
  return (


    <div className="col-6">
      {/* <div className="row">
          <div className="col-4">
                <div className="form-group">
                      <select className="form-control" >
                      
                        <option>Select Category</option>
                
                      </select>
                </div>
          </div>
      </div> */}
    <div className="row">
     
        <table className="table table-hover table-bordered table-striped">
          <thead className="text-center bg-light ">
            <tr>
            <th>#</th>
            <th className="text-success">Part Number</th>
              <th className="text-success">Name</th>
              <th className="text-success">Brand</th>
              <th className="text-success">Category</th>
              <th className="text-success">Stock Qty</th>
              <th className="text-success">Action</th>
            </tr>
           
          </thead>
          <tbody>
      
                { JSON.stringify(products) === '[]' &&
                    <tr>
                        <td colSpan="9" className='text-center'>
                                <div className="spinner-border text-info" role="status">
                                </div>
                        </td>
                    </tr>
                }
                {products.map ((product,index)=>(
                    <tr className="text-center" key={index}>
                             <td>{++index}</td>
                            <td>{product.product_name}</td>
                            <td>{product.brand.brand_name}</td>
                            <td>{product.category.category_name}</td>
                            <td>{product.subcategory.subcategory_name}</td>
                            <td>{product.instock_quantity}</td>
                            <td><i className="btn btn-primary btn_addtocart" onClick={()=>handleAddProduct(product.id)}>Add</i></td>
                     
                    </tr>
                ))}
          
           
       
          </tbody>
      </table>
    </div>
		
	</div>
  )
}

export default memo(AddSaleProduct)