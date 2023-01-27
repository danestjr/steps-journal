import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Header from './Header'

function AddForm() {
    const [date, setDate] = useState([]);
    const [miles, setMiles] = useState([]);

    const { user } = useAuth0();


    const navigate = useNavigate();

    const addData = async (e) => {
        e.preventDefault()
        let response = await fetch("/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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
            <Form onSubmit={addData}>
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

export default AddForm
