import  React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import {useDispatch} from "react-redux";
import {addAccountOne} from "../../../utilities/redux/accountRedux"


const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
    border: 1px solid;
    border-radius:10px;
`


export default function AccDialogOne(props) {
  const [accountcodecog,setAccountcodecog] = useState('');
       const [accountnamecog,setAccountnamecog] = useState('');
       const [accountcodepay,setAccountcodepay] = useState('');
       const [accountnamepay,setAccountnamepay] = useState('');
       const [dialog,setDialog] =useState(true);
       const dispatch = useDispatch();

       const accountsave = (props) =>{
            dispatch(addAccountOne({
              accountcodecog,
              accountnamecog,
              accountcodepay,
              accountnamepay
            }))
            setDialog(false);
       }
  return (
    <div>
      {
        dialog ? (
          <Dialog open={props.open} onClose={props.close}>
        <DialogTitle><b>Add New Revenue And Receiveable Accounting</b></DialogTitle>
        <DialogContent>
          <DialogContentText>
           Create COGS Account
          </DialogContentText>
          <Form>
          <Input type="text" placeholder="Enter Account Code" onChange={(e)=>setAccountcodecog(e.target.value)}/>
              <Input type="text"  placeholder="Enter Account Name" onChange={(e)=>setAccountnamecog(e.target.value)}/>
          </Form>
          <DialogContentText className='mt-4'>
           Create Payable Account
          </DialogContentText>
          <Form>
          <Input type="text"  placeholder="Enter Account Code" onChange={(e)=>setAccountcodepay(e.target.value)}/>
              <Input type="text"  placeholder="Enter Account Name" onChange={(e)=>setAccountnamepay(e.target.value)}/>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
          <Button onClick={accountsave}>Save</Button>
        </DialogActions>
      </Dialog>
        ) : ('')
      }
      
    </div>
  );
}
