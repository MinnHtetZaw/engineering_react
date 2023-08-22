import { useState, useEffect } from 'react';
import Nav from "../../../components/Sidebar/Nav";
import styled from "styled-components";
import React from 'react';
import {DeleteIcon, EditIcon, AddIcon} from "../../../components/Icons";
import CreateBrand from '../../../components/Master/Brand/CreateBrand';
import { api } from '../../../utilities/api/apiResource';

const ButtonB = styled.button`
    margin-right: 10px;
    font-size: 15px;
    background-color: #5a8dee;
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

const Brands = () => {

    const [create,setCreate] = useState(false);

    const create_subcategory = () =>{
        setCreate(true);
    }

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const getCat = async () => {
            try{
              await api.get("brand")
                .then((res) => {
                    setCategories(res.data.categories)
                    setSubCategories(res.data.subcategories)
                    setSuppliers(res.data.suppliers)
                    setBrands(res.data.brands);
                })
            }catch(err){}
        }
        getCat();
    }, []);
 
    return (

    <div>
        <Nav/>
        <div className='flex'>
            <h5 className="col-10 fw-normal text-secondary fb">Brands List</h5>
            <ButtonB className="col-2 btn btn-primary border-0" onClick={create_subcategory}><AddIcon/> Brand</ButtonB>
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
                                <th scope="col" className="p-2 text-center bod-li">Id</th>
                                <th scope="col" className="p-2 text-center bod-li">Code</th>
                                <th scope="col" className="p-2 text-center bod-li">Name</th>
                                <th scope="col" className="p-2 text-center bod-li">Description</th>
                                <th scope="col" className="p-2 text-center bod-li">Supplier</th>
                                <th scope="col" className="p-2 text-center bod-li">Country of Region</th>
                                <th scope="col" className="p-2 text-center bod-li">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                brands.map((brand) => (
                                    <tr key={brand.id}>
                                        <td scope="row" className="p-2 text-center ff bod-li">{ brand.id }</td>
                                        <td className="p-1 text-center ff bod-li"> { brand.brand_code} </td>
                                        <td className="p-1 text-center ff bod-li"> { brand.brand_name} </td>
                                        <td className="p-1 text-center ff bod-li"> { brand.description} </td>
                                        <td className="p-1 text-center ff bod-li"> { brand.supplier_id} </td>
                                        <td className="p-1 text-center ff bod-li"> { brand.country_of_origin} </td>
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
        <CreateBrand open={create} close={()=>setCreate(false)} categories={categories} subcategories={subcategories} suppliers={suppliers}/>
    </div>
  )
}

export default Brands;