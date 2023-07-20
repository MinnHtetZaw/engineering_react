import React, { useState, useEffect } from 'react';
import Nav from "../Sidebar/Nav";
import styled from "styled-components";
import '../../App.css';
import {DeleteIcon, EditIcon} from "../Icons";
import { api } from '../../api/apiResource';


const ButtonB = styled.button`
    margin-right: 10px;
    font-size: 15px;
    background-color: #5a8dee;
    display: inline-block;
`
const ButtonR = styled.button`
    margin-right: 10px;
    font-size: 15px;
    background-color: rgb(226, 44, 44);
`
const Td = styled.td`
    width: 120px;
    max-width: 120px;
`

const SiteItems = () => {

    const [sitems, setSItems] = useState([]);

    useEffect(() => {
        const getSItem = async () => {
            try{
                const res = await api.get("site_items")
            
                    setSItems(res.data.sitems);
                
            }catch(err){}
        }
        getSItem();
    }, []);
 
    return (

    <div>
        <Nav/>
        <div className='flex'>
            <h5 className="col-10 fw-normal text-secondary fb">Site Item List</h5>
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
                                <th scope="col" className="p-2 text-center bod-li">Serial No</th>
                                <th scope="col" className="p-2 text-center bod-li">Model</th>
                                <th scope="col" className="p-2W text-center bod-li">Size</th>
                                <th scope="col" className="p-2W text-center bod-li">Color</th>
                                <th scope="col" className="p-2W text-center bod-li">Dimension</th>
                                <th scope="col" className="p-2W text-center bod-li">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sitems.map((sitem) => (
                                <tr key={sitem.id}>
                                    <td scope="row" className="p-1 text-center ff bod-li">{sitem.id}</td>
                                    <td className="p-1 text-center ff bod-li"> {sitem.serial_no} </td>
                                    <td className="p-1 text-center ff bod-li"> {sitem.model} </td>
                                    <td className="p-1 text-center ff bod-li"> {sitem.size} </td>
                                    <td className="p-1 text-center ff bod-li"> {sitem.color} </td>
                                    <td className="p-1 text-center ff bod-li"> {sitem.dimension} </td>
                                    <Td className="p-1 text-right ff bod-li">
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

export default SiteItems;