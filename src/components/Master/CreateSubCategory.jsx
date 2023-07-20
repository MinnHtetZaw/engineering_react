import React,{useState} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import styled from 'styled-components';
import '../../App.css';
import { api } from '../../api/apiResource';

const Form = styled.form`
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    color: #ffffff;
`
const DialogTitle = styled.div`
    padding: 8px 0px;
    background-color: #5a8dee;
`
const Input = styled.input`
    flex: 1;
    width: 340px;
    height: 40px;
    border: 1px solid #cccccc;
    border-radius: 5px;
`

const CreateSubCategory = (props) => {

  const [categoryId, setCategoryId] = useState('');
  const [subcategoryCode, setSubCategoryCode] = useState('');
  const [subcategoryName, setSubCategoryName] = useState('');

  const data = {
    category_id: categoryId,
    subcategory_code: subcategoryCode,
    subcategory_name: subcategoryName
  }

  const addSubCat = async () => {
    try{
        await api.post("sub_category", data)
    } catch(err){}
    window.location.reload()
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.close}>
        <DialogTitle  className='text-center'><Title>Create A New Sub Category</Title></DialogTitle>
        <DialogContent>
          <Form>
            <div className='row'>
                <select className="form-select" style={{minWidth: '340px', borderBlockColor: '#cccccc'}} aria-label="Default select example" 
                value={ categoryId }  onChange={(e) => setCategoryId(e.target.value)} name="">
                  <option hidden>Choose Related Category</option>
                  {
                    props.categories.map((category) => (
                      <option value={ category.id }>{ category.category_name }</option>
                    ))
                  }
                </select>
            </div>
            <div className='row m-3'>
                <Input type="text" value={ subcategoryCode } onChange={(e) => setSubCategoryCode(e.target.value)} placeholder="Sub Category Code"/>
            </div>
            <div className='row'>
                <Input type="text" value={ subcategoryName } onChange={(e) => setSubCategoryName(e.target.value)} placeholder="Sub Category Name"/>
            </div>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} style={{backgroundColor: '#5a8dee', color: 'white'}}>Cancel</Button>
          <Button onClick={addSubCat} style={{backgroundColor: '#5a8dee', color: 'white'}}>Save</Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default CreateSubCategory;