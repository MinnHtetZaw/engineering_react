import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { Button, Form } from 'react-bootstrap'
import { api } from '../../../utilities/api/apiResource'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'

const UpdateFormDialog = ({open,close,singleList}) => {

    const [roles,setRoles] =useState([])
    const [formName,setFormName] =useState('')
    const [indexDigit,setIndexDigit] = useState('')
    const [prefix,setPrefix] = useState('')
    const [approveBy,setApproveBy] = useState('')
    const [checkBy,setCheckBy] = useState('')
    const [prepareBy,setPrepareBy] = useState('')
    const nav = useNavigate()

    useEffect(()=>{
        api.get('roles')
        .then((res)=>
        setRoles(res.data))
    },[])

    const data = {
        form_name : formName !== '' ? formName: singleList.form_name ,
        prefix : prefix !== '' ? prefix: singleList.prefix,
        approve_by : approveBy !== '' ? approveBy: singleList.approve_by,
        check_by : checkBy !== '' ? checkBy: singleList.check_by,
        prepare_by : prepareBy !== '' ? prepareBy: singleList.prepare_by,
        index_digit : indexDigit ,
        form_id : singleList.id
    }

    const handleUpdate =async(e)=>{
        e.preventDefault()
      try{
        const res = await api.post('form/update',data)

      res.status === 200 && 
          swal('Good','You updated Successfully!','success')
          window.location.reload() 
      }catch(err)
      {
        console.error(err);
      }  
    }

  return (
    <>
   
    <Dialog open={open} onClose={close} fullWidth maxWidth='sm'>
    <DialogTitle>Form Update</DialogTitle>
    <DialogContent>
        <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Form Name:</Form.Label>
                <Form.Control type="text" defaultValue={singleList.form_name} onChange={(e)=>setFormName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrefix">
                <Form.Label>Approve By</Form.Label>
                <Form.Select defaultValue={singleList.approve_by} onChange={(e)=>setApproveBy(e.target.value)}>
                    <option value={singleList.approve_by}>{singleList.approve_by_role}</option>
                    {
                        roles.map((role)=>(
                            role.id !== singleList.approve_by &&
                            <option value={role.id} key={role.id}>{role.role}</option>
                        ))
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrefix">
                <Form.Label>Approve By</Form.Label>
                <Form.Select defaultValue={singleList.check_by} onChange={(e)=>setCheckBy(e.target.value)}>
                    <option value={singleList.check_by}>{singleList.check_by_role}</option>
                    {
                        roles.map((role)=>(
                            role.id !== singleList.check_by &&
                            <option value={role.id} key={role.id}>{role.role}</option>
                        ))
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrefix">
                <Form.Label>Approve By</Form.Label>
                <Form.Select defaultValue={singleList.prepare_by} onChange={(e)=>setPrepareBy(e.target.value)}>
                    <option value={singleList.prepare_by}>{singleList.prepare_by_role}</option>
                    {
                        roles.map((role)=>(
                            role.id !== singleList.prepare_by &&
                            <option value={role.id} key={role.id}>{role.role}</option>
                        ))
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDigit">
                <Form.Label>Index Digit:</Form.Label>
                <Form.Control type="text" defaultValue={singleList.index_digit || ''} onChange={(e)=>setIndexDigit(e.target.value)} placeholder="eg.012" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrefix">
                <Form.Label>Prefix Syntax:</Form.Label>
                <Form.Control type="text" defaultValue={singleList.prefix} onChange={(e)=>setPrefix(e.target.value)} placeholder="eg.GRN" />
            </Form.Group>

            <Form.Group className='m-2 text-center' controlId='formBasicButton'>
                <Button type="submit" size='sm' variant='success'> Update</Button>
            </Form.Group> 
        </Form>
    </DialogContent>
    </Dialog>
    </>
  )
}

export default UpdateFormDialog

