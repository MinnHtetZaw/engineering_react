import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import styled from "styled-components";
import { api } from '../../../utilities/api/apiResource';

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


const CreateLevel = (props)=>{

    const [levelName,setLevelName]=useState("");
    const [levelDescription,setLevelDescription]=useState("");
    const [levelCode,setLevelCode]=useState("");

    const levelData={
        zone_id: props.zoneID,
        shelf_id: props.shelfID,
        level_code:levelCode,
        level_name: levelName,
        level_description: levelDescription,
    };

    const addLevel = async()=>{
    try{
        await api.post("level_store",levelData)
        props.close()
    }catch(err){}
    window.location.reload()
    }
    return(
        <div>
            {console.log(levelData)}
            <Dialog open={props.open} onClose={props.close}>
          <DialogTitle className="text-center">
            <Title>Create A New Shelf</Title>
          </DialogTitle>
          <DialogContent>
            <Form>
            <div className="row m-3">
                <Input
                  type="text"
                  value={levelCode}
                  onChange={(e) => setLevelCode(e.target.value)}
                  placeholder="Level Code"
                />
              </div>
              <div className="row m-3">
                <Input
                  type="text"
                  value={levelName}
                  onChange={(e) => setLevelName(e.target.value)}
                  placeholder="Level Name"
                />
              </div>
              <div className="row">
                <Input
                  type="text"
                  value={levelDescription}
                  onChange={(e) => setLevelDescription(e.target.value)}
                  placeholder="Level Description"
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
              onClick={addLevel}
              style={{ backgroundColor: "#5a8dee", color: "white" }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        </div>
    )
}

export default CreateLevel;