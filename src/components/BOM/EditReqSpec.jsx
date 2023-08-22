import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { changeEdit } from "../../utilities/redux/bomRedux";
import swal from "sweetalert";
import { api } from '../../utilities/api/apiResource';

const Form = styled.form`
  min-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  color: #ffffff;
`;
const DialogTitle = styled.div`
  padding: 8px 0px;
  background-color: #5a8dee;
`;

const Input = styled.input`
  flex: 1;
  width: 340px;
  height: 40px;
  border: 1px solid #cccccc;
  border-radius: 5px;
`;

const EditReqSpec = (props) => {
  const [newspec, setNewSpec] = useState("");
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

    const EditSpec = () => {
       api.post('bomproductspec',{
        id :  props.id,
        spec : newspec,
        type : props.type,
        }).then(function(response){
            dispatch(changeEdit({spec:newspec}));
            setShow(false);
            swal("Successfully!", "Successfully Updated Required Specification.", "success");
        })
        
    }

  return (
    <div>
        {show  ?
        <Dialog open={props.open} onClose={props.close}>
          <DialogTitle className="text-center">
            <Title>Edit Required Specification</Title>
          </DialogTitle>
          <DialogContent>
            <Form>
              <div className="row">
                <label>Old Specification</label>
                <Input
                  type="text"
                  value={props.spec}
                />
              </div>
              <div className="row m-3">
              <label>New Specification</label>
                <Input
                  type="text"
                  onChange={(e) => setNewSpec(e.target.value)}
                  placeholder="Enter New Specification"
                />
              </div>
            </Form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={props.close}
              style={{ backgroundColor: "#5a8dee", color: "white" }}
            >
              Cancel
            </Button>
            <Button
              onClick={EditSpec}
              style={{ backgroundColor: "#5a8dee", color: "white" }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog> : ''
     }
    </div>
  );
};

export default EditReqSpec;
