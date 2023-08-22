import React, { useState, useEffect } from 'react';
import Nav from "../../components/Sidebar/Nav";
import styled from "styled-components";
import '../../App.css';
import {DeleteIcon, EditIcon, AddIcon} from "../../components/Icons";
import CreateCurrency from '../../components/CostCenter/CreateCurrency';
import { api } from '../../utilities/api/apiResource';


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

const Currency = () => {

    const [create, setCreate] = useState(false);

    const create_currency = () =>{
        setCreate(true);
    }

    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        const getCur = async () => {
            try{
                const res = await api.get("currency")
               
                    setCurrencies(res.data.currency);
              
            }catch(err){}
        }
        getCur();
    }, []);
 
    return (

    <div>
        <Nav/>
        <div className='flex'>
            <h5 className="col-10 fw-normal text-secondary fb">Currency List</h5>
            <ButtonB className="col-2 btn btn-primary border-0" onClick={create_currency}><AddIcon/> Currency</ButtonB>
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
                                <th scope="col" className="p-2 text-center bod-li">Code</th>
                                <th scope="col" className="p-2 text-center bod-li">Name</th>
                                <th scope="col" className="p-2 text-center bod-li">Exchange Rate</th>
                                <th scope="col" className="p-2 text-center bod-li">Last Updated at</th>
                                <th scope="col" className="p-2W text-center bod-li">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currencies.map((currency) => (
                                <tr key={currency.id}>
                                    <td scope="row" className="p-1 text-center ff bod-li">{currency.id}</td>
                                    <td className="p-1 text-center ff bod-li"> {currency.code} </td>
                                    <td className="p-1 text-center ff bod-li"> {currency.name} </td>
                                    <td className="p-1 text-center ff bod-li"> {currency.exchange_rate} </td>
                                    <td className="p-1 text-center ff bod-li"> {currency.last_update} </td>
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
        <CreateCurrency open={create} close={()=>setCreate(false)}/>
    </div>
  )
}

export default Currency;