import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import styled from "styled-components";

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

const EditReqSpec1 = (props) => {
  

  return (
    <div>
        
        <Dialog open={props.open} onClose={props.close}>
          <DialogTitle className="text-center">
            <Title>Required Specification</Title>
          </DialogTitle>
          <DialogContent>
            <Form>
              <div className="row">
                <label>Required Specification</label>
                <Input
                  type="text"
                  value={props.spec}
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
            
          </DialogActions>
        </Dialog> 

    </div>
  );
};

export default EditReqSpec1;
