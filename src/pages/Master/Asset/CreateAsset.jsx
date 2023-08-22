import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../../components/Sidebar/Nav";
import { api } from '../../../utilities/api/apiResource';

const formtitle = {
    textAlign: "center",
    backgroundColor: "#5a8dee",
    padding: "1rem",
    color: "#ffffff",
  };

const CreateAsset=()=>{

    let yearDep =0
    
    const navigate= useNavigate();

    const [name,setName]=useState('');
    const [code,setCode]=useState('');
    const [type,setType]=useState(0);
    const [purchaseDate,setPurchaseDate]=useState('');
    const [price,setPrice]=useState('')
    const [salvagePrice,setSalvagePrice]=useState('')
    const [life,setLife]=useState('')
    const [warranty,setWarranty]=useState('')
    const [file,setFile]=useState('');
    const [buildings,setBuilding]=useState([])
    const [buildingID,setBuildingID] = useState(0)
    const [roomID,setRoomID] = useState(0)
    const [rooms,setRoom] =useState([])
    const [existvalue,setExistValue]=useState(0)
    const setDepriciation =()=>{

        if ( price && salvagePrice && life !=null){
           yearDep = (price - salvagePrice) / life
        }
       return yearDep       
}
 const setBuildingtype =(id)=>{

  setBuildingID(id) // eslint-disable-next-line
   buildings.map((el)=>el.id == id ? setRoom(el.room) : [])
 }  

const data={

    name:name,
    code:code,
    type:type,
    purchaseDate:purchaseDate,
    price:price,
    salvagePrice:salvagePrice,
    use_life:life,
    warranty:warranty,
    file:file,
    room_id:roomID
 
}

const addAsset= async (e)=>{

    e.preventDefault()
    data.yearDepriciation =  document.getElementById('yearDepriciation').value
    

    try{
        await api.post("asset_store", data,
        {
            headers: {
            'Content-Type': 'multipart/form-data' 
        }}
        )
        
    
    }catch(err){}

    navigate('/asset');
    
}

useEffect(()=>{

  const getBuilding = async()=>{
    try{
      const res = await api.get("building")
      setBuilding(res.data.buildings)
    }catch(error){

    }
  } 
  getBuilding()
},[])

    return(
        <div>
     
<Nav/>
      <div className="row m-2">
        <div className="col-12 ma-auto">
          <div className="card border-0 p-3 shadow-sm rounded-lg">
            <h5 className="text-center mt-2" style={formtitle}>
              Create New Asset
            </h5>
            <form>
              <div className="row my-3">
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Asset Name
                  </label>
                  <input
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    type="text"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Code
                  </label>
                  <input
                    value={code}
                    onChange={(e)=>setCode(e.target.value)}
                    type="text"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
              </div>

              <div className="row my-3">
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                   Type
                  </label>
                  <select className="form-control" name="" id="" value={type} onChange={(e)=>setType(e.target.value)}>

                    <option hidden>Choose Type</option>
                    <option value="Aircon">Aircon</option>
                    <option value="Computer">Computer</option>
                    <option value="Mobile">Mobile</option>
                    <option value="CCTV">CCTV</option>
                    <option value="Furniture">Furniture</option>

                  </select>
                
                </div>
                <div className="col-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Zone
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={buildingID}
                    onChange={(e) => setBuildingtype(e.target.value)}
                  >
                    <option hidden>Choose Building</option>
                    {buildings.map((building) => (
                      <option value={building.id}>{building.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Room
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={roomID}
                    onChange={(e) => setRoomID(e.target.value)}
                    name=""
                  >
                    {console.log(rooms)}
                    <option hidden>Choose Room</option>
                    {rooms.map((room) => (
                      <option value={room.id}>{room.room_number}</option>
                    ))}
                  </select>
                </div>
               
              </div>
              <div className="row my-3">
              <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Purchase Date
                  </label>
                  <input
                    value={purchaseDate}
                    onChange={(e)=>setPurchaseDate(e.target.value)}
                    type="date"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Existing
                  </label>
                  <div className="row my-2 mx-3">
                      <div class="form-check col-3">
                        <input class="form-check-input" type="radio" name="exist" value='1' onChange={(e)=>setExistValue(e.target.value)}/>
                        <label class="form-check-label" for="">
                         Yes
                        </label>
                      </div>
                      <div class="form-check col-3">
                        <input class="form-check-input" type="radio" name="exist" value='0' onChange={(e)=>setExistValue(e.target.value)}/>
                        <label class="form-check-label" for="">
                         No
                        </label>
                      </div>
                  </div>
                     
                </div>
               
               
              </div>
              <div className="row my-3">
              <div className="col-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Initial Price
                  </label>
                  <input
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                    type="number"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
               
                <div className="col-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Current Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="contact_team"
                   disabled
                  />
                </div>
                { existvalue == 1 &&(
                  <>
                   <div className="col-3">
                   <label for="exampleFormControlInput1" className="form-label">
                     Used Year
                   </label>
                   <input
                   
                     type="number"
                     className="form-control"
                     name="contact_team"
                     placeholder=""
                   />
                 </div>
                  <div className="col-3">
                  <label for="exampleFormControlInput1" className="form-label">
                  Depriciation Total
                  </label>
                  <input
                
                    type="number"
                    className="form-control"
                    name="contact_team"
                  disabled
                  />
                </div>
                </>
                )
                }
              
                
              </div>

              <div className="row my-3">
              <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Salvage Price
                  </label>
                  <input
                    value={salvagePrice}
                    onChange={(e)=>setSalvagePrice(e.target.value)}
                    type="number"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Warranty (Months)
                  </label>
                  <input
                    value={warranty}
                    onChange={(e)=>setWarranty(e.target.value)}
                    type="text"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
            
                 
                </div>
              <div className="row my-3">
              <div className="col-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Usable Life
                  </label>
                  <input
                    value={life}
                    onChange={(e)=>setLife(e.target.value)}
                    type="number"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
                <div className="col-3">
                
                <label for="exampleFormControlInput1" className="form-label">
                  Yearly Depriciation
                </label>
                <input
                  value={setDepriciation(yearDep)}
                  id="yearDepriciation"
                  type="number"
                  className="form-control"
                  name="contact_team"
                  placeholder=""
                  disabled
                />
              </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Warranty Documentation
                  </label>
                  <input
                   
                    onChange={(e)=>setFile(e.target.files[0])}
                    type="file"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
                </div>
              
              <div className="text-center mt-4">
                <button className="btn btn-m btn-primary px-3" onClick={addAsset}>
                  Create Item
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    )

}

export default CreateAsset;