import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown, Container, Offcanvas} from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
import AuthService from '../services/auth/AuthService';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUser: undefined,
            firstName: '',
            id: ''
        }
        this.logOut = this.logOut.bind(this)
        
    }
    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({currentUser: user, id: user.id, firstName: user.firstName});
        }
    }
    viewProfile(id) {
        this.props.navigate(`/profile/${id}`)
    }
    logOut() {
        AuthService.logout()
        this.props.navigate("/")
    }
    render() {
        const isLoggedIn = localStorage.getItem('user') !== null;
        const user = AuthService.getCurrentUser();

        return (
        <div>
            {/*{[false, 'sm', 'md', 'lg', 'xl', 'xxl'] */}
            {['md'].map((expand) => (
                <Navbar key="md" bg="dark" variant="dark" fixed = "top" expand={expand} className="mb-3">
                    <Container>
                        <Navbar.Brand href="/">Book Management</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                        >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                            Library
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/about">About us</Nav.Link>
                            <NavDropdown
                                title="Views"
                                id={`offcanvasNavbarDropdown-expand-${expand}`}
                            >
                                <NavDropdown.Item href="/all/books">Books</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/all/authors">Authors</NavDropdown.Item>
                                <NavDropdown.Item href="/all/categories">Categories</NavDropdown.Item>
                                <NavDropdown.Item href="/all/publishers">Publishers</NavDropdown.Item>
                            </NavDropdown>
                            {isLoggedIn === true ? (
                            <NavDropdown
                                title="User"
                                id={`offcanvasNavbarDropdown-expand-${expand}`}
                            >
                                <NavDropdown.Item onClick={() => this.viewProfile(user.id)}>Hi, {user.firstName}</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={this.logOut}>Logout</NavDropdown.Item>
                            </NavDropdown>
                            ) : (
                                <Nav.Link href="/login">Login</Nav.Link>
                            )}
                            </Nav>
                            {/* 
                            <Form className="d-flex" onSubmit={this.search}>
                            <FormControl
                                type="text"
                                placeholder="Search book here"
                                className="me-2"
                                aria-label="Search"
                                name = "inputString"
                                onChange={this.changeInputStringHandler}
                                value={this.state.inputString}
                            />
                            <Button onClick = {this.search} variant="outline-success">Search</Button>
                            </Form>
                            */}
                        </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </div>
        )
    }
}

function WithNavigate(props) {
    const navigate = useNavigate();
    const match = {params: useParams()};
    return <HeaderComponent {...props} navigate = {navigate} match = {match}/>
}
export default WithNavigate;

