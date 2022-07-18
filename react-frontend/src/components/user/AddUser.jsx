import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from '../../services/auth/AuthService';
import AdminService from '../../services/auth/AdminService';
import UserService from '../../services/user/UserService';


class AddUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            username: '',
            email: '',
            password: '',
            password2: '',
            firstName: '',
            lastName: '',
            mobile: '',
            dateOfBirth: '',
            gender: '0',
            city: '',
            district: '',
            ward: '',
            address1: '',
            address2: '',
            alert: true,
            isAdmin: false,
            isLogged: false,
        }

        this.createOrUpdateUser = this.createOrUpdateUser.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changePassword2Handler = this.changePassword2Handler.bind(this);
        this.changeMobileHandler = this.changeMobileHandler.bind(this);
        this.changeDateOfBirthHandler = this.changeDateOfBirthHandler.bind(this);
        this.changeGenderHandler = this.changeGenderHandler.bind(this);
        this.changeCityHandler = this.changeCityHandler.bind(this);
        this.changeDistrictHandler = this.changeDistrictHandler.bind(this);
        this.changeWardHandler = this.changeWardHandler.bind(this);
        this.changeAddress1Handler = this.changeAddress1Handler.bind(this);
        this.changeAddress2Handler = this.changeAddress2Handler.bind(this);
    }
    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (this.state.id === 'add') {
            
        } else {
            if (user) {
                this.setState({isAdmin: user.roles.includes('ROLE_ADMIN')})
                this.setState({isLogged: true})
            }
            UserService.getUserById(this.state.id).then( (res) => {
                let user = res.data;
                console.log(user);
                this.setState({username: user.username, 
                    email: user.email, firstName: user.firstName, lastName: user.lastName,
                    mobile: user.mobile, gender: user.gender.toString(), dateOfBirth: user.dateOfBirth,
                    city: user.city, district: user.district, ward: user.ward, address1: user.address1, address2: user.address2})

            });
        }
        
               
    }
    getTitle() {
        if (this.state.id === 'add') {
            return <h3 className='text-center'>Add User</h3>
        }
         else {
             return <h3 className='text-center'>Update User</h3>
         }
    }
    showAlert() {
        if (!this.state.alert) {
            return <div className="alert alert-warning">Username or Email already existed!</div>
        }
    }
    changeMobileHandler = (e) => {
        this.setState({mobile: e.target.value})
    }
    changeDateOfBirthHandler = (e) => {
        this.setState({dateOfBirth: e.target.value})
    }
    changeGenderHandler = (e) => {
        this.setState({gender: e.target.value})
    }
    changeCityHandler = (e) => {
        this.setState({city: e.target.value})
    }
    changeDistrictHandler = (e) => {
        this.setState({district: e.target.value})
    }
    changeWardHandler = (e) => {
        this.setState({ward: e.target.value})
    }
    changeAddress1Handler = (e) => {
        this.setState({address1: e.target.value})
    }
    changeAddress2Handler = (e) => {
        this.setState({address2: e.target.value})
    }
    changeUsernameHandler = (e) => {
        this.setState({username: e.target.value})
    }
    changeEmailHandler = (e) => {
      this.setState({email: e.target.value})
    }
    changeFirstNameHandler = (e) => {
      this.setState({firstName: e.target.value})
    }
    changeLastNameHandler = (e) => {
      this.setState({lastName: e.target.value})
    }
    changePassword2Handler = (e) => {
        this.setState({password2: e.target.value})
    }
    changePasswordHandler = (e) => {
        this.setState({password: e.target.value})
    }
    createOrUpdateUser = (e) => {
        e.preventDefault();
        const user = {email: this.state.email, firstName: this.state.firstName, lastName: this.state.lastName,
            mobile: this.state.mobile, dateOfBirth: this.state.dateOfBirth, gender: this.state.gender, 
            city: this.state.city, district: this.state.district, ward: this.state.ward, address1: this.state.address1, 
            address2: this.state.address2}
        if (this.state.id === 'add') {
            AdminService.createUser(user).then(res => {
                if (res.data.success === false) {
                    this.setState({alert: res.data.success})
                } else {
                    this.props.navigate('/all/users');
                }
            });
        } else {
            if (this.state.isAdmin) {
                AdminService.updateUser(this.state.id, user).then(res => {
                    if (res.data.success === false) {
                        console.log(res.data)
                        this.setState({alert: res.data.success})
                    } else {
                        this.props.navigate("/all/users");
                    }
                });
            } else {
                //console.log(user);
                UserService.updateUser(user, this.state.id).then(res => {
                    if (res.data.success === false) {
                        console.log(res.data)
                        this.setState({alert: res.data.success})
                    } else {
                        this.props.navigate(`/profile/${this.state.id}`);
                    }
                });
            }
        }
        
    }
    cancel() {
      if (this.state.id === 'add') {
        this.props.navigate('/all/users')
      } else {
        this.props.navigate(`/profile/${this.state.id}`)
      }
    }
  render() {
    return (
      <div>
        <div className='main-body mt-3'>
          <div className='container'>
              <div className='row pb-3'>
                {this.state.isLogged && this.state.id !== "add" ? (<>
                  <div className='card col-md-6 offset-md-3 col-sm-12'>
                      { this.getTitle() }
                      <div className='card-body'>
                          <Form>
                            <Form.Group>
                            { this.showAlert()}
                            </Form.Group>
                            <Form.Group controlId='formBasicUsername'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control className = "font-bold" type = "text" placeholder="Enter username" name = "username" 
                                    style={{fontWeight: "bold"}} value={this.state.username} onChange={this.changeUsernameHandler} disabled/>
                            </Form.Group>
                            <Form.Group controlId='formBasicEmail'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type = "email" placeholder="Enter your email" name = "email" 
                                   style={{fontWeight: "bold"}} value={this.state.email} onChange={this.changeEmailHandler} />
                            </Form.Group>
                            <Form.Group controlId='formBasicFirstname'>
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control type = "text" placeholder="Enter your first name" name = "firstName" 
                                    style={{fontWeight: "bold"}} value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                            </Form.Group>
                            <Form.Group controlId='formBasicLastname'>
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control type = "text" placeholder="Enter your last name" name = "lastName" 
                                   style={{fontWeight: "bold"}} value={this.state.lastName} onChange={this.changeLastNameHandler} />
                            </Form.Group>
                            <Form.Group controlId='formBasicPhone'>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type = "text" placeholder="Enter your phone number" name = "mobile" 
                                   style={{fontWeight: "bold"}} value={this.state.mobile} onChange={this.changeMobileHandler} />
                            </Form.Group>
                            <Form.Group controlId='formBasicDateOfBirth'>
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control type = "date" name = "dateOfBirth"
                                   style={{fontWeight: "bold"}} value={this.state.dateOfBirth} onChange={this.changeDateOfBirthHandler} />
                            </Form.Group>
                            <Form.Group controlId='formBasicGender'>
                                <Form.Label>Gender</Form.Label>
                                <div>
                                    <input type="radio" value = "0" name = "gender" checked={this.state.gender === '0'} onChange={this.changeGenderHandler}/> Other
                                    <input type="radio" value = "1" name = "gender" checked={this.state.gender === '1'} onChange={this.changeGenderHandler}/> Male
                                    <input type="radio" value = "2" name = "gender" checked={this.state.gender === '2'} onChange={this.changeGenderHandler}/> Female
                                </div>
                            </Form.Group>
                            <Form.Group controlId='formBasicCity'>
                                <Form.Label>City</Form.Label>
                                <Form.Control type = "text" placeholder="Enter your city" name = "city" 
                                   style={{fontWeight: "bold"}} value={this.state.city} onChange={this.changeCityHandler} />
                            </Form.Group>
                            <Form.Group controlId='formBasicDistrict'>
                                <Form.Label>District</Form.Label>
                                <Form.Control type = "text" placeholder="Enter your district" name = "district" 
                                   style={{fontWeight: "bold"}} value={this.state.district} onChange={this.changeDistrictHandler} />
                            </Form.Group>
                            <Form.Group controlId='formBasicWard'>
                                <Form.Label>Ward/Commune</Form.Label>
                                <Form.Control type = "text" placeholder="Enter your ward/commune" name = "ward" 
                                   style={{fontWeight: "bold"}} value={this.state.ward} onChange={this.changeWardHandler} />
                            </Form.Group>
                            <Form.Group controlId='formBasicAddress1'>
                                <Form.Label>Address 1</Form.Label>
                                <Form.Control type = "text" placeholder="Enter your address" name = "address1" 
                                   style={{fontWeight: "bold"}} value={this.state.address1} onChange={this.changeAddress1Handler} />
                            </Form.Group>
                            <Form.Group controlId='formBasicAddress2'>
                                <Form.Label>Address 2</Form.Label>
                                <Form.Control type = "text" placeholder="Enter your another address" name = "address2" 
                                   style={{fontWeight: "bold"}} value={this.state.address2} onChange={this.changeAddress2Handler} />
                            </Form.Group>
                            
                            { this.state.isAdmin && this.state.id==="add" && (<>
                            <Form.Group controlId='formBasicPassword'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type = "password" placeholder="Enter your password" name = "password" 
                                   style={{fontWeight: "bold"}} value={this.state.password} onChange={this.changePasswordHandler} />
                            </Form.Group>
                            <Form.Group controlId='formBasicPassword2'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type = "password" placeholder="Enter your password again" name = "password2"
                                    style={{fontWeight: "bold"}} value={this.state.password2} onChange={this.changePassword2Handler} />
                            </Form.Group>
                            </>
                            )}
                            <Form.Group className = "mt-2">
                                <Button className='btn btn-success' onClick={this.createOrUpdateUser}>Save</Button>
                                <Button className='btn btn-danger' onClick={this.cancel.bind(this)} style = {{marginLeft: "10px"}}>Cancel</Button>
                            </Form.Group>
                            
                          </Form>
                      </div>
                  </div>
                  </>) : (
                    <><h3 className = "text-center">NOT FOUND</h3></>
                  )}
              </div>
          </div>  
        </div>
    </div>
    )
  }
}

function WithNavigate(props) {
    const navigate = useNavigate();
    const match = {params: useParams()}
    return <AddUser {...props} navigate = {navigate} match = {match}/>
}
export default WithNavigate