import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState } from 'react';

function AppNav() {

    const navigate = useNavigate()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => {
    const token = localStorage.getItem("token")
        if(token){
            setShow(true);
        }else{
            navigate("/login")
        }
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="light" variant="light">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fs-4">
                    <img
                        alt=""
                        src="/store.png"
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
                    />{' '}
                    E-commerce
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="/login">
                            <i className='bx bx-user bx-md me-2'></i>
                            Login
                        </Nav.Link>
                        <Nav.Link as={Link} to="/purchases">
                            <i className='bx bx-box bx-md me-2'></i>   
                            Purchases
                        </Nav.Link>
                        <Nav.Link onClick={handleShow}>
                            <i className='bx bx-cart bx-md me-2'></i>
                            Cart
                        </Nav.Link>
                        <Sidebar show={show} handleClose={handleClose} />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNav;