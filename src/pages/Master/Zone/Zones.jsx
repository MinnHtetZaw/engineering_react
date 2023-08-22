import { useState, useEffect } from "react";
import Nav from "../../../components/Sidebar/Nav";
import styled from "styled-components";
import {DeleteIcon, EditIcon, AddIcon, EyeIcon} from "../../../components/Icons";
import CreateZone from '../../../components/Master/Zone/CreateZone';
import CreateShelf from "../../../components/Master/Shelf/CreateShelf";
import CreateLevel from "../../../components/Master/Level/CreateLevel";
import { api } from "../../../utilities/api/apiResource";

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

const Zones =()=>{



const [create, setZone] = useState(false);
const [zones,getZone]=useState([]);
const [createShelf,setShelf] =useState(false);
const [zoneID,setZoneID]=useState("");
const [shelfs,getShelf]=useState([]);
const [levels,getLevel]=useState([]);
const [createLevel,setLevel]=useState(false);
const [shelfID,setShelfID]=useState("");

const create_zone = () =>{
    setZone(true);
    setShelf(false)
    setLevel(false)
}

const create_shelf = (e,id)=>{
 
   e.preventDefault()
   setZoneID(id);
    setShelf(true)
    setZone(false)
    setLevel(false)
}

const create_level = (e,zoneId,shelfID)=>{
    e.preventDefault()
    setZoneID(zoneId)
    setShelfID(shelfID)
    setShelf(false)
    setZone(false)
    setLevel(true)
}

const showCollapse = (e, id) => {
    e.preventDefault();
    if (document.getElementById("show_shelf" + id).getAttribute("value") === "0")
    {
      document.getElementById("show" + id).hidden = false;
      document.getElementById("show_shelf" + id).setAttribute("value", "1");
    } else {
      document.getElementById("show" + id).hidden = true;
      document.getElementById("show_shelf" + id).setAttribute("value", "0");
    }
    
  };
const showCollapseLevel =(e,id)=>{
    e.preventDefault();
    if (document.getElementById("show_level" + id).getAttribute("value") === "0")
    {
      document.getElementById("showlevel" + id).hidden = false;
      document.getElementById("show_level" + id).setAttribute("value", "1");
    } else {
      document.getElementById("showlevel" + id).hidden = true;
      document.getElementById("show_level" + id).setAttribute("value", "0");
    }
    
}
useEffect (()=>{

const zoneData = async()=>{

    const res = await api.get("zone")

        getZone(res.data.zone)

    } 

const shelfData= async()=>{

    const res = await api.get("shelf")

        getShelf(res.data.shelf)
    }

const levelData=async()=>{
    const res = await api.get("level")

    getLevel(res.data.level)
}


    levelData()
    shelfData()
    zoneData()
},[]);

    return(
        
        <div>
        <Nav/>
        <div className='flex'>
            <h5 className="col-10 fw-normal text-secondary fb">Zone List</h5>
            <ButtonB className="col-2 btn btn-primary border-0" onClick={create_zone}><AddIcon/> Zone</ButtonB>
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
                                <th scope="col" className="p-2 text-center bod-li">Description</th>
                                <th scope="col" className="p-2 text-center bod-li">Shelf Detail</th>
                                <th scope="col" className="p-2W text-center bod-li">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                               zones ? zones.map((zone) => (
                                <>
                                <tr key={zone.id}>
                                    <td scope="row" className="p-1 text-center ff bod-li">{zone.id}</td>
                                    <td className="p-1 text-center ff bod-li"> {zone.name} </td>
                                    <td className="p-1 text-center ff bod-li"> {zone.description} </td>
                                    <td className="p-1 text-right ff bod-li">
                                    <ButtonB className="offset-3 col-6 btn btn-primary border-0" onClick={(e)=>create_shelf(e,zone.id)}><AddIcon/> Add Shelf</ButtonB>
                                    </td>
                                    <Td className="p-1 text-right ff bod-li">
                                        <ButtonB className="btn btn-primary btn-sm border-0" type="submit"><EditIcon/></ButtonB>
                                        <ButtonR className="btn btn-danger btn-sm border-0" type="submit"><DeleteIcon/></ButtonR>
                                        <ButtonG
                                className="btn btn-success btn-sm border-0 mt-1"
                                href="#"
                                onClick={(e) => showCollapse(e, zone.id)}
                                id={"show_shelf" + zone.id}
                                value="0"
                              >
                                <EyeIcon />
                              </ButtonG>
                                    </Td>
                                    
                                   
                                 
                                </tr>
                                <tr id={"show" + zone.id} hidden >
                                <td colspan="10"  >
                                  <div className="offset-1 col-10">
                                    <table className="table table-striped" >
                                      <thead className="text-light" style={{backgroundColor: 'pink'}}>
                                        <tr className="text-center">
                                          <th className="bod-li">Shelf Name</th>
                                          <th className="bod-li">Description</th>
                                          <th className="bod-li">Action</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {shelfs.map((shelfdata, i) =>
                                          shelfdata?.zone_id === zone.id ? (
                                            <>
                                            <tr className="text-center" key={shelfdata.id}>
                                              <td className="bod-li">{shelfdata?.shelf_name}</td>
                                              <td className="bod-li">{shelfdata?.shelf_description}</td>
                                                <td>
                                            <ButtonG
                                className="btn btn-success btn-sm border-0 mt-1"
                                href="#"
                                onClick={(e) => showCollapseLevel (e, shelfdata.id)}
                                id={"show_level" + shelfdata.id}
                                value="0"
                              >
                                <EyeIcon />
                              </ButtonG>
                              
                                    <ButtonB className="btn btn-primary border-0" onClick={(e)=>create_level(e,zone.id,shelfdata.id)}><AddIcon/>Level</ButtonB>
                                                 </td>
                                            
                                            </tr>
                                                <tr id={"showlevel" + shelfdata.id} hidden >
                                                <td colspan="10">
                                                  <div className="offset-1 col-10">
                                                    <table className="table table-striped">
                                                      <thead className="bg-secondary text-light">
                                                        <tr className="text-center">
                                                          <th className="bod-li">Code</th>
                                                          <th className="bod-li">Name</th>
                                                          <th className="bod-li">Description</th>
                                                        </tr>
                                                      </thead>
                                                      <tbody>
                                                        {levels.map((levelData, i) =>
                                                          levelData?.zone_id === zone.id && levelData?.shelf_id === shelfdata.id ? (
                                                            <tr className="text-center" key={levelData.id}>
                                                              <td className="bod-li">{levelData?.level_code}</td>
                                                              <td className="bod-li">{levelData?.level_name}</td>
                                                              <td className="bod-li">{levelData?.level_description}</td>
                                                            
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
                                ))
                                :""
                            }
                            
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <CreateZone open={create} close={()=>setZone(false)}/>
        <CreateShelf open={createShelf} close={()=>setShelf(false)} zoneID={zoneID}/>
        <CreateLevel open={createLevel} close={()=>setLevel(false)} zoneID={zoneID} shelfID={shelfID}/>
    </div>
    )
}

export default Zones;