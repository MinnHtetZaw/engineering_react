import React, { useState } from 'react'
import { ButtonB } from '../../../style'
import { DetailIcon } from '../../Icons'
import { Collapse } from '@mui/material'

const Products = ({product,index}) => {

    const [open,setOpen] = useState(false)

    // const handleOpen =(value)=>{

    //     setOpen(!open)
    // }

  return (
    <>

    <tr key={index}>
                            <td className="p-2 text-center ff bod-li">
                              {product.id}
                            </td>
                            <td className="p-2 text-center ff bod-li">
                              <img
                                className="SiteImage"
                                src={product.product_img}
                                alt="Product Image"
                              />
                            </td>
                            <td className="p-2 text-center ff bod-li">
                              {" "}
                              {product.product_name}{" "}
                            </td>
                            <td className="p-2 text-center ff bod-li">
                              {" "}
                              {product.brand}{" "}
                            </td>
                            <td className="p-2 text-center ff bod-li">
                              {" "}
                              {product.category}{" "}
                            </td>
                            <td className="p-2 text-center ff bod-li">
                              {" "}
                              {product.subcategory}{" "}
                            </td>
                          
                            <td className="p-2 text-center ff bod-li">
                              <ButtonB
                                className="btn btn-primary btn-sm border-0"
                                type="submit">
                                <DetailIcon onClick ={()=>setOpen(!open)}/>
                              </ButtonB>
                            </td>
                          </tr>
                           <tr>
                           <td colSpan={9}>
                           <Collapse in={open} timeout="auto" unmountOnExit>
                         
                           <div className="offset-1 col-10">
                                             <table className="table table-striped">
                                               <thead className="bg-info text-light">
                                                 <tr className="text-center">
                                                   <th className="bod-li">No.</th>
                                                   <th className="bod-li">Serial No</th>
                                                   <th className="bod-li">Model</th>
                                                   <th className="bod-li">Size</th>
                                                   <th className="bod-li">Color</th>
                                                   <th className="bod-li">Dimension</th>
                                                   <th className="bod-li">Action</th>

                                                 </tr>
                                               </thead>
                                               <tbody>
                                                 { 
                                                   product && (
                                                   product.items.map((item, i) =>
                                                  (
                                                     <tr className="text-center" key={item.id}>
                                                       <td className="bod-li">{++i}</td>
                                                       <td className="bod-li">{item.serial_no}</td>
                                                       <td className="bod-li">{item.model}</td>
                                                       <td className="bod-li">{item.size}</td>
                                                       <td className="bod-li">{item.color}</td>
                                                       <td className="bod-li">{item.dimension}</td>
                                                       <td className="bod-li">Action</td>
                                                     </tr>
                                                   ))
                                                   )
                                                   
                                                 }
                                               </tbody>
                                             </table>
                                           </div>
                             </Collapse>
                             </td>
                           </tr>
     </>
  )
}

export default Products