import React, { useState } from 'react';
import Nav from "../Sidebar/Nav"

import { useNavigate } from 'react-router-dom';
import { api } from '../../api/apiResource';

const formtitle = {
  textAlign: 'center',
  backgroundColor: '#5a8dee',
  padding: '1rem',
  color: '#ffffff'
}

const AddSupplier = () => {


    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');

    const [social, setSocial] = useState('');
    const [department, setDepartment] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [sector, setSector] = useState('');
    const [phone, setPhone] = useState('');
    const [fax, setFax] = useState('');
    const [rank, setRank] = useState('');
    const [remark, setRemark] = useState('');

    const data = {
      name: name,
      email: email,
      website: website,
      // brand: brand,
      social: social,
      department: department,
      address: address,
      country: country,
      sector: sector,
      phone: phone,
      fax: fax,
      rank: rank,
      remark: remark
    }

    const addSupp = async () => {
      try{
          await api.post("supplier", data)
      } catch(err){}
      navigate('/suppliers')
    }


  return (
    <div>
      <Nav />
      <div className='row m-2'>
        <div className='col-12 ma-auto'>
          <div className='card border-0 p-3 shadow-sm rounded-lg bg-soft'>
            <h5 className='text-center mt-2' style={formtitle}>Add Supplier</h5>
            <form>
              <div className='row  my-3'>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="" />
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">Country</label>
                  <input value={country} onChange={(e) => setCountry(e.target.value)} type="text" className="form-control" placeholder="" />
                </div>
              </div>
              <div className='row  my-3'>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="" />
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">Sector</label>
                  <input value={sector} onChange={(e) => setSector(e.target.value)} type="text" className="form-control" name="contact_team" placeholder="" />
                </div>
              </div>
              <div className='row  my-3'>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">Website</label>
                  <input value={website} onChange={(e) => setWebsite(e.target.value)} type="text" className="form-control" name="contact_person" placeholder="" />
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">Phone</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} type="number" className="form-control" name="number" placeholder="" />
                </div>
              </div>
              {/* <Multiselect options={brandoptions} displayValue="Brand" /> */}
              <div className='row  my-3'>
                {/* <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">Brand</label>
                  <select className="form-select" aria-label="Default select example"
                   value={brand} onChange={(e)=>setBrand(e.target.value)} name="">
                    <option hidden>Choose Brand</option>
                    {
                      brands.map((brand) => (
                        <option value={brand.id}>{brand.brand_name}</option>
                      ))
                    }
                    
                  </select>
                </div> */}
                <div className="col-6">
                </div>
              </div>
              <div className='row  my-3'>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">Social</label>
                  {/* <Multiselect options={socialoptions} displayValue="Logo" /> */}
                  <select className="form-select" aria-label="Default select example" 
                  value={social} onChange={(e)=>setSocial(e.target.value)} name="">
                    <option hidden>Choose Social</option>
                    <option value="facebook">Facebook</option>
                    <option value="twitter">Twitter</option>
                    <option value="viber">Viber</option>
                    <option value="linkedIn">LinkedIn</option>
                  </select>
                </div>
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">Rank</label>
                  <input value={rank} onChange={(e) => setRank(e.target.value)} type="text" className="form-control" name='pro_value' placeholder="" />
                </div>
              </div>
              <div className='row'>
                <div className="col-6 my-3">
                  <label for="exampleFormControlInput1" className="form-label">Department</label>
                  <input value={department} onChange={(e) => setDepartment(e.target.value)} type="text" className="form-control" placeholder="" />
                </div>
                <div className="col-6 my-3">
                  <label for="exampleFormControlInput1" className="form-label">Fax</label>
                  <input value={fax} onChange={(e) => setFax(e.target.value)} type="text" className="form-control" name='pro_value' placeholder="" />
                </div>
              </div>
              <div className='row my-3'>
                <div className="col-6 my-3">
                  <label for="exampleFormControlTextarea1" className="form-label">Address</label>
                  <textarea className="form-control" value={address} onChange={(e)=>setAddress(e.target.value)} name='' rows="4" />
                </div>
                <div className="col-6 my-3">
                  <label for="exampleFormControlTextarea1" className="form-label">Remark</label>
                  <textarea className="form-control" value={remark} onChange={(e)=>setRemark(e.target.value)} name='' rows="4" />
                </div>
              </div>
              <div className='text-center'>
                <button onClick={addSupp} className='btn btn-m btn-primary px-3'>Create Supplier</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddSupplier;