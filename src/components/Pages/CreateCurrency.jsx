import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import styled from "styled-components";
import { api } from './../../api/apiResource';


const Form = styled.form`
  min-width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
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

const CreateCurrency = (props) => {

  const [currencyCode, setCurrencyCode] = useState("");
  const [currencyName, setCurrencyName] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");

  const data = {
    code: currencyCode,
    name: currencyName,
    exchange_rate: exchangeRate,
    last_update: lastUpdate
  };

    const addCur = async () => {
        try{
            await api.post("currency", data)
        } catch(err){}
        window.location.reload()
    }

  return (
    <div>
        <Dialog open={props.open} onClose={props.close}>
          <DialogTitle className="text-center">
            <Title>Create A New Currency</Title>
          </DialogTitle>
          <DialogContent>
            <Form>
              <div className="row">
                <Input
                  type="text"
                  value={currencyCode}
                  onChange={(e) => setCurrencyCode(e.target.value)}
                  placeholder="Currency Code"
                />
              </div>
              <div className="row m-3">
                <Input
                  type="text"
                  value={currencyName}
                  onChange={(e) => setCurrencyName(e.target.value)}
                  placeholder="Currency Name"
                />
              </div>
              <div className="row m-1">
                <Input
                  type="text"
                  value={exchangeRate}
                  onChange={(e) => setExchangeRate(e.target.value)}
                  placeholder="Exchange Rate"
                />
              </div>
              <label className="m-3" style={{width: '100%', paddingLeft: '20px'}}>Last Update Date</label>
              <div className="row">
                <Input
                  type="date"
                  value={lastUpdate}
                  onChange={(e) => setLastUpdate(e.target.value)}
                  placeholder=""
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
              onClick={addCur}
              style={{ backgroundColor: "#5a8dee", color: "white" }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

    </div>
  );
};

export default CreateCurrency;
