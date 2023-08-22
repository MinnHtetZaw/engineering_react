import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Nav from "../../../components/Sidebar/Nav";
import styled from "styled-components";
import React from 'react';
import {DeleteIcon, EditIcon, AddIcon, DetailIcon} from "../../../components/Icons";
import { api } from '../../../utilities/api/apiResource';

const ButtonB = styled.button`
    margin: 5px;
    font-size: 15px;
    background-color: #5a8dee;
`
const ButtonR = styled.button`
    font-size: 15px;
    background-color: rgb(226, 44, 44);
`
const ButtonY = styled.button`
    font-size: 15px;
    background-color: #ffc107;
`
const Td = styled.td`
    width: 120px;
    max-width: 200px;
`

const Suppliers = () => {

    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        api.get('supplier')
        .then((res) => {
            setSuppliers(res.data.suppliers)
        })
    }, []);
 
    return (

    <div>
        <Nav/>
        <div className='flex'>
            <h5 className="col-10 fw-normal text-secondary fb">Suppliers List</h5>
            <ButtonB className="col-2 btn btn-primary border-0">
                <Link to="/add_supplier" className="text-white text-decoration-none"><AddIcon/> Supplier</Link>
            </ButtonB>
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
                                <th scope="col" className="p-2 text-center bod-li">Name</th>
                                <th scope="col" className="p-2 text-center bod-li">Email</th>
                                <th scope="col" className="p-2 text-center bod-li">Website</th>
                                <th scope="col" className="p-2 text-center bod-li">Phone</th>
                                <th scope="col" className="p-2 text-center bod-li">Address</th>
                                <th scope="col" className="p-2 text-center bod-li">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                suppliers.map((supplier) => (
                                <tr key={supplier.id}>
                                    <td scope="row" className="p-2 text-center ff bod-li">{supplier.id}</td>
                                    <td className="p-1 text-center ff bod-li"> {supplier.name}</td>
                                    <td className="p-1 text-center ff bod-li"> {supplier.email}</td>
                                    <td className="p-1 text-center ff bod-li"> {supplier.website}</td>
                                    <td className="p-1 text-center ff bod-li"> {supplier.phone}</td>
                                    <td className="p-1 text-center ff bod-li"> {supplier.address}</td>
                                    <Td className="p-1 text-right ff bod-li">
                                        <ButtonB className="btn btn-primary btn-sm border-0" type="submit"><Link to="/" className='text-white'><DetailIcon/></Link></ButtonB>
                                        <ButtonY className="btn btn-warning btn-sm border-0" type="submit"><Link to="/" className='text-white'><DetailIcon/></Link></ButtonY><br />
                                        <ButtonB className="btn btn-primary btn-sm border-0" type="submit"><EditIcon/></ButtonB>
                                        <ButtonR className="btn btn-danger btn-sm border-0" type="submit"><DeleteIcon/></ButtonR>
                                    </Td>
                                </tr>
                                ))
                            }
                            
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

export default Suppliers;