import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {Component} from 'react'
import { Button, Table } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import PublisherService from '../../services/publishers/PublisherService';
import { faEdit, faTrash, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import AuthService from '../../services/auth/AuthService';
import AdminService from '../../services/auth/AdminService';
class PublisherHome extends Component{
    constructor(props) {
        super(props)

        this.state = {
            publishers: [],
            isAdmin: false,
            alert: true,
            error: '',
            currentUser: undefined
        }
        this.addPublisher = this.addPublisher.bind(this);
        this.editPublisher = this.editPublisher.bind(this);
        this.deletePublisher = this.deletePublisher.bind(this);
    }
    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) this.setState({currentUser: user, isAdmin: user.roles.includes('ROLE_ADMIN')});

        PublisherService.getPublishers().then((res) => {
            this.setState({publishers: res.data})
        })
    }

    addPublisher() {
        this.props.navigate('/create-publisher/add')
    }
    editPublisher(id) {
        this.props.navigate(`/create-publisher/${id}`)
    }
    deletePublisher(id) {
        AdminService.deletePublisher(id).then(res => {
            if (res.data.success) {
                this.setState({alert: false, error: res.data.message})
                this.setState({publishers: this.state.publishers.filter(publisher => publisher.id !== id)});
            } else {
                this.setState({alert: false, error: "Oops. Something went wrong. Please try again."})
            }
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
    render() {
        return (
            <div>
                <div className = "main-body pb-5">
                    <div className = "card">
                        {this.showAlert()}
                        <div className = "card-body font-link">
                        { this.state.isAdmin && (
                            <p className = "my-2">
                                <Button onClick = {this.addPublisher} className = "btn btn-primary">
                                    <FontAwesomeIcon icon={faPlusCircle} /> Add Publisher
                                </Button>
                            </p>
                        )}
                            <Table striped hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        { this.state.isAdmin && (
                                        <th colSpan="2">Function</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.publishers.map( (publisher, index) =>
                                        <tr key = {publisher.id}>
                                            <td>{ index }</td>
                                            <td>{ publisher.name }</td>
                                            { this.state.isAdmin && (<>
                                            <td>
                                                <Button onClick={() => this.editPublisher(publisher.id)} className="btn btn-primary"><FontAwesomeIcon icon={ faEdit } /></Button>
                                            </td>
                                            <td>
                                                <Button onClick={() => this.deletePublisher(publisher.id)} className="btn btn-danger"><FontAwesomeIcon icon={ faTrash } /></Button>
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
    return <PublisherHome {...props} navigate={navigate}/>
}

export default WithNavigate;
