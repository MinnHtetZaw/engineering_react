import React, {useState,useEffect} from 'react'
import Nav from "../../components/Sidebar/Nav"
import AccDialog from "../../components/Projects/AccDialog"
import AccDialogOne from "../../components/Projects/AccDialogOne"
import {useSelector} from "react-redux"
import { api } from "../../utilities/api/apiResource";
import { useNavigate } from 'react-router-dom'


const ProjectRegister = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [showDialogOne, setShowDialogOne] = useState(false);
  const [projectname, setProjectname] = useState('');
  const [contactperson, setContactperson] = useState('');
  const [projectvalue, setProjectvalue] = useState('');
  const [expectedbudget, setExpectedbudget] = useState('');
  const [customer, setCustomer] = useState('');
  const [description, setDescription] = useState('');
  const [contactpersonphone, setContactpersonphone] = useState('');
  const [contactpersonteam, setContactpersonteam] = useState('');
  const [email, setEmail] = useState('');
  const [rfqfile, setRfqfile] = useState(null);
  const [estimatedate, setEstimatedate] = useState('');
  const [submissiondate, setSubmissiondate] = useState('');
  const [location, setLocation] = useState('');
  const [currency,setCurrency] = useState([]);
  const [currencyid,setCurrencyId] = useState('');
  const [currencyidd,setCurrencyIdd] = useState('');
  const accounts = useSelector((state)=>state.account);
  const navigate = useNavigate()

      
 
  const pj_val = (e) => {
     setShowDialog(true);
     setCurrencyId(e.target.value);
  }
  const ex_val = (e) =>{
    setShowDialogOne(true);
    setCurrencyIdd(e.target.value);
  }

