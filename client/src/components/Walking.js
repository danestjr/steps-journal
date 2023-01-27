import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Table, Container } from 'reactstrap';
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import Header from './Header'

function Walking () {

    const [walking, setWalking] = useState([]);
    const { user } = useAuth0();
    
    const loadData = async () => {
        let response = await fetch("/list", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user.sub
            })
        })
        let data = await response.json()
        setWalking(data.data)
    }

    const deleteData = async (e, id) => {
        let response = await fetch("/delete", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id
            }),
        })
        if (response.status === 200){
            loadData()
        }
    }

    useEffect(() => {loadData()})

    return <>
        <Header user={user} color="dark" dark={true} expand='sm' />
        <Container>
        <h3>{user.given_name}'s Walking Log</h3>
           <Table hover>
           <thead>
             <tr>
               <th>Date</th>
               <th>Miles</th>
               <th>Edit</th>
               <th>Delete</th>
             </tr>
           </thead>
           <tbody>
           {walking.map((walk) => {
                return <tr key={walk.id}>
                        <th scope='row'>{format(new Date(walk.date), 'MM.dd')}</th>
                        <td>{walk.miles}</td>
                        <td><Link to='edit' state={{id: walk.id, date: walk.date, miles: walk.miles}}><FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon></Link></td>
                        <td><FontAwesomeIcon icon={faTrash} onClick={(e) => deleteData(e, walk.id)}></FontAwesomeIcon></td>
                       
                       </tr>
                })}             
            </tbody>
            </Table>
            <Link to="add"><Button>Add</Button></Link>
         </Container> 
         </>
}

export default Walking;