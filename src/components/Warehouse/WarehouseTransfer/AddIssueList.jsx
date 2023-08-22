import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Delete } from '../../Icons'
import { removeIssue } from '../../../utilities/redux/issueRedux'

const AddIssueList = ({contact_person}) => {

    const issueList = useSelector(state=>state.issue.issueList)
    const dipatch = useDispatch()
    
  return (
 
    <div className='col-md-6 my-3'>
  
            <Table bordered>
                <thead>
                    <tr className='bg-secondary text-white text-center'>
                        <th>Material Issue No</th>
                        <th>Contact Person</th>
                        <th>Total Qty</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        issueList.map((issue,index)=>(
                            <tr key={index}>
                                <td>{issue.material_issue_no}</td>
                                <td>{issue.contact_person}</td>
                                <td>{issue.total_qty}</td>
                                <td>
                                    <Button variant='danger' size='sm'
                                        onClick={()=>dipatch(removeIssue(index))}>
                                    <Delete/>
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                 
                </tbody>
            </Table>
       
</div>
  )
}

export default AddIssueList