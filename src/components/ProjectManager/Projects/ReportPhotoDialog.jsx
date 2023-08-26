
import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {url} from "../../../utilities/api/urlResource"

const ReportPhotoDialog = ({open,close,photos}) => {
  return (
    <div>
        
    <Dialog open={open} onClose={close} fullWidth maxWidth='md'>
    <DialogTitle  className='text-center'><b>Report Photos</b></DialogTitle>
    <DialogContent>
     
      <div className="row">
        {
          photos && (
                photos.map((photo,i)=>(
      <div className="col-4">
                  
        <a href={url+`report_task_file/photos/${photo}`} target="blank" ><img alt='logo' src={url+`report_task_file/photos/${photo}`} height="200px" width="250px"/></a>
            
        </div>     			     
                
                )
                )
            )
        }
        </div>     			     
     
    </DialogContent>
    <DialogActions>
      <Button onClick={close}>Cancel</Button>
   
    </DialogActions>
  </Dialog>
</div>
  )
}

export default ReportPhotoDialog