import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import styled from "styled-components";
import { api } from "../../../utilities/api/apiResource";

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



const CreateZone=(props)=>{

const[zoneName,setZoneName]=useState("");
const[zoneDescription,setZoneDescription]=useState("");

const data={
    zoneName: zoneName,
    zoneDescription : zoneDescription
}

const addZone = async ()=>{

    try{
        await api.post("zone_store", data)
    }catch(err){}
    window.location.reload()
    
}

    return(
        <div>
            <Dialog open={props.open} onClose={props.close}>
          <DialogTitle className="text-center">
            <Title>Create A New Zone</Title>
          </DialogTitle>
          <DialogContent>
            <Form>
             
              <div className="row m-3">
                <Input
                  type="text"
                  value={zoneName}
                  onChange={(e) => setZoneName(e.target.value)}
                  placeholder="Zone Name"
                />
              </div>
              <div className="row">
                <Input
                  type="text"
                  value={zoneDescription}
                  onChange={(e) => setZoneDescription(e.target.value)}
                  placeholder="Zone Description"
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
              onClick={addZone}
              style={{ backgroundColor: "#5a8dee", color: "white" }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        </div>
    )

}

export default CreateZone;