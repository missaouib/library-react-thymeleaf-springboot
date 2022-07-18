import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import AuthorService from '../../services/authors/AuthorService';
import AuthService from '../../services/auth/AuthService';
import AdminService from '../../services/auth/AdminService';
class AddAuthor extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            description: '',
            error: '',
            alert: true,
            isAdmin: false,
            currentUser: undefined
        }

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.createOrUpdateAuthor = this.createOrUpdateAuthor.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
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
    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) this.setState({currentUser: user, isAdmin: user.roles.includes('ROLE_ADMIN')});

        if (this.state.id === 'add') {
            return
        } else {
            AuthorService.getAuthorById(this.state.id).then( (res) => {
                let author = res.data;
                this.setState({name: author.name, description: author.description});

            });
        }
    }
    getTitle() {
        if (this.state.id === 'add') {
            return <h3 className='text-center'>Add Author</h3>
        }
         else {
             return <h3 className='text-center'>Update Author</h3>
         }
    }

    changeNameHandler = (event) => {
        this.setState({name: event.target.value})
    }
    changeDescriptionHandler = (event) => {
        this.setState({description: event.target.value})
    }
    createOrUpdateAuthor = (e) => {
        e.preventDefault();
        let author = {name: this.state.name, description: this.state.description}
        if (this.state.id === 'add') {
            AdminService.createAuthor(author).then(res => {
                if (!res.data.success) {
                    this.setState({alert: res.data.success, error: res.data.message})
                } else {
                    this.props.navigate('/all/authors');
                }
            });
        } else {
            AdminService.updateAuthor(author, this.state.id).then(res => {
                if (!res.data.success) {
                    this.setState({alert: res.data.success, error: res.data.message})
                } else {
                    this.props.navigate('/all/authors');
                }
            });
        }
        
    }
    cancel() {
        this.props.navigate('/all/authors')
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
                            <Form.Group controlId='formBasicDescription'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type = "text" placeholder="Description" name = "description" 
                                   style={{fontWeight: "bold"}} value={this.state.description} onChange={this.changeDescriptionHandler} />
                            </Form.Group>
                            <Form.Group className = "mt-2">
                                <Button className='btn btn-success' onClick={this.createOrUpdateAuthor}>Save</Button>
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
    return <AddAuthor {...props} navigate = {navigate} match = {match}/>
}
export default WithNavigate