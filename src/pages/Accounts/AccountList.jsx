import React,{useState,useEffect} from 'react'
import Nav from "../../components/Sidebar/Nav"
import CreateDialog from '../../components/Accounts/CreateDialog'
import AddIcon from '@mui/icons-material/Add';
import { AiOutlineEdit,AiOutlineDelete } from "react-icons/ai";

import { api } from '../../utilities/api/apiResource';



const AccountList = () => {
  const bgcolor = {
    backgroundColor : '#5a8dee'
  };
  const [create,setCreate] = useState(false);
  const [accountings,setAccountings] = useState([]);

  useEffect(()=>{
    const getAccounting = async () =>{
      try{
        const res = await api.get("accounting");
    
        setAccountings(res.data.accounting);
        
      }catch(err){}
    };
    getAccounting();
  },[])

  const create_acc = () =>{
     setCreate(true);
  }
  return (
    <div>
         <Nav/>
        <div>
        <div className='row m-3'>
        <h5 className="col-10 fw-normal text-secondary">Accounting List</h5>
        <a className="col-2 btn btn-sm btn-primary" onClick={create_acc}>
        <AddIcon />  Create Accounting
        </a>
        <div className='row m-2'>
        <div className='col-12 ma-auto'>
        <div className='card border-0 p-3 shadow-sm rounded-lg'>
        <div className='card-body'>
        <table className="table table-hover table-borderless">
  <thead style={bgcolor}>
    <tr>
      <th scope="col"  className="fw-normal text-white text-center">No</th>
      <th scope="col"  className="fw-normal text-white text-center">Account Name</th>
      <th scope="col"  className="fw-normal text-white text-center">Account Code</th>
      <th scope="col"  className="fw-normal text-white text-center">Type</th>
      <th scope="col"  className="fw-normal text-white text-center">Cost Center</th>
      <th scope="col"  className="fw-normal text-white text-center">Opening</th>
      <th scope="col"  className="fw-normal text-white text-center">Closing</th>
      <th scope="col"  className="fw-normal text-white text-center">Currency</th>
      <th scope="col"  className="fw-normal text-white text-center">Related Project</th>
      <th scope="col"  className="fw-normal text-white text-center">Action</th>
    </tr>
  </thead>
  <tbody>
     {accountings.map((acc,index)=>(
            <tr key={acc.id}>
            <td scope="col"  className="fw-normal  text-center">{++index}</td>
            <td scope="col"  className="fw-normal  text-center">{acc.account_code}</td>
            <td scope="col"  className="fw-normal  text-center">{acc.account_name}</td>
            <td scope="col"  className="fw-normal  text-center">{acc.account_type}</td>
            <td scope="col"  className="fw-normal  text-center">Mg Mg</td>
            <td scope="col"  className="fw-normal  text-center">{acc.opening_balance}</td>
            <td scope="col"  className="fw-normal  text-center">0</td>
            <td scope="col"  className="fw-normal  text-center">{acc.currency.name}</td>
            <td scope="col"  className="fw-normal  text-center">{acc.general_project_flag === 0 ? 'NO' : 'YES ('+acc.project.name+')'}</td>
            <td scope="col"  className="fw-normal  text-center">
            <button className='btn btn-sm btn-warning'><AiOutlineEdit/></button>
            &nbsp;&nbsp;
            <button className='btn btn-sm btn-danger'><AiOutlineDelete/></button>
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
        </div>
        <CreateDialog open={create} close={()=>setCreate(false)}/>
    </div>
  )
}

export default AccountList