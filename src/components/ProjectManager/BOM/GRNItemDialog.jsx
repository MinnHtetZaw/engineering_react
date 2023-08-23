import React,{useState} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;`

const GRNItem=(props)=>{

    const [serialNo, setSerialNo] = useState("");
    const [model, setModel]= useState("");
    const [size, setSize]= useState("");
    const [color, setColor]= useState("");
    const [dimension, setDimension]= useState("");
    const [hsCode, setHsCode]= useState("");
    const [oSpec, setOSpec]= useState("");

    return (
        <div>
<Dialog open={props.open} onClose={props.close}>
<DialogTitle  className='text-center'><b><span className='text-success'>({props.no}'s)  </span>Supplier Invoice</b>
<DialogContent>
        <Form>

        <div className="row my-3">
                <div className="col-4">
                  <label for="exampleFormControlInput1" className="form-label">
                    Serial No
                  </label>
                  <input
                    value={serialNo}
                    onChange={(e) => setSerialNo(e.target.value)}
                    type="text"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
                <div className="col-4">
                  <label for="exampleFormControlInput1" className="form-label">
                    Model
                  </label>
                  <input
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    type="text"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
                <div className="col-4">
                  <label for="exampleFormControlInput1" className="form-label">
                    Size
                  </label>
                  <input
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    type="text"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="row my-3">
              
                <div className="col-4">
                  <label for="exampleFormControlInput1" className="form-label">
                    Color
                  </label>
                  <input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    type="text"
                    className="form-control"
                    name="contact_team"
                    placeholder=""
                  />
                </div>
                <div className="col-4">
                  <label for="exampleFormControlInput1" className="form-label">
                    Dimensions
                  </label>
                  <input
                    value={dimension}
                    onChange={(e) => setDimension(e.target.value)}
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder=""
                  />
                </div>
                <div className="col-4">
                  <label for="exampleFormControlInput1" className="form-label">
                    HS Code
                  </label>
                  <input
                    value={hsCode}
                    onChange={(e) => setHsCode(e.target.value)}
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder=""
                  />
                </div>
                <div className="row my-3">
                <div className="col-6">
                  <label for="exampleFormControlTextarea1" className="form-label">
                    Other Specification
                  </label>
                  <textarea
                    value={oSpec}
                    onChange={(e) => setOSpec(e.target.value)}
                    className="form-control"
                    name=""
                    rows="3"
                  />
                </div>
              </div>
              
               
              </div>
        </Form>
    </DialogContent>
  </DialogTitle>
</Dialog>
        </div>
    )
}

export default GRNItem;