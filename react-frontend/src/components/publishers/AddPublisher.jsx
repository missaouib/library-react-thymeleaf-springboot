import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import PublisherService from '../../services/publishers/PublisherService';
import AuthService from '../../services/auth/AuthService';
import AdminService from '../../services/auth/AdminService';
class AddPublisher extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            alert: true,
            error: '',
            isAdmin: false,
            currentUser: undefined
        }

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.createOrUpdatePublisher = this.createOrUpdatePublisher.bind(this);
    }
    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) this.setState({currentUser: user, isAdmin: user.roles.includes('ROLE_ADMIN')});

        if (this.state.id === 'add') {
            PublisherService.getPublishers().then((res) => {
                this.setState({publishers: res.data})
            })
            return
        } else {
            PublisherService.getPublisherById(this.state.id).then( (res) => {
                let publisher = res.data;
                this.setState({name: publisher.name});

            });
        }
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
    getTitle() {
        if (this.state.id === 'add') {
            return <h3 className='text-center'>Add Publisher</h3>
        }
         else {
             return <h3 className='text-center'>Update Publisher</h3>
         }
    }

    changeNameHandler = (event) => {
        this.setState({name: event.target.value})
    }
    createOrUpdatePublisher = (e) => {
        e.preventDefault();
        let publisher = {name: this.state.name}
        if (this.state.id === 'add') {
            AdminService.createPublisher(publisher).then(res => {
                if (!res.data.success) {
                    this.setState({alert: res.data.success, error: res.data.message})
                } else {
                    this.setState({alert: false, error: res.data.message})
                    this.props.navigate('/all/publishers');
                }
            });
        } else {
            AdminService.updatePublisher(publisher, this.state.id).then(res => {
                if (!res.data.success) {
                    this.setState({alert: res.data.success, error: res.data.message})
                } else {
                    this.setState({alert: false, error: res.data.message})
                    this.props.navigate('/all/publishers');
                }
            });
        }
        
    }
    cancel() {
        this.props.navigate('/all/publishers')
    }
  render() {
    return (
      <div>
        <div className='main-body'>
          <div className='container font-link'>
            
            {this.state.isAdmin ? (<>
              <div className='row pb-3'>
                  <div className='card col-md-6 offset-md-3 col-sm-12 mt-3'>
                      {
                          this.getTitle()
                      }
                      <div className='card-body'>
                          <Form>
                            <Form.Group>
                            { this.showAlert() }
                            </Form.Group>
                            <Form.Group controlId='formBasicName'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type = "text" placeholder="Name" name = "name" 
                                   style={{fontWeight: "bold"}} value={this.state.name} onChange={this.changeNameHandler} />
                            </Form.Group>
                            <Form.Group className = "mt-2">
                                <Button className='btn btn-success' onClick={this.createOrUpdatePublisher}>Save</Button>
                                <Button className='btn btn-danger' onClick={this.cancel.bind(this)} style = {{marginLeft: "10px"}}>Cancel</Button>
                            </Form.Group>
                            
                          </Form>
                      </div>
                  </div>
              </div>
              </>
            ):(
                <><h3 className='text-center'>Access Denied</h3></>
            )}
          </div>
          </div>
    </div>
    )
  }
}

function WithNavigate(props) {
    const navigate = useNavigate();
    const match = {params: useParams()}
    return <AddPublisher {...props} navigate = {navigate} match = {match}/>
}
export default WithNavigate