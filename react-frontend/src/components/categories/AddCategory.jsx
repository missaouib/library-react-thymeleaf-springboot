import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from '../../services/auth/AuthService';
import CategoryService from '../../services/categories/CategoryService';
import AdminService from '../../services/auth/AdminService';
import { fas } from '@fortawesome/free-solid-svg-icons';

class AddCategory extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            alert: true,
            currentUser: undefined,
            isAdmin: false
        }

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.createOrUpdateCategory = this.createOrUpdateCategory.bind(this);
    }
    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) this.setState({currentUser: user, isAdmin: user.roles.includes('ROLE_ADMIN')});
        if (this.state.id === 'add') {
            return
        } else {
            CategoryService.getCategoryById(this.state.id).then( (res) => {
                let category = res.data;
                this.setState({name: category.name});

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
            return <h3 className='text-center'>Add Category</h3>
        }
         else {
             return <h3 className='text-center'>Update Category</h3>
         }
    }

    changeNameHandler = (event) => {
        this.setState({name: event.target.value})
    }
    createOrUpdateCategory = (e) => {
        e.preventDefault();
        let category = {name: this.state.name}
        if (this.state.id === 'add') {
            AdminService.createCategory(category).then(res => {
                if (!res.data.success) {
                    this.setState({alert: res.data.success, error: res.data.message})
                } else {
                    this.setState({alert: false, error: res.data.message})
                    this.props.navigate('/all/categories');
                }
            });
        } else {
            AdminService.updateCategory(category, this.state.id).then(res => {
                if (!res.data.success) {

                    this.setState({alert: res.data.success, error: res.data.message})
                } else {
                    this.setState({alert: false, error: res.data.message})
                    this.props.navigate('/all/categories');
                }
            });
        }
        
    }
    cancel() {
        this.props.navigate('/all/categories')
    }
  render() {
    return (
      <div>
        <div className='main-body'>
          <div className='container font-link'>
            { this.state.isAdmin ? (<>
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
                                <Button className='btn btn-success' onClick={this.createOrUpdateCategory}>Save</Button>
                                <Button className='btn btn-danger' onClick={this.cancel.bind(this)} style = {{marginLeft: "10px"}}>Cancel</Button>
                            </Form.Group>
                            
                          </Form>
                      </div>
                  </div>
              </div>
              </>
            ):(<>
                <h3 className='text-center'>Access Denied</h3>
            </>)}
          </div>
          </div>
    </div>
    )
  }
}

function WithNavigate(props) {
    const navigate = useNavigate();
    const match = {params: useParams()}
    return <AddCategory {...props} navigate = {navigate} match = {match}/>
}
export default WithNavigate