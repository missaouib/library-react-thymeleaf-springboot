import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from '../../services/auth/AuthService';
/*
const required = (value) => {
    if (!value) {
        return (
            <div className='alert alert-danger' role = 'alert'>
                This field is required!
            </div>
        );
    }
};
*/
function validate(username, password) {
    // true means invalid, so our conditions got reversed
    return {
      username: !new RegExp(/^[a-zA-Z0-9]+$/).test(username) || username.length < 6 || username.length > 40, //true if username is invalid
      password: password.length < 8 || password.length > 40, //true if password is invalid
    };
}

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            success: this.props.navigate.success,
            username: '',
            password: '',
            loading: false,
            message: "",
            touched: {
                username: false,
                password: false
            }
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
    }
    
    
    handleBlur = (field) => (event) => {
        this.setState({
            touched: {...this.state.touched, [field]: true},
        });
    }
    canBeSubmmited() {
        const errors = validate(this.state.username, this.state.password);
        const isDisable = Object.keys(errors).some(x => errors[x]);
        console.log("is disabled: " + isDisable);
        return isDisable;
    }
    onChangeUsername = (e) => {
        this.setState({username: e.target.value})
    }
    onChangePassword = (e) => {
        this.setState({password: e.target.value})
    }
    showAlert() {
        if (this.state.success) {
            return (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Registration was successfully.</strong>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            );
        }
    }
    handleLogin = (e) => {
        e.preventDefault();
        this.setState({
            message: "",
            loading: true
        });

        if (!this.canBeSubmmited()) {
            let userinfo = {username: this.state.username, password: this.state.password}
            AuthService.login(userinfo).then(
                () => {
                    const user = AuthService.getCurrentUser();
                    let id = user.id;
                    this.props.navigate(`/profile/${id}`);
                },
                error => {
                    let resMessage = 
                        (error.response && error.response.data && 
                            error.response.data.message) || error.message || error.toString();
                    if (resMessage.includes('code 401')) resMessage = 'Wrong username or password';
                    this.setState({loading: false, message: resMessage})
                }
            );
        } else {
            this.setState({loading: false})
        }
    }
    cancel() {
        this.props.navigate('/')
    }

  render() {
    const errors = validate(this.state.username, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const shouldMarkError = (field) => {
        const hasError = errors[field]
        const shouldShow = this.state.touched[field]
        return hasError ? shouldShow: false;
    };

    return (
      <div>
        <div className='main-body mt-3'>
          <div className='container'>
              <div className='row pb-3'>
                  <div className='card col-md-6 offset-md-3 col-sm-12'>
                      <h3 className='text-center'>Sign In</h3>
                      {this.showAlert()}
                      <div className='card-body'>
                          <Form onSubmit={this.handleLogin} className = "form-custom">
                            <Form.Group controlId='formBasicUsername'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control className = "font-bold" type = "text" placeholder="Enter username" name = "username" 
                                    style={{fontWeight: "bold"}} value={this.state.username} onChange={this.onChangeUsername} 
                                    onBlur={this.handleBlur('username')} required/>
                                <span className={shouldMarkError('username') ? "error":"hidden"}>The username must be between 8 and 20 characters.</span>
                            </Form.Group>

                            <Form.Group controlId='formBasicPassword'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type = "password" placeholder="Enter your password" name = "password" 
                                   style={{fontWeight: "bold"}} value={this.state.password} onChange={this.onChangePassword} 
                                   onBlur={this.handleBlur('password')} required/>
                                   <span className={shouldMarkError('password') ? "error":"hidden"}>The password must be between 8 and 20 characters.</span>
                            </Form.Group>
                            <Form.Group className = "mt-2">
                                <Button className='btn btn-success' onClick={this.handleLogin} disabled={isDisabled}>Login</Button>
                                <Button className='btn btn-danger' onClick={this.cancel.bind(this)} style = {{marginLeft: "10px"}}>Cancel</Button>
                            </Form.Group>
                            <Form.Group className='mt-2'>
                                <p>Don't have a account. Sign up <a href = "/register">Here</a></p>
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
    return <LoginComponent {...props} navigate = {navigate} match = {match}/>
}
export default WithNavigate