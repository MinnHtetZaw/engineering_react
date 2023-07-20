
import Nav from "../Sidebar/Nav";
import React from 'react';
import '../../App.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../../api/apiResource';


const Comparison = () => {

    const {id} = useParams();

    const [primary, setPrimary] = useState([]);
    const [secondary, setSecondary] = useState([]);


    useEffect(() => {
       
         api.get("product_compare/"+id)
                .then((res) => {
                    
                    setPrimary(res.data.primaryData[0]);
                    setSecondary(res.data.secondaryData);
                    
                    
             
                })
           
    }, []);
 
    return (
       
    <div>
         
        <Nav/>
        <div className='flex'>
            <h5 className="col-10 fw-normal text-secondary fb">Comparison Testing product between suppliers</h5>
        </div>
        <div className="row m-1">
            <div className="col-12 ma-auto">
            <div className="my-2">
                <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="rfq" role="tabpanel" aria-labelledby="rfq-tab">
                    <table className="table table-striped border-2">
                        <thead className="bg-soft text-light">
                            <tr>
                                <th scope="col" className="p-3 text-left bod-li">Field Name</th>
                                <th scope="col" className="p-3 text-center bod-li">Primary</th>
                                {
                                    secondary.map((secondary_table)=>(
                                        <th scope="col" className="p-3 text-center bod-li">Secondary</th>
                                    ))
                                }
                               

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row" className="p-2 text-left ff bod-li">Supplier Name</td>
                                <td className="p-2 text-center ff bod-li">{primary.supplier?.name}</td>
                                {
                                    secondary.map((secondarydetail)=>(
                                        <td className="p-2 text-center ff bod-li">{secondarydetail.supplier?.name}</td>
                                    ))
                                }
                              
                               
                            </tr>
                            <tr>
                                <td scope="row" className="p-2 text-left ff bod-li">Unit Purchase Price</td>
                                <td className="p-2 text-center ff bod-li">{primary.unit_purchase_price}</td> 
                                {
                                    secondary.map((secondarydetail)=>(
                                        <td className="p-2 text-center ff bod-li">{secondarydetail.unit_purchase_price}</td>
                                    ))
                                }
                            </tr>
                            <tr>
                                <td scope="row" className="p-2 text-left ff bod-li">Incoterm</td>
                                <td className="p-2 text-center ff bod-li">{primary.incoterm?.incoterm_name}</td>
                                {
                                    secondary.map((secondarydetail)=>(
                                        <td className="p-2 text-center ff bod-li">{secondarydetail.incoterm?.incoterm_name}</td>
                                    ))
                                }
                            </tr>
                            <tr>
                                <td scope="row" className="p-2 text-left ff bod-li">Last_Purchase_Date</td>
                                <td className="p-2 text-center ff bod-li">{primary.last_purchase_date}</td>
                                {
                                    secondary.map((secondarydetail)=>(
                                        <td className="p-2 text-center ff bod-li">{secondarydetail.last_purchase_date}</td>
                                    ))
                                }
                            </tr>
                            <tr>
                                <td scope="row" className="p-2 text-left ff bod-li">Initial_purchase_qty</td>
                                <td className="p-2 text-center ff bod-li"> {primary.initial_purchase_qty} </td>
                                {
                                    secondary.map((secondarydetail)=>(
                                        <td className="p-2 text-center ff bod-li">{secondarydetail.initial_purchase_qty}</td>
                                    ))
                                }
                            </tr>
                            <tr>
                                <td scope="row" className="p-2 text-left ff bod-li">Initial_purchase_price</td>
                                <td className="p-2 text-center ff bod-li">{primary.initial_purchase_price}  </td>
                                {
                                    secondary.map((secondarydetail)=>(
                                        <td className="p-2 text-center ff bod-li">{secondarydetail.initial_purchase_price}</td>
                                    ))
                                }
                            </tr>
                            <tr>
                                <td scope="row" className="p-2 text-left ff bod-li">Moq_price</td>
                                <td className="p-2 text-center ff bod-li"> {primary.moq_price} </td>
                                {
                                    secondary.map((secondarydetail)=>(
                                        <td className="p-2 text-center ff bod-li">{secondarydetail.moq_price}</td>
                                    ))
                                }
                            </tr>

                            <tr>
                                <td scope="row" className="p-2 text-left ff bod-li">Moq_price</td>
                                <td className="p-2 text-center ff bod-li"> {primary.moq_qty} </td>
                        
                                {
                                    secondary.map((secondarydetail)=>(
                                        <td className="p-2 text-center ff bod-li">{secondarydetail.moq_qty}</td>
                                    ))
                                }
                            </tr>

                            <tr>
                                <td scope="row" className="p-2 text-left ff bod-li">Leadtime_type</td>
                                <td className="p-2 text-center ff bod-li"> {primary.leadtime_type} </td>
                                {
                                    secondary.map((secondarydetail)=>(
                                        <td className="p-2 text-center ff bod-li">{secondarydetail.leadtime_type}</td>
                                    ))
                                }
                            </tr>

                            
                            <tr>
                                <td scope="row" className="p-2 text-left ff bod-li">Delivery_leadtime</td>
                                <td className="p-2 text-center ff bod-li"> {primary.delivery_leadtime} </td>
                                {
                                    secondary.map((secondarydetail)=>(
                                        <td className="p-2 text-center ff bod-li">{secondarydetail.delivery_leadtime}</td>
                                    ))
                                }
                            </tr>
                            <tr>
                                <td scope="row" className="p-2 text-left ff bod-li">Discount_type</td>
                                <td className="p-2 text-center ff bod-li"> {primary.discount_type ? primary.discount_type :'-'} </td>
                                {
                                    secondary.map((secondarydetail)=>(
                                        <td className="p-2 text-center ff bod-li">{secondarydetail.discount_type ? secondarydetail.discount_type: '-'}</td>
                                    ))
                                }
                            </tr>
                            <tr>
                                <td scope="row" className="p-2 text-left ff bod-li">Discount_value</td>
                                <td className="p-2 text-center ff bod-li"> {primary.discount_value ? primary.discount_value :'-'} </td>
                                {
                                    secondary.map((secondarydetail)=>(
                                        <td className="p-2 text-center ff bod-li">{secondarydetail.discount_value ? secondarydetail.discount_value: '-'}</td>
                                    ))
                                }
                            </tr>
                            <tr>
                                <td scope="row" className="p-2 text-left ff bod-li">Discount_condition</td>
                                <td className="p-2 text-center ff bod-li"> {primary.discount_condition ? primary.discount_condition :'-'} </td>
                                {
                                    secondary.map((secondarydetail)=>(
                                        <td className="p-2 text-center ff bod-li">{secondarydetail.discount_condition ? secondarydetail.discount_condition: '-'}</td>
                                    ))
                                }
                            </tr>
                            <tr>
                                <td scope="row" className="p-2 text-left ff bod-li">Discount_condition_type</td>
                                <td className="p-2 text-center ff bod-li"> {primary.discount_condition_type ? primary.discount_condition_type :'-'} </td>
                                {
                                    secondary.map((secondarydetail)=>(
                                        <td className="p-2 text-center ff bod-li">{secondarydetail.discount_condition_type ? secondarydetail.discount_condition_type: '-'}</td>
                                    ))
                                }
                            </tr>
                            <tr>
                                <td scope="row" className="p-2 text-left ff bod-li">Credit_term_type</td>
                                <td className="p-2 text-center ff bod-li"> {primary.credit_term_type ? primary.credit_term_type :'-'} </td>
                                {
                                    secondary.map((secondarydetail)=>(
                                        <td className="p-2 text-center ff bod-li">{secondarydetail.credit_term_type ? secondarydetail.credit_term_type: '-'}</td>
                                    ))
                                }
                            </tr>
                            <tr>
                                <td scope="row" className="p-2 text-left ff bod-li">Credit_term</td>
                                <td className="p-2 text-center ff bod-li"> {primary.credit_term ? primary.credit_term :'-'} </td>
                                {
                                    secondary.map((secondarydetail)=>(
                                        <td className="p-2 text-center ff bod-li">{secondarydetail.credit_term ? secondarydetail.credit_term: '-'}</td>
                                    ))
                                }
                            </tr>
                            <tr>
                                <td scope="row" className="p-2 text-left ff bod-li">Credit_condition</td>
                                <td className="p-2 text-center ff bod-li"> {primary.credit_condition ? primary.credit_condition :'-'} </td>
                                {
                                    secondary.map((secondarydetail)=>(
                                        <td className="p-2 text-center ff bod-li">{secondarydetail.credit_condition ? secondarydetail.credit_condition: '-'}</td>
                                    ))
                                }
                            </tr>
                            <tr>
                                <td scope="row" className="p-2 text-left ff bod-li">Credit_condition_type</td>
                                <td className="p-2 text-center ff bod-li"> {primary.credit_condition_type ? primary.credit_condition_type :'-'} </td>
                                {
                                    secondary.map((secondarydetail)=>(
                                        <td className="p-2 text-center ff bod-li">{secondarydetail.credit_condition_type ? secondarydetail.credit_condition_type: '-'}</td>
                                    ))
                                }
                            </tr>
                            <tr>
                                <td scope="row" className="p-2 text-left ff bod-li">Credit_amount</td>
                                <td className="p-2 text-center ff bod-li"> {primary.credit_amount ? primary.credit_amount :'-'} </td>
                                {
                                    secondary.map((secondarydetail)=>(
                                        <td className="p-2 text-center ff bod-li">{secondarydetail.credit_amount ? secondarydetail.credit_amount: '-'}</td>
                                    ))
                                }
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Comparison;