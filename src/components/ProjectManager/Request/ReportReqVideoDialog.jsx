import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {url} from "../../../utilities/api/urlResource"

const ReportReqVideoDialog = (props) => {
    return (
        <div>
            
        <Dialog open={props.open} onClose={props.close} fullWidth maxWidth='md'>
        <DialogTitle  className='text-center'><b>Report Videos</b></DialogTitle>
        <DialogContent>
         
          <div className="row">
            {
                props.videos && (
                    props.videos.map((video,i)=>(
                     
          <div className="col-4" key={i}>
            <video controls width="80%">
            <source src={url+`report_maintenance/video/${video}`} type="video/mp4"/>  
            </video>
                    
            </div>     			     
                    
                    )
                    )
                )
            }
            </div>     			     
         
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
       
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ReportReqVideoDialog