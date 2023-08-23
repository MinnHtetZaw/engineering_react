/* eslint-disable react-hooks/exhaustive-deps */

import { Link } from "react-router-dom";
import Nav from "../../../../components/Sidebar/Nav";
import styled from "styled-components";
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {AddIcon, CompareIcon} from "../../../../components/Icons";
import {api} from '../../../../utilities/api/apiResource'

const ButtonB = styled.button`
    margin-right: 10px;
    font-size: 15px;
    background-color: #5a8dee;
    display: inline-block;
`
const ButtonW = styled.button`
    margin-right: 10px;
    font-size: 15px;
    background: #fff23d;
    display: inline-block;
`

const Img = styled.img`
    width: 40%;
    height: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left : 30%;
`

const ProductDetail = () => {

    const {id} = useParams();
    const [prodetail, setProdetail] = useState([]);


    useEffect(() => {
     
               api.get("pro_detail/"+id)
                .then((res) => {
                    setProdetail(res.data);
                })
                

    }, []);

 
    return (

    <div>
        <Nav/>
        <div className='flex'>
            <h5 className="col-10 fw-normal text-secondary fb">Product Detail</h5>
          
            <ButtonB className="btn btn-primary btn-sm border-0" type="submit"><AddIcon/> Add Part</ButtonB>
            <Link to={"/comparison/"+id}><ButtonW className="btn btn-warning btn-sm border-0" type="submit"><CompareIcon/> Compare</ButtonW></Link>
            
        </div>
        
        <div className="row m-1">
            <div className="col-12 ma-auto">
                <div className="tab-content" id="pills-tabContent">
                    <div className="card mt-3">
                        <div className="card-header">Product Detail</div>
                        
                        <div className="card-body">
                            <h4 className="text-secondary text-center">{prodetail.product_name}</h4>
                            <Img src={`http://localhost:8000/images/${prodetail.product_img}`} className="img-fluid" alt="Responsive image"/>
                          
                            <table className="table table-bordered prod-tab-w">
                                <thead>
                                    <tr>
                                        <td className='small-col'>Product Name: </td>
                                        <th>{prodetail.product_name}</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <tr>
                                        <td>Category: </td>
                                        <th>{prodetail.category?.category_name}</th>
                                    </tr>
                                    <tr>
                                        <td>Sub Category: </td>
                                        <th>{prodetail.subcategory?.subcategory_name}</th>
                                    </tr>
                                    <tr>
                                        <td>Brand: </td>
                                        <th>{prodetail.brand?.brand_name}</th>
                                    </tr>
                                    <tr>
                                        <td>Measuring Unit: </td>
                                        <th>{prodetail.measuring_unit}</th>
                                    </tr>
                                    <tr>
                                        <td>Primary Supplier: </td>
                                        <th>{prodetail.primarysupplier?.name}</th>
                                    </tr>
                                    <tr>
                                        <td>Secondary Supplier: </td>
                            
                                        <th>
                                            {
                                                prodetail.secondary_supplier?.map((secondarysupplier)=>(
                                                    secondarysupplier.name + ","
                                                ))
                                            }
                                        </th>
                                        
                                    </tr>
                                    <tr>
                                        <td>Minimun Order Price: </td>
                                        <th>{prodetail.moq_price}</th>
                                    </tr>
                                    <tr>
                                        <td>Minimun Order Quantity: </td>
                                        <th>{prodetail.min_order_quantity}</th>
                                    </tr>
                                    <tr>
                                        <td>Reorder Quantity: </td>
                                        <th>{prodetail.reorder_quantity}</th>
                                    </tr>
                                    <tr>
                                        <td>Description</td>
                                        <th><textarea style={{width : "100%"}}>{prodetail.description}</textarea></th>

                                    </tr>
                                    
                                </tbody>
                            </table>

                            

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetail;