import React, { useEffect, useState } from 'react'
import Nav from '../Sidebar/Nav'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utilities/api/apiResource';


const AddRequest = () => {

  const navigate = useNavigate()
  
  const [reqno,setReqNo]=useState('')
  const [req_date,setReqDate]=useState('')
  const [due_date,setDueDate]=useState('')
  const [condition,setCondition]=useState('')
  const [remark,setRemark]=useState('')
  const [asset_id,setAssetId]=useState(0)
  const [rooms,setRooms]=useState([])
  const [assets, setAsset] = useState([])
  const [buidlings,setBuilding]=useState([])
  const [bdata, setBuildingData] = useState(0)
  
  const setRoomData = (id) => {
   
    rooms.map((el) => el.id == id ? setAsset(el.assetrequest) :'')
  }
  
  const data=
  {
    request_no:reqno,
    requset_date:req_date,
    due_date:due_date,
    condition:condition,
    remark:remark,
    asset_id:asset_id
  }

  const addRequest = () => {

   
    api.post("request_store", data)
      .then((res) =>
        swal("Successfully!", "Successfully Stored Maintenance form.", "success"),
        navigate(-1)
      )
  }

  useEffect(()=>{

      const getRoom =async()=>{
        const res = await api.get("room_building")
        setRooms(res.data.room)
        setBuilding(res.data.buildings)
      }
      getRoom()
  },[])

  return (

    <>
      <Nav />
      <div className="row mt-5">
        <div className="offset-1 col-10 ma-auto">
          <div className="card shadow-3-strong border-0 p-3 shadow-sm rounded-lg">
            <h5 className="text-center mt-2">
             Request Maintenance Form
            </h5>
          <div className='row'>
          <div className='col-6'>
          <div className="form-group  mt-3">
              <label>Request No.</label>
            <input type="text" className="form-control" onChange={(e)=>setReqNo(e.target.value)}/>
         
          </div>
          </div>
          <div className='col-6'>
          <div className="form-group  mt-3">
              <label>Request Date</label>
              <input type="date" className="form-control" onChange={(e)=>setReqDate(e.target.value)}/>
      </div>	
            </div>
            
      </div>

      <div className='row'>
         
      <div className='col-6'>
          <div className="form-group  mt-3">
                  <label>Due Date</label>
                  <input type="date" className="form-control" onChange={(e)=>setDueDate(e.target.value)}/>
              
          </div>
              </div>
            </div>
            <div className="row">
          <div className='col-4'>
          <div className="form-group  mt-3">
              <label>Building</label>
          <select className='form-control' onChange={(e)=>setBuildingData(e.target.value)}>

                  <option hidden>Choose Building</option>
                  {
                    buidlings.map((buidling) => (
                      <option key={buidling.id} value={buidling.id}>{buidling.name}</option>
                    ))
                }
           </select>
      </div>	
            </div>
            
          <div className='col-4'>
          <div className="form-group  mt-3">
              <label>Room</label>
          <select className='form-control' onChange={(e)=>setRoomData(e.target.value)}>

                  <option hidden>Choose Room</option>
                  {
                    rooms.map((room) => room.building_id == bdata && (
                      <option key={room.id} value={room.id}>{room.room_number}</option>
                    ))
                }
           </select>
         
      </div>	
            </div>
          
           
                <div className='col-4'>
                <div className="form-group  mt-3">
              <label>Asset</label>
              <select className='form-control' onChange={(e)=>setAssetId(e.target.value)}>

                  <option hidden>Choose Asset</option>
                  {
                        assets.map((asset) => (
                           <option key={asset.id} value={asset.id}>{asset.name}</option>
                        ))
                  }
               </select>
         
             </div>	
            </div>
            
     </div>
            <div className='row'>
            <div className='col-12'>
          <div className="form-group  mt-3">
              <label>Condition</label>
               
              
          <textarea className="form-control" onChange={(e) => setCondition(e.target.value)}></textarea>
          </div>
            </div>
            </div>  

          <div className='row'>
         
          <div className='col-12'>
          <div className="form-group  mt-3">
              <label>Requirement Remark</label>
              <textarea className="form-control" onChange={(e)=>setRemark(e.target.value)}></textarea>

      </div>	
          </div>
            </div>
            <div className="text-center mt-5">

              <button className='btn btn-success' onClick={addRequest}>Request</button>
            </div>
          </div>
        
        </div>
        </div>
   </>
  )
}

export default AddRequest