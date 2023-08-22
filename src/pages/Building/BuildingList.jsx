import React,{useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import Nav from "../../components/Sidebar/Nav"
import AddBuilding from '../../components/Building/AddBuilding';
import AddFloor from '../../components/Building/AddFloor'
import AddRoom from '../../components/Building/AddRoomDialog'
import ShowRoom from '../../components/Building/ShowRoom'
import { api } from '../../utilities/api/apiResource';

const Building = () => {
    
    const [buildings, setBuilding] = useState([])
    const [create,setShow]=useState(false)
    const [createFloor,setShowFloor]=useState(false)
    const [bid,setBuildingId]=useState(0)
    const [createroom,setShowRoom]=useState(false)
    const [showRoom,showRoomList]=useState(false)
    const [roomData,setRoomData]=useState([])

    const addBuilding = () => {
        setShow(true)
    }

    const addFloor =(id)=>{
        
        setBuildingId(id)
        setShowFloor(true)
    }

    const addRoom =(id)=>{
        setBuildingId(id)
        setShowRoom(true)
    }

    const setShowRoomList=(val)=>{
            setRoomData(val)
            showRoomList(true)
    }

    useEffect(() => {
        const getBuilding = async () => {
            const res = await api.get("building")
            try {
                setBuilding(res.data.buildings)
            } catch (err) {
                
            }
        } 
        getBuilding()
    }, [])
    



    return (
        <>
        <Nav/>
            <div className="row m-3">
            <h5 className="col-10 fw-normal text-secondary">Building Information</h5>
   
            </div>

            <div className="card mx-3">
                <div className="card-body p-4">
                    <h3 className="card-title">Building List</h3>
                    <div className="float-end">
                          <Button  onClick={addBuilding}>Add Building</Button>
        </div>
       
       

	    <ul className="nav nav-pills mt-3 mb-3">

	        <li className=" nav-item"> 
	        	<a href="#navpills-1" className="nav-link active" data-toggle="tab" aria-expanded="false">List View</a> 
	        </li>
	    </ul>

	  
				       
			<div className="tab-content br-n pn">
	        <div id="navpills-1" className="tab-pane active">
	            <div className="card">
				    <div className="card-body">
				        <div className="table-responsive">
				            <table className="table table-hover">
				                <thead className='text-center'>
				                    <tr>
				                        <th>#</th>
				                        <th>Building Name</th>
				                        <th>Rooms per Floor</th>
				                        <th>Floor</th>
				                        <th>Room</th>
				                        <th>Building Details</th>

				                    </tr>
				                </thead>
                                <tbody >
                                    {   
                                    buildings &&(
                                        buildings.map((building,i)=>(
                                            <tr className='text-center' key={building.id}>
                                                <td>{++i}</td>
                                                <td>{building.name}</td>
                                                <td>{building.number_per_floor} Rooms</td>
                                                    {building.floor ===  null ?  
                                                    <>
                                                    <td>
                                                        <Button onClick={(e)=>addFloor(building.id,e)}>Add Floor</Button>    
                                                    </td>
                                                    <td>
                                                    Please Floor Register First
                                                    </td>
                                                    <td>  Need Room Registeration</td>
                                                    </>:  <td>{building.floor.floor_number} Floor</td> 
                                                    }
                                               
                                               {building.floor !== null && building.room.length === 0 && ( 
                                                    <>
                                                    <td>
                                                        <Button onClick={(e)=>addRoom(building.id,e)}>Add Room</Button>    
                                                    </td> 
                                                    <td>
                                                  Need Room Registeration
                                                    </td>
                                                    </>
                                                    
                                               )}
                                                { building.room.length !== 0 && (
                                                    <>
                                                    <td>{building.room.length} Room</td>
                                                     <td>
                                                     <Button onClick={()=>setShowRoomList(building.room)}>Show Rooms</Button> 
                                                 </td> 

                                                    </>

                                                )

                                                }
                                               
                                            </tr>
                                            ))
                                    )
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
             <AddBuilding open={create} close={()=>setShow(false)} />
            <AddFloor open={createFloor} close={()=>setShowFloor(false)} bid={bid} />
            <AddRoom open={createroom} close={()=>setShowRoom(false)} bid={bid}/>
            <ShowRoom open={showRoom} close={()=>showRoomList(false)} roomData={roomData} />
    </>
    )
}

export default Building;