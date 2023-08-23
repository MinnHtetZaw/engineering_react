import React, { useState, useEffect } from 'react';

import Nav from "../../../../components/Sidebar/Nav";
import styled from "styled-components";
import {DeleteIcon, EditIcon, AddIcon} from "../../../../components/Icons";
import CreateCategory from '../../../../components/Warehouse/Master/Category/CreateCategory';
import { api } from '../../../../utilities/api/apiResource';


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

const Categories = () => {

    const [create, setCreate] = useState(false);

    const create_category = () =>{
        setCreate(true);
    }

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCat = async () => {
            try{
                const res = await api.get("category")
                
                    setCategories(res.data.categories);
                
            }catch(err){}
        }
        getCat();
    }, []);
 
    return (

    <div>
        <Nav/>
        <div className='flex'>
            <h5 className="col-10 fw-normal text-secondary fb">Categories List</h5>
            <ButtonB className="col-2 btn btn-primary border-0" onClick={create_category}><AddIcon/> Category</ButtonB>
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
                                <th scope="col" className="p-2W text-center bod-li">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.map((category) => (
                                <tr key={category.id}>
                                    <td scope="row" className="p-1 text-center ff bod-li">{category.id}</td>
                                    <td className="p-1 text-center ff bod-li"> {category.category_code} </td>
                                    <td className="p-1 text-center ff bod-li"> {category.category_name} </td>
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
        <CreateCategory open={create} close={()=>setCreate(false)}/>
    </div>
  )
}

export default Categories;