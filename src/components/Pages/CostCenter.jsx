import Nav from "../Sidebar/Nav";
import styled from "styled-components";
import React from 'react';
import '../../App.css';
import {DeleteIcon, EditIcon, AddIcon} from "../Icons";

const ButtonB = styled.button`
    margin-right: 10px;
    font-size: 15px;
    background-color: #79a6fa;
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

const CostCenter = () => {
 
  return (

    <div>
        <Nav/>
        <div className='flex'>
            <h5 className="col-10 fw-normal text-secondary fb">Home / Cost Center List</h5>
            <ButtonB className="col-2 btn btn-primary border-0"><AddIcon/> Cost Center</ButtonB>
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
                                <th scope="col" className="p-3 text-center bod-li">No</th>
                                <th scope="col" className="p-3 text-center bod-li">Cost Center Name</th>
                                <th scope="col" className="p-3 text-center bod-li">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row" className="p-2 text-center ff bod-li">1</td>
                                <td className="p-2 text-center ff bod-li"> Lorem ipsum, dolor </td>
                                <Td className="p-2 text-right ff bod-li">
                                    <ButtonB className="btn btn-primary btn-sm border-0" type="submit"><EditIcon/></ButtonB>
                                    <ButtonR className="btn btn-danger btn-sm border-0" type="submit"><DeleteIcon/></ButtonR>
                                </Td>
                            </tr>
                            <tr>
                                <td scope="row" className="p-2 text-center ff bod-li">2</td>
                                <td className="p-2 text-center ff bod-li"> Lorem ipsum, dolor </td>
                                <Td className="p-2 text-right ff bod-li">
                                    <ButtonB className="btn btn-primary btn-sm border-0" type="submit"><EditIcon/></ButtonB>
                                    <ButtonR className="btn btn-danger btn-sm border-0" type="submit"><DeleteIcon/></ButtonR>
                                </Td>
                            </tr>
                            <tr>
                                <td scope="row" className="p-2 text-center ff bod-li">3</td>
                                <td className="p-2 text-center ff bod-li"> Lorem ipsum, dolor </td>
                                <Td className="p-2 text-right ff bod-li">
                                    <ButtonB className="btn btn-primary btn-sm border-0" type="submit"><EditIcon/></ButtonB>
                                    <ButtonR className="btn btn-danger btn-sm border-0" type="submit"><DeleteIcon/></ButtonR>
                                </Td>
                            </tr>
                            <tr>
                                <td scope="row" className="p-2 text-center ff bod-li">4</td>
                                <td className="p-2 text-center ff bod-li"> Lorem ipsum, dolor </td>
                                <Td className="p-2 text-right ff bod-li">
                                    <ButtonB className="btn btn-primary btn-sm border-0" type="submit"><EditIcon/></ButtonB>
                                    <ButtonR className="btn btn-danger btn-sm border-0" type="submit"><DeleteIcon/></ButtonR>
                                </Td>
                            </tr>
                            <tr>
                                <td scope="row" className="p-2 text-center ff bod-li">5</td>
                                <td className="p-2 text-center ff bod-li"> Lorem ipsum, dolor </td>
                                <Td className="p-2 text-right ff bod-li">
                                    <ButtonB className="btn btn-primary btn-sm border-0" type="submit"><EditIcon/></ButtonB>
                                    <ButtonR className="btn btn-danger btn-sm border-0" type="submit"><DeleteIcon/></ButtonR>
                                </Td>
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

export default CostCenter;