import { useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Header from './Header'

function EditForm() {
    const location = useLocation();
    
    const { user } = useAuth0();

    const [id, setId] = useState(location.state.id);
    const [date, setDate] = useState(location.state.date);
    const [miles, setMiles] = useState(location.state.miles);

    const navigate = useNavigate();

    const updateData = async (e) => {
        e.preventDefault()
        let response = await fetch("/update", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                user: user.sub,
                date: date,
                miles: miles
            }),
        })
        if (response.status === 200){
            navigate('/journal')
        }
    }

    return(<>
        <Header user={user} color="dark" dark={true} expand='sm' />
        <Container>
        <Form onSubmit={updateData}>
            <FormGroup>
                <Label for='date'>
                    Date
                </Label>
                <Input
                type='date'
                value={date}
                placeholder=""
                onChange={(e) => setDate(e.target.value)}
            />
            </FormGroup>
            <FormGroup>
                <Label for="miles">
                Miles
                </Label>
                <Input
                    type='text'
                    value={miles}
                    placeholder="miles"
                    onChange={(e) => setMiles(e.target.value)}
                />
            </FormGroup>
            <Button type='submit'>
                Add
            </Button>
        </Form>
    </Container>
    </>
    )
}

export default EditForm