const data ={
  projectname : projectname,
  location : location,
  contactperson : contactperson,
  projectvalue : projectvalue,
  expectedbudget: expectedbudget,
  customer_id: customer,
  description: description,
  phone: contactpersonphone,
  team: contactpersonteam,
  email: email,
  rfqfile: rfqfile,
  estimatedate: estimatedate,
  submissiondate: submissiondate,
  accountcoderev : accounts.accountcoderev,
  accountnamerev : accounts.accountnamerev,
  accountcoderec : accounts.accountcoderec,
  accountnamerec : accounts.accountnamerec,
  accountcodecog : accounts.accountcodecog,
  accountnamecog : accounts.accountnamecog,
  accountcodepay : accounts.accountcodepay,
  accountnamepay : accounts.accountnamepay,
  currency : currencyid,
  currency_id : currencyidd,
}

  const saveproject = (event) =>{
    event.preventDefault();
api.post('project',data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    )
    .then((res)=>
    navigate(-1))
  }
  useEffect(()=>{
    const getCurrency = async () =>{
      try{
        const res = await api.get("currency");
     
      setCurrency(res.data.currency);
      }catch(err){ }
    }
    getCurrency();

   },[]);
  return (
    <div>
        <Nav/>
        <div className='row m-2'>
            <div className='col-12 ma-auto'>
                <div className='card border-0 p-3 shadow-sm rounded-lg'>
                <h5 className='text-center mt-2'>Sale Project Register</h5>
                <form>
                <div className='row  my-3'>
                <div className="col-6">
                <label  className="form-label">Project Name</label>
                <input type="text" className="form-control" placeholder="Enter Project Name" onChange={(e)=>setProjectname(e.target.value)}/>
                </div>
                <div className="col-6">
                <label  className="form-label">Contact Person Phone</label>
                <input type="text" className="form-control"  placeholder="Enter Phone Number" onChange={(e)=>setContactpersonphone(e.target.value)}/>
                </div> 
                </div>
                <div className='row  my-3'>
                <div className="col-6">
                <label className="form-label">Location</label>
                <select className="form-select" aria-label="Default select example" name="location" onChange={(e)=>setLocation(e.target.value)}>
                <option hidden>Choose Location</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </select>
                </div>
                <div className="col-6">
                <label  className="form-label">Contact Person Team</label>
                <input type="text" className="form-control" name="contact_team" id="exampleFormControlInput1" placeholder="Enter Contact Person Team" onChange={(e)=>setContactpersonteam(e.target.value)}/>
                </div> 
                </div>
                <div className='row  my-3'>
                <div className="col-6">
                <label  className="form-label">Project Contact Person</label>
                <input type="text" className="form-control" name="contact_person" id="exampleFormControlInput1" placeholder="Enter Project Contact Person" onChange={(e)=>setContactperson(e.target.value)}/>
                </div>
                <div className="col-6">
                <label  className="form-label">Email Address</label>
                <input type="email" className="form-control" name="email" id="exampleFormControlInput1" placeholder="Enter Address" onChange={(e)=>setEmail(e.target.value)}/>
                </div> 
                </div>
                <div className='row  my-3'>
                <div className="col-4">
                <label  className="form-label">Project Value</label>
                <input type="text" className="form-control" name='pro_value' placeholder="Enter Project Value" onChange={(e)=>setProjectvalue(e.target.value)}/>
                </div>
                
                <div className="col-2">
                <label className="form-label">Currency</label>
                <select className="form-select" name="curr1" aria-label="Default select example"  onChange={pj_val}>
                <option hidden>Choose</option>
                {currency.map(curr=>(
                    <option  key={curr.id} value={curr.id}>
                       {curr.name}
                    </option>
                     ))}
                </select>
                </div>
                <div className="col-6">
                <label  className="form-label">RFQ File</label>
                <input type="file" className="form-control"  placeholder="Enter RFQ File" onChange={(e)=>setRfqfile(e.target.files[0])}/>
                </div> 
                </div>
                <div className='row  my-3'>
                <div className="col-4">
                <label className="form-label">Expected Budget</label>
                <input type="text" className="form-control" name="ex_budget" id="exampleFormControlInput1" placeholder="Enter Expected Budget" onChange={(e)=>setExpectedbudget(e.target.value)}/>
                </div>
                <div className="col-2">
                <label  className="form-label">Currency</label>
                <select className="form-select" name="curr2" aria-label="Default select example" onChange={ex_val}>
                <option hidden>Choose</option>
                {currency.map(curr=>(
                    <option  key={curr.id} value={curr.id}>
                       {curr.name}
                    </option>
                     ))}
                </select>
                </div>
                <div className="col-6">
                <label  className="form-label">Estimate Start Date:</label>
                <input type="date" className="form-control" name="start_date" id="exampleFormControlInput1" placeholder="Enter Estimate Start Date" onChange={(e)=>setEstimatedate(e.target.value)}/>
                </div> 
                </div>
                <div className='row  my-3'>
                <div className="col-6">
                <label  className="form-label">Project Owner</label>
                <select className="form-select" name='owner_list' aria-label="Default select example" onChange={(e)=>setCustomer(e.target.value)}>
                <option hidden>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </select>
                </div>
                <div className="col-6">
                <label className="form-label">Tinder Quotation Submission Date:</label>
                <input type="date" className="form-control" name='sub_date' id="exampleFormControlInput1" placeholder="" onChange={(e)=>setSubmissiondate(e.target.value)}/>
                </div> 
                <div className="col-6 my-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" name='description' id="exampleFormControlTextarea1" rows="3" onChange={(e)=>setDescription(e.target.value)}></textarea>
                </div>
                </div>
                <div className='text-center'>
                  <button className='btn btn-m btn-primary px-3' onClick={saveproject}>Submit</button>
                </div>
                </form>
                </div>
            </div>
        </div>
        {/*start project value modal */}
        <AccDialog open={showDialog} close={()=>setShowDialog(false)}/>
        <AccDialogOne open={showDialogOne} close={()=>setShowDialogOne(false)}/>
        {/* end project value modal */}
    </div>
  )
}

export default ProjectRegister;