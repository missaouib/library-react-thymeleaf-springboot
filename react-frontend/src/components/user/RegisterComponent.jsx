import React, { Component } from 'react';
import AuthService from '../../services/auth/AuthService';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className='alert alert-danger' role='alert'>
                The password must be between 8 and 20 characters.
            </div>
        )
    }
}

function validate(email, username, password, password2) {
    // true means invalid, so our conditions got reversed
    return {
        email: !new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email),
        username: !new RegExp(/^[a-zA-Z0-9]+$/).test(username) || username.length < 8 || username.length > 20,
        password: password.length < 8 || password.length > 40,
        password2: password2 !== password
    };
}
class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            password2: '',
            firstName: '',
            lastName: '',
            successful: false,
            touched: {
                email: false,
                username: false,
                password: false
            }
        }

        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePassword2 = this.onChangePassword2.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
    }
    onChangeEmail = (e) => {
        this.setState({email: e.target.value})
    }
    onChangeFirstName = (e) => {
        this.setState({firstName: e.target.value})
    }
    onChangeLastName = (e) => {
        this.setState({lastName: e.target.value})
    }

    onChangeUsername = (e) => {
        this.setState({username: e.target.value})
    }
    onChangePassword = (e) => {
        this.setState({password: e.target.value})
    }
    onChangePassword2= (e) => {
        this.setState({password2: e.target.value})
    }
    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true},
        });
    }
    cancel() {
        this.props.navigate('/')
    }
    canBeSubmitted() {
        const errors = validate(this.state.email, this.state.username, this.state.password, this.state.password2);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return isDisabled;
    }

    handleRegister = (e) => {
        e.preventDefault();
        this.setState({
            message: "",
            successful: false
        });

        if (!this.canBeSubmitted()) {
            let userinfo = {username: this.state.username, email: this.state.email, 
                password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName}
            console.log(userinfo);
                AuthService.register(userinfo).then(res => {
                this.setState({
                    message: res.data.message,
                    successful: true
                });
                this.props.navigate("/login", {success: true})
            },
            error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                this.setState({successful: false, message: resMessage})
            })
        }
    }
  render() {
    const errors = validate(this.state.email, this.state.username, this.state.password, this.state.password2);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const shouldMarkError = (field) => {
        const hasError = errors[field];
        const shouldShow = this.state.touched[field];
        return hasError ? shouldShow: false;
    }
    return (
      <div>
        <div className='main-body mt-3'>
          <div className='container'>
              <div className='row pb-3'>
                  <div className='card col-md-6 offset-md-3 col-sm-12'>
                      <h3 className='text-center'>Sign Up</h3>
                      <div className='card-body'>
                          <Form className = "form-custom">
                            <Form.Group controlId='formBasicUsername'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control className = "font-bold" type = "text" placeholder="Enter username" name = "username" 
                                    style={{fontWeight: "bold"}} value={this.state.username} onChange={this.onChangeUsername} 
                                    onBlur={this.handleBlur('username')} required/>
                                <span className={shouldMarkError('username') ? "error":"hidden"}>The username must be between 8 and 20 characters.</span>
                            </Form.Group>

                            <Form.Group controlId='formBasicFirstname'>
                                <Form.Label>First name</Form.Label>
                                <Form.Control className = "font-bold" type = "text" placeholder="Enter your firstname" name = "firstname" 
                                    style={{fontWeight: "bold"}} value={this.state.firstName} onChange={this.onChangeFirstName} 
                                    required/>
                                
                            </Form.Group>
                            <Form.Group controlId='formBasicLastname'>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control className = "font-bold" type = "text" placeholder="Enter your lastname" name = "lastname" 
                                    style={{fontWeight: "bold"}} value={this.state.lastName} onChange={this.onChangeLastName} 
                                    required/>
                                
                            </Form.Group>

                            <Form.Group controlId='formBasicEmail'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control className = "font-bold" type = "email" placeholder="Enter your email" name = "email" 
                                    style={{fontWeight: "bold"}} value={this.state.email} onChange={this.onChangeEmail} 
                                    onBlur={this.handleBlur('email')} required/>
                                <span className={shouldMarkError('email') ? "error":"hidden"}>Email is not valid.</span>
                            </Form.Group>

                            <Form.Group controlId='formBasicPassword'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type = "password" placeholder="Enter your password" name = "password" 
                                   style={{fontWeight: "bold"}} value={this.state.password} onChange={this.onChangePassword} 
                                   onBlur={this.handleBlur('password')} required/>
                                   <span className={shouldMarkError('password') ? "error":"hidden"}>The password must be between 8 and 20 characters.</span>
                            </Form.Group>
                            <Form.Group controlId='formBasicPassword2'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type = "password" placeholder="Enter your password again" name = "password2" 
                                   style={{fontWeight: "bold"}} value={this.state.password2} onChange={this.onChangePassword2} 
                                   onBlur={this.handleBlur('password2')} required/>
                                   <span className={shouldMarkError('password2') ? "error":"hidden"}>Password didnot match.</span>
                            </Form.Group>
                            <Form.Group className = "mt-2">
                                <Button className='btn btn-success' onClick={this.handleRegister} disabled={isDisabled}>Sign up</Button>
                                <Button className='btn btn-danger' onClick={this.cancel.bind(this)} style = {{marginLeft: "10px"}}>Cancel</Button>
                            </Form.Group>
                            <Form.Group className='mt-2'>
                                <p>Already have a account. Sign in <a href = "/login">Here</a></p>
                            </Form.Group>
                            { this.state.message && (
                                <div className='form-group mt-2'>
                                    <div className='alert alert-danger' role="alert">
                                        {this.state.message}
                                    </div>
                                </div>
                            )}
                          </Form>
                      </div>
                  </div>
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
    return <RegisterComponent {...props} navigate = {navigate} match = {match}/>
}
export default WithNavigate
