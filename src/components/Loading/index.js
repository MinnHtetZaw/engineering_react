import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import { Spinner } from "react-bootstrap"



export const Loading = () => {
  return (
    <tr>                 
    <td colSpan="9" className='text-center'>
          <div className="spinner-border text-info" role="status">
          </div>
      </td>
     
  </tr>
  )
}

export const LoadingDialog=()=>{
  return (
    <>
 
    <Dialog open={true} fullWidth  maxWidth='sm'>

    <DialogTitle className="p-3 text-center" ><h3>Please Wait...</h3><hr /></DialogTitle>
    <DialogContent className="text-center" >
     <Spinner animation="border" /> 
    </DialogContent>
    </Dialog>
    </>
  )
}