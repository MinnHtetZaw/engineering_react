import React,{useState} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import styled from 'styled-components';

import { api } from '../../../utilities/api/apiResource';


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

const CreateBrand = (props) => {

  const [brandCode, setBrandCode] = useState('');
  const [brandName, setBrandName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subcategoryId, setSubCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [supplierId, setSuppliers] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('');

  const data = {
    brand_code: brandCode,
    brand_name: brandName,
    category_id: categoryId,
    subcategory_id: subcategoryId,
    description: description,
    supplier_id: supplierId,
    country_of_origin: countryOfOrigin
  }

  const addBrand = async () => {
    try{
        await api.post("brand", data)
    } catch(err){}
    window.location.reload()
  }

 

  return (
    <div>
        <Dialog open={props.open} onClose={props.close}>
        <DialogTitle  className='text-center'><Title>Create A New Brand</Title></DialogTitle>
        <DialogContent>
          <Form>
            <div className='row'>
                <Input value={brandCode} onChange={(e) => setBrandCode(e.target.value)} type="text" placeholder="Brand Code"/>
            </div>
            <div className='row m-3'>
                <Input value={brandName} onChange={(e) => setBrandName(e.target.value)} type="text" placeholder="Brand Name"/>
            </div>
            <div className='row'>
                <select className="form-select mb-3" style={{minWidth: '340px', borderBlockColor: '#cccccc'}} aria-label="Default select example"
                value={categoryId} onChange={(e) => setCategoryId(e.target.value)} name="">
                  <option hidden>Choose Related Category</option>
                    {
                      props.categories.map((category) => (
                        <option value={ category.id }>{ category.category_name }</option>
                      ))
                    }
                </select>
            </div>
            <div className='row'>
                <select className="form-select mb-1.5" style={{minWidth: '340px', borderBlockColor: '#cccccc'}} aria-label="Default select example"
                value={subcategoryId} onChange={(e) => setSubCategoryId(e.target.value)} name="">
                  <option hidden>Choose Related Sub Category</option>
                    {
                      props.subcategories.map((subcategory) => (
                        <option value={ subcategory.id }>{ subcategory.subcategory_name }</option>
                      ))
                    }
                </select>
            </div>
            <div className='row mt-4 pl-4 s'>
              <textarea className="form-control" style={{minWidth: '340px', borderBlockColor: '#cccccc'}} 
              value={description} onChange={(e)=>setDescription(e.target.value)} name='' rows="5" placeholder='Description' />
            </div>
            <div className='row mt-3' style={{maxWidth: '340px', minWidth: '340px'}}>
                {/* <Multiselect options={suppliersoptions} displayValue="SuName"/> */}
                <select className="form-select mb-1.5" style={{minWidth: '340px', borderBlockColor: '#cccccc'}} aria-label="Default select example"
                value={supplierId} onChange={(e) => setSuppliers(e.target.value)} name="">
                  <option hidden>Choose Supplier</option>
                    {
                      props.suppliers.map((supplier) => (
                        <option value={ supplier.id }>{ supplier.name }</option>
                      ))
                    }
                </select>
            </div>
            <div className='row mt-3'>
                <Input value={countryOfOrigin} onChange={(e) => setCountryOfOrigin(e.target.value)} type="text" placeholder="Country of Region"/>
            </div>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} style={{backgroundColor: '#5a8dee', color: 'white'}}>Cancel</Button>
          <Button onClick={addBrand} style={{backgroundColor: '#5a8dee', color: 'white'}}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateBrand;