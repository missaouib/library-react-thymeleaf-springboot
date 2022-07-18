import React, { Component } from 'react'
import AuthService from '../../services/auth/AuthService';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebook, faGithub, faInstagram, faTwitch} from '@fortawesome/free-brands-svg-icons';
import {faGlobe} from '@fortawesome/free-solid-svg-icons';
import UserService from '../../services/user/UserService';
import { Button } from 'react-bootstrap';

function toStringGender(gender) {
    if (gender === 0) return "Other";
    else if (gender === 1) return "Male";
    else return "Female"
}
class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            isAdmin: false,
            currentUser: {},
            isLogged: false,
        }
        this.adminBoard = this.adminBoard.bind(this);
        
    }
    componentDidMount() {
        const user = AuthService.getCurrentUser();
        
        if (user) {
            UserService.getUserById(this.state.id).then(res => {
                this.setState({ isLogged: true, currentUser: res.data, isAdmin: user.roles.includes('ROLE_ADMIN')}) 
            })
           
        }
    }

    updateUser(id) {
        this.props.navigate(`/user/create/${id}`)
    }
    deleteUser(id) {
        this.props.navigate("/")
    }
    adminBoard() {
        this.props.navigate('/dashboard');
    }

  render() {
    return (
      <div>
        
        <div className = "main-body">
        { this.state.isLogged ? (
        <section style={{backgroundColor: "#eee"}}>
        <div className="container py-5">
            {this.state.isAdmin && (
                <Button onClick={this.adminBoard} variant="success" className="mb-2">Admin Board</Button>
            )}
            <div className="row">
                <div className="col">
                    <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item"><a href = "/profile">User</a></li>
                            <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-4">
                    <div className="card mb-4">
                        <div className="card-body text-center">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                                className="rounded-circle img-fluid" style={{width: "150px"}}/>
                            <h5 className="my-3">{this.state.currentUser.firstName +" "+ this.state.currentUser.lastName}</h5>
                            <p className="text-muted mb-1">Full Stack Developer</p>
                            <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                            <div className="d-flex justify-content-center mb-2">
                                <button className="btn btn-primary" onClick={() => this.updateUser(this.state.id)}>Update</button>
                                {/*<button className="btn btn-outline-danger ms-1" onClick={() => this.deleteUser(this.state.id)}>Delete</button>*/}
                            </div>
                        </div>
                    </div>
                    <div className="card mb-4 mb-lg-0">
                        <div className="card-body p-0">
                            <ul className="list-group list-group-flush rounded-3">
                                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <FontAwesomeIcon icon={faGlobe} className="fa-lg text-warning"/>
                                    ABC
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <FontAwesomeIcon icon={faGithub} className="fa-lg" style={{color: "#333333"}}/>
                                    DEF
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <FontAwesomeIcon icon={faTwitch} className="fa-lg" style={{color: "#55acee"}}/>
                                    GIJ
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <FontAwesomeIcon icon={faInstagram} className="fa-lg" style={{color: "#ac2bac"}}/>
                                    KHL
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <FontAwesomeIcon icon={faFacebook} className="fa-lg" style={{color: "#3b5998"}}/>
                                    PQR
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Fullname</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{this.state.currentUser.firstName + " " + this.state.currentUser.lastName}</p>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Email</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{this.state.currentUser.email}</p>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Gender</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{toStringGender(this.state.currentUser.gender)}</p>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Date of Birth</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{this.state.currentUser.dateOfBirth + " (YYYY-MM-DD)"} </p>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">City</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{this.state.currentUser.ward + ", " + this.state.currentUser.district + ", " + this.state.currentUser.city}</p>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Address</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{this.state.currentUser.address1}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card mb-4 mb-md-0">
                                <div className="card-body">
                                    <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                                    </p>
                                    <p className="mb-1" style={{fontSize: ".77rem"}}>Web Design</p>
                                    <div className="progress rounded" style={{height: "5px"}}>
                                    <div className="progress-bar" role="progressbar" style={{width: "80%"}} aria-valuenow="80"
                                        aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p className="mt-4 mb-1" style={{fontSize: ".77rem"}}>Website Markup</p>
                                    <div className="progress rounded" style={{height: "5px"}}>
                                    <div className="progress-bar" role="progressbar" style={{width: "72"}} aria-valuenow="72"
                                        aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p className="mt-4 mb-1" style={{fontSize: ".77rem"}}>One Page</p>
                                    <div className="progress rounded" style={{height: "5px"}}>
                                        <div className="progress-bar" role="progressbar" style={{width: "89%"}} aria-valuenow="89"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p className="mt-4 mb-1" style={{fontSize: ".77rem"}}>Mobile Template</p>
                                    <div className="progress rounded" style={{height: "5px"}}>
                                    <div className="progress-bar" role="progressbar" style={{width: "55%"}} aria-valuenow="55"
                                        aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p className="mt-4 mb-1" style={{fontSize: ".77rem"}}>Backend API</p>
                                    <div className="progress rounded mb-2" style={{height: "5px"}}>
                                    <div className="progress-bar" role="progressbar" style={{width: "66%"}} aria-valuenow="66"
                                        aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card mb-4 mb-md-0">
                                <div className="card-body">
                                    <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                                    </p>
                                    <p className="mb-1" style={{fontSize: ".77rem"}}>Web Design</p>
                                    <div className="progress rounded" style={{height: "5px"}}>
                                    <div className="progress-bar" role="progressbar" style={{width: "80%"}} aria-valuenow="80"
                                        aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p className="mt-4 mb-1" style={{fontSize: ".77rem"}}>Website Markup</p>
                                    <div className="progress rounded" style={{height: "5px"}}>
                                    <div className="progress-bar" role="progressbar" style={{width: "72%"}} aria-valuenow="72"
                                        aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p className="mt-4 mb-1" style={{fontSize: ".77rem"}}>One Page</p>
                                    <div className="progress rounded" style={{height: "5px"}}>
                                    <div className="progress-bar" role="progressbar" style={{width: "89%"}} aria-valuenow="89"
                                        aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p className="mt-4 mb-1" style={{fontSize: ".77rem"}}>Mobile Template</p>
                                    <div className="progress rounded" style={{height: "5px"}}>
                                    <div className="progress-bar" role="progressbar" style={{width: "55%"}} aria-valuenow="55"
                                        aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p className="mt-4 mb-1" style={{fontSize: ".77rem"}}>Backend API</p>
                                    <div className="progress rounded mb-2" style={{height: "5px"}}>
                                    <div className="progress-bar" role="progressbar" style={{width: "66%"}} aria-valuenow="66"
                                        aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
        ) : (<h3 className='text-center'>Oops... Something went wrong!</h3>)}
        </div>
      </div>
    );
  }
}

function WithNavigate(props) {
    const navigate = useNavigate();
    const match = {params: useParams()}
    return <UserProfile {...props} navigate = {navigate} match={match}/>
}
export default WithNavigate