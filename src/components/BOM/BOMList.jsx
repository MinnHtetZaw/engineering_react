import React,{useState,useEffect} from 'react'
import Nav from "../Sidebar/Nav"
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { api } from '../../api/apiResource';

const BOMList = () => {
   const [boms,setBoms] = useState([]);
    const bgcolor = {
        backgroundColor : '#5a8dee'
      };

    useEffect(()=>{
      const getBoms = async () =>{
        try{
          const res = await api.get("bom");
          setBoms(res.data.bom);
        }catch(err){}
      };
      getBoms();
    },[]);
  return (
    <div>
        <Nav/>
        <div className='row m-3'>
        <h5 className="col-10 fw-normal text-secondary">Bill Of Material List</h5>
          <Link to="/bom_register" className="col-2 btn btn-sm btn-primary">
          <AddIcon/>Add BOM
        </Link>
        </div>

        <div className='row m-2'>
        <div className='col-12 ma-auto'>
        <div className='card border-0 p-3 shadow-sm rounded-lg'>
        <div className='card-body'>
        <table className="table table-hover table-borderless">
  <thead style={bgcolor}>
    <tr>
      <th scope="col"  className="fw-normal text-white text-center">No</th>
      <th scope="col"  className="fw-normal text-white text-center">BOM No</th>
      <th scope="col"  className="fw-normal text-white text-center">Project Name</th>
      <th scope="col"  className="fw-normal text-white text-center">Product Qty</th>
      <th scope="col"  className="fw-normal text-white text-center">Date</th>
      <th scope="col"  className="fw-normal text-white text-center">Action</th>
    </tr>
  </thead>
  <tbody>

  {boms.map((bom,index)=>(
                <tr >
                <td scope="col"  className="fw-normal  text-center">{++index}</td>
                <td scope="col"  className="fw-normal  text-center">{bom.bom_no}</td>
                <td scope="col"  className="fw-normal  text-center">{bom.project.name}</td>
                <td scope="col"  className="fw-normal  text-center">{bom.num_product_qty}</td>
                <td scope="col"  className="fw-normal  text-center">{bom.date}</td>
                <td scope="col"  className="fw-normal  text-center">
                <button className='btn btn-sm btn-secondary'><span className='tex-white'>Product List</span></button>
                &nbsp;&nbsp;
                <Link to={"/bom_supplier/"+bom.id+'/'+bom.bom_no} className="btn btn-sm btn-warning text-white" >
                 Supplier
                </Link>
                &nbsp;&nbsp;
                <button className='btn btn-sm btn-info text-white'>Price</button>
                &nbsp;&nbsp;
                <button className='btn btn-sm btn-danger text-white'>Attach</button>
                </td>
      </tr>     
  ))}
  
  </tbody>
</table>
        </div>

        </div>
        </div>
        </div>

    </div>
  )
}

export default BOMList