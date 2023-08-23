import React,{useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../utilities/api/apiResource';

const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Label = styled.h5`
    font-size: 19px;
    font-weight: 300;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
    border: 1px solid;
    border-radius:10px;
    width : 250px;
`

const Radio = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`
const Select = styled.select`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
    border: 1px solid;
    border-radius:10px;
    width : 250px;
`
const Option = styled.option`
    flex: 1;
    padding: 10px;
    border: 1px solid;
    border-radius:10px;
`

const CreateDialog = (props) => {
    const [items,setItems] = useState([]);
    const [ccnames,setCcnames] = useState([]);
    const [currency,setCurrency] = useState([]);
    const [projects,setProjects] = useState([]);
    const [code,setCode] = useState('');
    const [name,setName] = useState('');
    const [type,setType] = useState('');
    const [costcenter,setCostcenter] = useState('');
    const [balance,setBalance] = useState('');
    const [curr,setCurr] = useState('');
    const [carry,setCarry] = useState('');
    const [related,setRelated] = useState('');
    const [proj,setProj] = useState('');
    const [show,setShow] = useState(false);
    const [dialog,setDialog] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
      const getItems = async () =>{
        try{
          const res = await api.get("account_type");

          setItems(res.data.type);
          
        }catch(err){}
      };
      const getCcnames = async () =>{
        try{
          const res = await api.get("cost_center");
      
          setCcnames(res.data.name);
        }catch(err){}
      };
      const getCurrency = async () =>{
        try{
          const res = await api.get("currency");
        
          setCurrency(res.data.name);
        }catch(err){}
      };
      const getProjects = async () =>{
        try{
          const res = await api.get("project");
       
          setProjects(res.data.project);
        }catch(err){}
      };
      getItems();
      getCcnames();
      getCurrency();
      getProjects();
    },[]);

    const saveaccount = () =>{
      api.post('accounting',{
        code :  code,
        name : name,
        type : type,
        costcenter : costcenter,
        balance : balance,
        curr : curr,
        carry : carry,
        related : related,
        projectid : proj,
  }).then(function(response){
      alert('success store');
      setDialog(false);
      navigate('/accounts');
  })
    }

  const showProject = (val) =>{
    setRelated(val);
    if(val == 1){
      setShow(true);
    }else{
      setShow(false);
    }
  }

  return (
    <div>
       {
        dialog ? 
        <Dialog open={props.open} onClose={props.close}>
        <DialogTitle  className='text-center'><b>Create A New  Account</b></DialogTitle>
        <DialogContent>
          <Form>
            <div className='row'>
                <div className='col-6'>
                <Input type="text"  placeholder="Enter Account Code" onChange={(e)=>setCode(e.target.value)}/>
                </div>
                <div className='col-6'>
                <Input type="text" placeholder="Enter Account Name" onChange={(e)=>setName(e.target.value)}/>
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                  <Select onChange={(e)=>setType(e.target.value)}>
                    <Option hidden>
                        Choose Account Type
                    </Option>
                    {items.map(item=>(
                    <Option  key={item.id} value={item.id}>
                       {item.type_name}
                    </Option>
                     ))}
                  </Select>
                </div>
                <div className='col-6'>
                <Select onChange={(e)=>setCostcenter(e.target.value)}>
                    <Option hidden>
                        Choose Cost Center Name
                    </Option>
                    {ccnames.map(cc=>(
                    <Option  key={cc.id} value={cc.id}>
                       {cc.name}
                    </Option>
                     ))}
                  </Select>
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                <Input type="text" placeholder="Enter Balance" onChange={(e)=>setBalance(e.target.value)}/>
                </div>
                <div className='col-6'>
                <Select onChange={(e)=>setCurr(e.target.value)}>
                    <Option hidden>
                        Choose Currency
                    </Option>
                    {currency.map(curr=>(
                    <Option  key={curr.id} value={curr.id}>
                       {curr.name}
                    </Option>
                     ))}
                  </Select>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-5 my-2 '>
                <Label className='text-center mt-3'>Carried Forward</Label>
                <Label className='text-center mt-4'>Project Related</Label>
                </div>
                <div className='offset-1 col-5 my-2'>
                <div className='row mb-2'>
                    <div className='col-6'>
                    <Radio type="radio" name="carry" onChange={(e)=>setCarry(e.target.value)} value='1'/>YES
                    </div>
                    <div className='col-6'>
                    <Radio type="radio" name="carry" onChange={(e)=>setCarry(e.target.value)} value='0'/>NO
                    </div>
                </div>
                <div className='row mb-2'>
                    <div className='col-6'>
                    <Radio type="radio" name="relate" onChange={(e)=>showProject(e.target.value)} value='1'/>YES
                    </div>
                    <div className='col-6'>
                    <Radio type="radio" name="relate" onChange={(e)=>showProject(e.target.value)} value='0'/>NO
                    </div>
                </div>
                </div>
            </div>
            {
              show ? <div className='row'>
              <div className='offset-6 col-6'>
              <Select onChange={(e)=>setProj(e.target.value)}>
                  <Option hidden>
                      Choose Project
                  </Option>
                  {projects.map(project=>(
                  <Option  key={project.id} value={project.id}>
                     {project.name}
                  </Option>
                   ))}
                </Select>
              </div>
          </div> : ''
            }   
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
          <Button onClick={saveaccount}>Save</Button>
        </DialogActions>
      </Dialog> : ''
    }
    </div>
  )
}

export default CreateDialog