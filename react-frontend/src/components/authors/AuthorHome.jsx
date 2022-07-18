import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {Component} from 'react'
import { Button, Table } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import AuthorService from '../../services/authors/AuthorService';
import { faEdit, faTrash, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import AuthService from '../../services/auth/AuthService';
import AdminService from '../../services/auth/AdminService';

class CategoryHome extends Component{
    constructor(props) {
        super(props)

        this.state = {
            authors: [],
            isAdmin: false,
            alert: false,
            error: '',
            currentUser: undefined
        }
        this.addAuthor = this.addAuthor.bind(this);
        this.editAuthor = this.editAuthor.bind(this);
        this.deleteAuthor = this.deleteAuthor.bind(this);
        this.showAlert = this.showAlert.bind(this);
    }
    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) this.setState({currentUser: user, isAdmin: user.roles.includes('ROLE_ADMIN')});

        AuthorService.getAuthors().then((res) => {
            this.setState({authors: res.data})
        })
    }

    showAlert() {
        if (this.state.alert) {
            return (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>{ this.state.error }</strong>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            );
        }
    }

    addAuthor() {
        this.props.navigate('/create-author/add')
    }
    editAuthor(id) {
        this.props.navigate(`/create-author/${id}`)
    }
    deleteAuthor(id) {
        AdminService.deleteAuthor(id).then(res => {
            if (res.data.success) {
                this.setState({authors: this.state.authors.filter(author => author.id !== id), error: res.data.message, alert: true});
            } else {
                this.setState({error: "Something wents wrong. Please try again.", alert: true})
            }
        })
    }
    render() {
        return (
            <div>
                <div className = "main-body pb-5">
                    <div className = "card">
                        <div className = "card-body font-link">
                            { this.showAlert() }
                        { this.state.isAdmin && (
                            <p className = "my-2">
                                <Button onClick = {this.addAuthor} className = "btn btn-primary">
                                    <FontAwesomeIcon icon={faPlusCircle} /> Add Author
                                </Button>
                            </p>
                        )}
                            <Table striped hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        { this.state.isAdmin && (
                                        <th colSpan={2}>Function</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.authors.map( (author, index)=>
                                        <tr key = {author.id}>
                                            <td>{ index }</td>
                                            <td>{ author.name }</td>
                                            <td>{ author.description }</td>
                                            { this.state.isAdmin && (<>
                                            <td>
                                                <Button onClick={() => this.editAuthor(author.id)} className="btn btn-primary"><FontAwesomeIcon icon={ faEdit } /></Button>
                                            </td>
                                            <td>
                                                <Button onClick={() => this.deleteAuthor(author.id)} className="btn btn-danger"><FontAwesomeIcon icon={ faTrash } /></Button>
                                            </td>
                                            </>)}
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
    //const match = {params: useParams()};
    return <CategoryHome {...props} navigate={navigate}/>
}

export default WithNavigate;
