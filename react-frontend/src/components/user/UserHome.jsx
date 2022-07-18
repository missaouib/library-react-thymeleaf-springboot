import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {Component} from 'react'
import { Button, Table } from 'react-bootstrap';
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import {faInfo, faEdit, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import AuthService from '../../services/auth/AuthService';
import AdminService from '../../services/auth/AdminService';

class UserHome extends Component{
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            alert: false,
            isAdmin: false,
            currentUser: undefined
        }

    }
    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({currentUser: user, isAdmin: user.roles.includes('ROLE_ADMIN')})
        }
        AdminService.getUsers().then((res) => {
                this.setState({users: res.data})
        })
        
    }
    showAlert() {
        if (this.state.alert) {
            return <div className="alert alert-warning"></div>
        }
    }
    
    addUser() {
        this.props.navigate('/user/create/add')
    }
    editUser(id) {
        this.props.navigate(`/user/create/${id}`)
    }
    deleteUser(id) {
        AdminService.deleteUser(id).then(res => {
            if (res.data.success) {
                this.setState({alert: true})
                this.setState({books: this.state.users.filter(user => user.id !== id)});
            } else {
                alert("Something went wrong. Please try again")
            }
        })
    }
    viewUser(id) {
        this.props.navigate(`/profile/${id}`)
    }
    render() {
        return (
            <div>
                <div className = "main-body pb-5">
                    { this.showAlert() }
                    <div className = "card">
                    {this.state.isAdmin && (
                        <div className = "card-body">
                            <p className = "my-2">
                                <Button onClick = {() => this.addUser()} className = "btn btn-primary">
                                    <FontAwesomeIcon icon={faPlusCircle} /> Add User
                                </Button>&nbsp;&nbsp;
                                <Button className = "btn btn-warning" onClick={() => window.location.reload()}>Refresh</Button>
                            </p>
                            <Table striped hover responsive>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Fullname</th>
                                        <th colSpan={2}>Function</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        { this.state.users.map( user =>
                                        <tr key = {user.id}>
                                            <td>{ user.username }</td>
                                            <td>{ user.email }</td>
                                            <td>{ user.firstName + " " + user.lastName }</td>

                                            <td>
                                                <Button onClick={() => this.viewUser(user.id)} className="btn btn-success"><FontAwesomeIcon icon={ faInfo } /></Button>
                                            </td>
                                            
                                            <>
                                            <td>
                                                <Button onClick={() => this.editUser(user.id)} className="btn btn-primary"><FontAwesomeIcon icon={faEdit} /></Button>
                                            </td>
                                            </>
                                            
                                        </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </div>
                        )}
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
    return <UserHome {...props} navigate={navigate} match={match} location = {location}/>
}

export default WithNavigate;
