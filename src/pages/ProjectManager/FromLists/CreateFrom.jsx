import React from 'react'
import Nav from '../../../components/Sidebar/Nav'
import { Card, Container, Form } from 'react-bootstrap'

const CreateFrom = () => {
  return (
 <>
 <Nav/>
    <Container className='mt-4'>
        <Card className='col-8 offset-2'>
            <Card.Header className='bg-primary'>
                <Card.Title className='text-white'>
                        Form Register
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                </Form>
            </Card.Body>
        </Card>
    </Container>

 </>
  )
}

export default CreateFrom