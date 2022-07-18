import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {Component} from 'react'
import { Button, Table } from 'react-bootstrap';
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import BookService from '../../services/books/BookService';
import {faInfo, faEdit, faTrash, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
class SearchBook extends Component{
    constructor(props) {
        super(props)

        this.state = {
            inputString: this.props.location.state.inputString,
            books: [],
            alert: false
        }
        this.addBook = this.addBook.bind(this);
        this.editBook = this.editBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.viewBook = this.viewBook.bind(this);
    }
    componentDidMount() {
        BookService.searchBooks(this.state.inputString).then((res) => {
            this.setState({books: res.data})
        })
        
    }
    showAlert() {
        if (this.state.alert) {
            return <div className="alert alert-warning">Book deleted successfully!</div>
        }
    }
    showResult() {
        return <h3>Show results for "{this.state.inputString}"</h3>
    }

    addBook() {
        this.props.navigate('/create-book/add')
    }
    editBook(id) {
        this.props.navigate(`/create-book/${id}`)
    }
    deleteBook(id) {
        BookService.deleteBook(id).then(res => {
            if (res.data.success) {
                this.setState({alert: true})
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
                            <div className='text-center'>{ this.showResult() }</div>
                            <p className = "my-2">
                                <Button onClick = {this.addBook} className = "btn btn-primary">
                                    <FontAwesomeIcon icon={faPlusCircle} /> Add Book
                                </Button>
                            </p>
                            <Table striped hover responsive>
                                <thead>
                                    <tr>
                                        <th>ISBN</th>
                                        <th>Serial Name</th>
                                        <th>Name</th>
                                        <th>Language</th>
                                        <th>Detail</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
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
                                            <td>
                                                <Button onClick={() => this.editBook(book.id)} className="btn btn-primary"><FontAwesomeIcon icon={ faEdit } /></Button>
                                            </td>
                                            <td>
                                                <Button onClick={() => this.deleteBook(book.id)} className="btn btn-danger"><FontAwesomeIcon icon={ faTrash } /></Button>
                                            </td>
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
    return <SearchBook {...props} navigate={navigate} match={match} location = {location}/>
}

export default WithNavigate;
