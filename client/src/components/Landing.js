import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import "./Landing.css"
import LoginButton from './LoginButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faVault, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Loading"
import logo from "../assets/logo.svg"


function Landing() {
    const { isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate()

    if (isLoading) {
        return <Loading />
    }

    if (isAuthenticated) {
        navigate("/journal")
    }

    return (<>
        <Container fluid>
            <Row className="fixed-max-width">
                <Col md={6} className="first-col">
                </Col>
                <Col md={6} className="second-col">
                    <img src={logo} width="45px" />
                    <h1>Steps Journal</h1>
                    <p>Log your steps as part of your fitness journey</p>
                    <LoginButton size='lg' />
                </Col>
            </Row>
        </Container>
    </>)

}

export default Landing;