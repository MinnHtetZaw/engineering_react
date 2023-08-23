
import Nav from "../../../../components/Sidebar/Nav";
import styled from "styled-components";
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from "../../../../utilities/api/apiResource";


const Img = styled.img`
    width: 40%;
    height: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left : 30%;
`

const AssetDetail = () => {

    const {id} = useParams();
    const [asset, setAssetDetail] = useState([]);
  

    useEffect(() => {
     
               api.get("asset/"+id)
                .then((res) => {
                    setAssetDetail(res.data.assetData);
                })
            
    }, []);

 
    return (

    <div>
        <Nav/>
        <div className='flex'>
            <h5 className="col-10 fw-normal text-secondary fb">Asset Detail</h5>
           
        </div>
        
        <div className="row m-1">
            <div className="col-12 ma-auto">
                <div className="tab-content" id="pills-tabContent">
                    <div className="card mt-3">
                        <div className="card-header">Asset Detail</div>
                        <div className="card-body">
                            <h4 className="text-secondary text-center">Warranyt Docs</h4>
                            <Img src={`http://localhost:8000/asset/${asset.warranty_docs}`} className="img-fluid " alt="Responsive image"/>
                            
                            <table className="table table-bordered prod-tab-w">
                                <thead>
                                    <tr>
                                        <td className='small-col'>Asset Name: </td>
                                        <th>{asset.name}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Code: </td>
                                        <th>{asset.code}</th>
                                    </tr>
                                    <tr>
                                        <td>Type: </td>
                                        <th>{asset.type}</th>
                                    </tr>
                                    <tr>
                                        <td>Purchase Date: </td>
                                        <th>{asset.purchase_date}</th>
                                    </tr>
                                    <tr>
                                        <td>Price:</td>
                                        <th>{asset.price} Kyats</th>
                                    </tr>
                                    <tr>
                                        <td>Salvage Price: </td>
                                        <th>{asset.salvage_price}</th>
                                    </tr>
                                    <tr>
                                        <td>Secondary Supplier: </td>
                                        <th>{asset.use_life} Year</th>
                                        
                                    </tr>
                                    <tr>
                                        <td>Yearly Depriciation: </td>
                                        <th>{asset.yearly_depriciation}</th>
                                    </tr>
                                    <tr>
                                        <td>Warranty: </td>
                                        <th>{asset.warranty} Months</th>
                                    </tr>
                                    <tr>
                                        <td>Last Maintenance Date: </td>
                                        <th>{asset.last_maintenance_date?asset.last_maintenance_date:"Not Yet"}</th>
                                    </tr>
                                    <tr>
                                        <td>Next Maintenance Date: </td>
                                        <th>{asset.next_maintenance_date?asset.next_maintenance_date:"Not Yet"}</th>
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

export default AssetDetail;