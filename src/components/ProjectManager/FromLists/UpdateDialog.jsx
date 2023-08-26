import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import { Form } from '../../../style'

const UpdateDialog = ({open,close}) => {
  return (
    <>
    <Dialog open={open} onClose={close}>
        <DialogTitle className='text-center'>Form Update</DialogTitle>
        <DialogContent>
            <Form>
                <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">Form Name:</label>
                    <input type="text" className="form-control" id="form_name" name="form_name"/>
                </div>

                <div className="form-group">
                    <label>Approve By</label>
                    
                    <select className="custom-select" name="approve_role_id">
                    
            
                        <option value="{{$role->id}}"></option>
            
                    </select>
                </div>

                <div className="form-group">
                    <label>Check By</label>
                    <option>Select Role</option>
                    <select className="custom-select" name="check_role_id">
                    <option>Select Role</option>
                        
                        <option value=""></option>
                    
                    </select>
                </div>

                <div className="form-group">
                    <label>Check By</label>
                    <option>Select Role</option>
                    <select className="custom-select" name="check_role_id">
                    <option>Select Role</option>
                        
                        <option value=""></option>
                    
                    </select>
                </div>
                
                <div className="form-group">
                    <label>Prepare By</label>
                    
                    <select className="custom-select" name="prepare_role_id">
                    <option>Select Role</option>
                        
                        <option value=""></option>
                        
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="message-text" className="col-form-label">Index Digit:</label>
                    <input type="number" className="form-control" id="index{{$eachformMo->id}}" name="index"/>
                </div>

                <div className="form-group">
                    <label htmlFor="message-text" className="col-form-label">Prefix Syntax:</label>
                    <input type="text" className="form-control" id="prefix" name="prefix" value="{{$eachformMo->prefix}}"/>
                </div>
            </Form>
        </DialogContent>
        <DialogActions>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" onclick="reload()">Submit</button>
                </div>
        </DialogActions>
    </Dialog>

    </>
    )
}

export default UpdateDialog