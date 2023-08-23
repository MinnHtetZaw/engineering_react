import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import styled from "styled-components";


const Form = styled.form`
  min-width: 500px;
 
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




const ItemDetail=(props)=>{

const itemData =props.item;

    return(
        <div>
           
            <Dialog open={props.open} onClose={props.close}>
          <DialogTitle className="text-center">
            <Title>Item Detail</Title>
          </DialogTitle>
          <DialogContent>
            <Form>
                <div className="text-center" >
                    <div className="row">
                        <div className="col-6">
                        <label className="form-label">Serial No :</label> 
                       
                        </div>

                        <div className="col-6">
                        <label className="form-label">{itemData.serial_no}</label>
                       
                        </div>
                      
                    </div>
                    <div className="row">
                        <div className="col-6">
                        <label className="form-label">Model</label> :
                       
                        </div>
                        <div className="col-6">
                        <label className="form-label">{itemData.model}</label>
                       
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                        <label className="form-label">Size</label> :
                       
                        </div>
                        <div className="col-6">
                        <label className="form-label">{itemData.size}</label>
                       
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                        <label className="form-label">Color</label> :
                       
                        </div>
                        <div className="col-6">
                        <label className="form-label">{itemData.color}</label>
                       
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                        <label className="form-label">Dimension</label> :
                       
                        </div>
                        <div className="col-6">
                        <label className="form-label">{itemData.dimension}</label>
                       
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                        <label className="form-label">HS_code</label> :
                       
                        </div>
                        <div className="col-6">
                        <label className="form-label">{itemData.hs_code}</label>
                       
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                        <label className="form-label">Other_Specification</label> :
                       
                        </div>
                        <div className="col-6">
                        <label className="form-label">{itemData.other_specification}</label>
                       
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                        <label className="form-label">Unit Purchase Price</label> :
                       
                        </div>
                        <div className="col-6">
                        <label className="form-label">{itemData.unit_purchase_price}</label>
                       
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                        <label className="form-label">Unit Selling Price</label> :
                       
                        </div>
                        <div className="col-6">
                        <label className="form-label">{itemData.unit_selling_price}</label>
                       
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                        <label className="form-label">Stock Qty</label> :
                       
                        </div>
                        <div className="col-6">
                        <label className="form-label">{itemData.stock_qty}</label>
                       
                        </div>
                    </div>
        
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
    )

}

export default ItemDetail;