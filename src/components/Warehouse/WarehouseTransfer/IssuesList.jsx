import React from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import { AddIcon } from '../../Icons'
import { useDispatch } from 'react-redux'
import { addIssue } from '../../../utilities/redux/issueRedux'

const IssuesList = ({issues,contact_person}) => {
    
    const dispatch = useDispatch()

    const handleAddIssue =(issue,person)=>{
        
        const issueList= {...issue};
        issueList.contact_person = person;
        dispatch(addIssue(issueList))
    }
    
  return (
    <div className='col-md-6'>
        <Card className='shadow' border="light">
            <Card.Body>
                <Table bordered>
                    <thead>
                        <tr className='bg-dark text-white text-center'>
                            <th>Material Issue No</th>
                            <th>Contact Person</th>
                            <th>Total Qty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            issues.map((issue,index)=>(
                                <tr key={index}>
                                    <td>{issue.material_issue_no}</td>
                                    <td>{contact_person}</td>
                                    <td>{issue.total_qty}</td>
                                    <td>
                                        <Button variant='primary' size='sm' onClick={()=>handleAddIssue(issue,contact_person)}>
                                        <AddIcon fontSize='sm'/> Add
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                     
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    </div>
  )
}

export default IssuesList