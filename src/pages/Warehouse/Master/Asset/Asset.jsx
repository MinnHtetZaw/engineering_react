import { useState, useEffect } from "react";
import Nav from "../../../../components/Sidebar/Nav";
import styled from "styled-components";
import {DeleteIcon, EditIcon, AddIcon ,DetailIcon, EyeIcon} from "../../../../components/Icons";
import { useNavigate,Link } from "react-router-dom";
import AddMaintenance from '../../../../components/Warehouse/Master/AssetMaintenance/AddMaintenanceDialog'
import ShowMaintenanceDocsDialog from '../../../../components/Warehouse/Master/AssetMaintenance/ShowMaintenanceDocsDialog'
import { api } from "../../../../utilities/api/apiResource";


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
const ButtonG = styled.a`
  margin-right: 10px;
  font-size: 15px;
  background-color: rgb(0, 128, 0);
`;
const ButtonW = styled.button`
  margin-right: 10px;
  font-size: 15px;
  background-color: orange;
  display: inline-block;
`;



const Asset =()=>{

const [assets,getAsset]=useState([]);
const [create,setShow]=useState(false)
const [assetID,setAssetID]=useState('');
const [assetCode,setAssetCode]=useState('')
const [maintenances,getMaintenance]=useState([])
const [createDocs,setShowDocs]=useState('')
const [maintenanceDocs,setMaintenanceDocs]=useState('')

const navigate = useNavigate();

const create_asset = () =>{
    
    navigate('/createAsset')
}

const setDialog=(e,id,code)=>{
    e.preventDefault()
    setAssetCode(code)
    setAssetID(id)
    setShow(true)
}
const showCollapse = (e, id) => {
    e.preventDefault();
    if (
      document.getElementById("show_asset" + id).getAttribute("value") == "0"
    ) {
      document.getElementById("show" + id).hidden = false;
      document.getElementById("show_asset" + id).setAttribute("value", "1");
    } else {
      document.getElementById("show" + id).hidden = true;
      document.getElementById("show_asset" + id).setAttribute("value", "0");
    }
    
  }

 const showMaintenanceDocs =(val)=>{

    setMaintenanceDocs(val)
    setShowDocs(true)
 }

useEffect (()=>{

const assetData = async()=>{

    const res = await api.get("asset")

    getAsset(res.data.assetData)
} 
const maintenanceDate= async()=>{

    const res= await api.get("maintenance")

    getMaintenance(res.data.data)
}
    maintenanceDate()
    assetData()
},[]);

    return(
        
        <div>
        <Nav/>
        <div className='flex'>
            <h5 className="col-10 fw-normal text-secondary fb">Asset List</h5>
            <ButtonB className="col-2 btn btn-primary border-0" onClick={create_asset}><AddIcon/> Asset</ButtonB>
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
                                <th scope="col" className="p-2 text-center bod-li">Code</th>
                                <th scope="col" className="p-2 text-center bod-li">Type</th>
                                <th scope="col" className="p-2 text-center bod-li">Room</th>
                                <th scope="col" className="p-2 text-center bod-li">Warranty</th>
                                <th scope="col" className="p-2 text-center bod-li">Last Maintenance Date</th>
                                <th scope="col" className="p-2 text-center bod-li">Maintenance Action</th>
                                <th scope="col" className="p-2 text-center bod-li">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                           {
                            assets.map((asset,i)=>

                            <>
                                <tr className="text-center">
                                <td className="bod-li">{++i}</td>
                                <td className="bod-li">{asset.name}</td>                                   
                                <td className="bod-li">{asset.code}</td>
                                <td className="bod-li">{asset.type}</td>
                                <td className="bod-li">{asset.room?.room_number}</td>
                                <td className="bod-li">{asset.warranty} Months</td>
                                <td className="bod-li">{asset.last_maintenance_date?asset.last_maintenance_date : "Not Yet"}</td>
                                <td>  
                                <ButtonW
                                  className="btn btn-warning btn-sm border-0"
                                  type="submit"
                                  onClick={(e)=>setDialog(e,asset.id,asset.code)}
                                >
                                  <AddIcon />Maintenance
                                
                                </ButtonW>
                                <ButtonG
                                className="btn btn-success btn-sm border-0 mt-1"
                                href="#"
                                onClick={(e) => showCollapse(e, asset.id)}
                                id={"show_asset" + asset.id}
                                value="0"
                              >
                                <EyeIcon />
                              </ButtonG>
                              
                              </td>

                                <Td className="p-2 text-right ff bod-li">
                              <ButtonB
                                className="btn btn-primary btn-sm border-0"
                                type="submit"
                              >
                                <Link
                                  to={"/asset_detail/" + asset.id}
                                  assest_id={asset.id}
                                  className="text-white"
                                >
                                  <DetailIcon />
                                </Link>
                              </ButtonB>
                              <ButtonB
                                className="btn btn-primary btn-sm border-0"
                                type="submit"
                              >
                                <EditIcon />
                              </ButtonB>
                           
                            
                              <ButtonR
                                className="btn btn-danger btn-sm border-0 mt-1"
                                type="submit"
                              >
                                <DeleteIcon />
                              </ButtonR>
                            </Td>

                                </tr>
                                   <tr id={"show" + asset.id} hidden>
                                   <td colspan="10">
                                     <div>
                                       <table className="table bg-light">
                                         <thead className="bg-secondary text-light">
                                           <tr className="text-center">
                                           <th className="bod-li">Date</th>
                                             <th className="bod-li">Next Maintenance Date</th>
                                             <th className="bod-li">Person</th>
                                             <th className="bod-li">Type</th>
                                             <th className="bod-li">Remark</th>
                                             <th className="bod-li">Docs</th>
                                           </tr>
                                         </thead>
                                         <tbody>
                                           {maintenances.map((maintenance, i) =>
                                             maintenance.asset_id == asset.id ? (
                                               <tr className="text-center">
                                                 <td className="bod-li">{maintenance.last_maintenance_date}</td>
                                                 <td className="bod-li">{maintenance.next_maintenance_date}</td>
                                                 <td className="bod-li">{maintenance.person}</td>
                                                 <td className="bod-li">{maintenance.type}</td>
                                                 <td className="bod-li">{maintenance.remark}</td>
                                                
                                                 <td>  <ButtonG
                                       className="btn btn-success btn-sm border-0 mt-1"
                                       href="#"
                                       onClick={(e)=>showMaintenanceDocs(maintenance.maintenance_docs)}
                                       value="0"
                                     >
                                       <DetailIcon />
                                     </ButtonG></td>
                                               </tr>
                                             ) : (
                                               ""
                                             )  
                                           )}
                                         </tbody>
                                       </table>
                                     </div>
                                   </td>
                                 </tr>
                       </>

                            )}
                           
                            
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <AddMaintenance open={create} close={()=>setShow(false)} assetID={assetID} assetCode={assetCode} />
        <ShowMaintenanceDocsDialog open={createDocs} close={()=>setShowDocs(false)} maintenanceDocs={maintenanceDocs}/>                                    
     
    </div>
    )
}

export default Asset;