import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {Component} from 'react'
import { Button, Table } from 'react-bootstrap';
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import BookService from '../../services/books/BookService';
import {faInfo, faEdit, faTrash, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import AuthService from '../../services/auth/AuthService';
import AdminService from '../../services/auth/AdminService';

class BookHome extends Component{
    constructor(props) {
        super(props)

        this.state = {
            books: [],
            alert: true,
            error: '',
            currentUser: undefined,
            isAdmin: false
        }
        this.addBook = this.addBook.bind(this);
        this.editBook = this.editBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.viewBook = this.viewBook.bind(this);
    }
    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({currentUser: user, isAdmin: user.roles.includes('ROLE_ADMIN')})
        }
        BookService.getBooks().then((res) => {
                this.setState({books: res.data})
        })
        
    }
    showAlert() {
        if (!this.state.alert) {
            return (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>{ this.state.error }</strong>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            );
        }
    }
    
    addBook() {
        this.props.navigate('/create-book/add')
    }
    editBook(id) {
        this.props.navigate(`/create-book/${id}`)
    }
    deleteBook(id) {
        AdminService.deleteBook(id).then(res => {
            if (res.data.success) {
                this.setState({alert: false, error: res.data.message})
                this.setState({books: this.state.books.filter(book => book.id !== id)});
            } else {
                alert("Something went wrong. Please try again")
            }
        })
    }
    viewBook(id) {
        this.props.navigate(`/books/${id}`)
    }
    render() {
        return (
            <div>
                <div className = "main-body pb-5">
                    { this.showAlert() }
                    <div className = "card">
                        <div className = "card-body">
                            <p className = "my-2">
                            { this.state.isAdmin && (
                                <Button onClick = {this.addBook} className = "btn btn-primary">
                                    <FontAwesomeIcon icon={faPlusCircle} /> Add Book
                                </Button>
                            )}&nbsp;&nbsp;
                                <Button className = "btn btn-warning" onClick={() => window.location.reload()}>Refresh</Button>
                            </p>
                            <Table striped hover responsive>
                                <thead>
                                    <tr>
                                        <th>ISBN</th>
                                        <th>Serial Name</th>
                                        <th>Name</th>
                                        <th>Language</th>
                                        <th colSpan={3}>Function</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.books.map( book =>
                                        <tr key = {book.id}>
                                            <td>{ book.isbn }</td>
                                            <td>{ book.serialName }</td>
                                            <td>{ book.name }</td>
                                            <td>{ book.language }</td>
                                            <td>
                                                <Button onClick={() => this.viewBook(book.id)} className="btn btn-success"><FontAwesomeIcon icon={ faInfo } /></Button>
                                            </td>
                                            {this.state.isAdmin && (
                                            <>
                                            <td>
                                                <Button onClick={() => this.editBook(book.id)} className="btn btn-primary"><FontAwesomeIcon icon={faEdit} /></Button>
                                            </td>
                                            <td>
                                                <Button onClick={() => this.deleteBook(book.id)} className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></Button>
                                            </td>
                                            </>
                                            )}
                                        </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function WithNavigate(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const match = {params: useParams()};
    return <BookHome {...props} navigate={navigate} match={match} location = {location}/>
}

export default WithNavigate;
