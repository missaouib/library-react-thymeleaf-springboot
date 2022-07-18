import React, { Component } from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import BookService from '../../services/books/BookService';
import '../../assets/css/style.css';
import '../../assets/css/starability-all.min.css';
import { Button, Form } from 'react-bootstrap';
import AuthService from '../../services/auth/AuthService';
import AdminService from '../../services/auth/AdminService';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserService from '../../services/user/UserService';
class BookDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            book: {},
            authors: [],
            publishers: [],
            categories: [],
            alert: true,
            error: '',
            currentUser: undefined,
            userId: '',
            isAdmin: false,
            posts: [],
            col: 'col-md-12',
            hidden: "none",
            postId: '',
            star: '0',
            createdAt: '',
            comment: '',
            page: 0,
            size: 5,
            checkAdd: '',
        }
        this.editBook = this.editBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.changeCommentHandler = this.changeCommentHandler.bind(this);
        this.changeStarHandler = this.changeStarHandler.bind(this);
        this.showPost = this.showPost.bind(this);
        this.unshowPost = this.unshowPost.bind(this);
        this.showMore = this.showMore.bind(this);
        this.userOwnPost = this.userOwnPost.bind(this);
        this.createOrUpdatePost = this.createOrUpdatePost.bind(this);
        this.deletePost = this.deletePost.bind(this);

    }
    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) this.setState({currentUser: user, isAdmin: user.roles.includes('ROLE_ADMIN'), userId: user.id});
        BookService.getBookById(this.state.id).then(res => {
            this.setState({book: res.data});
            this.setState({authors: res.data.authors})
            this.setState({publishers: res.data.publishers})
            this.setState({categories: res.data.categories})
        });
        BookService.getPosts(this.state.id, this.state.page, this.state.size).then(res => {
            this.setState({posts: res.data})
        })
    }
    changeStarHandler = (e) => {
        this.setState({star: e.target.value})
    }
    changeCommentHandler = (e) => {
        this.setState({comment: e.target.value})
    }
    showPost() {
        if (this.state.userId === "") this.props.navigate("/login")
        UserService.getPost(this.state.userId, this.state.id).then(res => {
            if (res.data.star) {
                this.setState({checkAdd: 'update'})
                this.setState({star: res.data.star.toString(), comment: res.data.comment, postId: res.data.postId, createdAt: res.data.createdAt})
            } else {
                this.setState({checkAdd: 'add'})
            }
        })
        this.setState({col: "col-md-6 col-12"});
        this.setState({hidden: "block"})
        
        
    }
    unshowPost() {
        this.setState({hidden: "none", col: "col-md-12", star: '0'})
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

    showMore() {
        this.setState({page: this.state.page += 1});
        BookService.getPosts(this.state.id, this.state.page.toString(), this.state.size.toString()).then(res => {
            this.setState({posts: this.state.posts.concat(res.data)});
        })
    }
    userOwnPost(userId, star, comment) {
        this.setState({userId: userId, star: star, comment: comment})
    }
    editBook(id) {
        this.props.navigate(`/create-book/${id}`);
    }
    createOrUpdatePost() {
        if (this.state.checkAdd === "add") {
            const post = {star: this.state.star, comment: this.state.comment}
            console.log(post)
            UserService.createPost(this.state.userId, this.state.id, post).then(res => {
                this.setState({alert: false, error: "Post created successfully"});
                window.location.reload();
            })

        } else if (this.state.checkAdd === "update") {
            const post = {star: this.state.star, comment: this.state.comment}
            console.log(post)
            UserService.updatePost(this.state.postId, post).then(res => {
                this.setState({alert: false, error: "Post updated successfully"});
                window.location.reload();
            })
        }
    }
    deletePost(id) {
        UserService.deletePost(id).then(res => {
            this.setState({alert: false, error: res.data.message})
            this.setState({posts: this.state.posts.filter(post => post.id !== id)});
            window.location.reload();
        })
    }
    deleteBook(id) {
        AdminService.deleteBook(id).then(res => {
            if (res.data.success) {
                this.setState({alert: false, error: res.data.message})
                this.props.navigate("/all/books")
            } else {
                this.setState({alert: res.data.success, error: "Oops. Something went wrong. Please try again."})
            }
        })
    }
    cancel() {
        this.props.navigate("/all/books");
    }

  render() {
    return (
      <div>
        <div className='main-body pb-3'>
        { this.showAlert() }
        <div className="card">
            <div className="container-fluid">
                <div className="wrapper row">
                    <div className="preview col-md-6">
                        
                        <div className="preview-pic tab-content">
                        <div className="tab-pane active" id="pic-1"><img src={"http://localhost:8081"+this.state.book.photoImagePath} alt="Book"/></div>
                        </div>
                        
                    </div>
                    <div className="details col-md-6">
                        <h3 className="product-title">{ this.state.book.name }</h3>
                        <div className = "row">
                            <span>
                                <strong className = "head-title">Description: </strong>
                                <p className="product-description">{ this.state.book.description }</p>
                            </span>
                        </div>
                        <div className = "row">
                            <span className = "col-12">
                                <strong className = "head-title">ISBN: </strong>
                                <p>{ this.state.book.isbn }</p>
                            </span>
                        </div>
                        <div className = "row">
                            <span className = "col-12">
                                <strong className = "head-title">Serial Name: </strong>
                                <p>{ this.state.book.serialName }</p>
                            </span>
                        </div>
                        <div className = "row">
                            <span className = "col-12">
                                <strong className = "head-title">Language: </strong>
                                <p>{ this.state.book.language }</p>
                            </span>
                        </div>
                        <div className = "row">
                            <span className = "col-12">
                                <strong className = "head-title">Author: </strong>
                                <span>
                                    { this.state.authors.map( author => 
                                        <p style={{color: "blue"}} key = {author.id}>{ author.name }</p>
                                    )}   
                                </span>
                            </span>
                        </div>
                        <div className = "row">
                            <span className = "col-12">
                                <strong className = "head-title">Category: </strong>
                                <span>
                                    { this.state.categories.map( category => 
                                        <p style={{color: "blue"}} key = {category.id}>{ category.name }</p>
                                    )}   
                                </span>
                            </span>
                        </div>
                        <div className = "row">
                            <span className = "col-12">
                                <strong className = "head-title">Publisher: </strong>
                                <span>
                                    { this.state.publishers.map( publisher => 
                                        <p style={{color: "blue"}} key={publisher.id}>{ publisher.name }</p>
                                    )}   
                                </span>
                            </span>
                        </div>
                        <div className="row action">
                            <span className = "col-12">
                                { this.state.isAdmin && (<>
                                <Button onClick = {() => this.editBook(this.state.book.id)} className = "btn btn-primary margin-left-1">Edit</Button>
                                <Button onClick = {() => this.deleteBook(this.state.book.id)} className = "btn btn-danger margin-left-1">Remove</Button>
                                </>)}
                                <Button onClick = {this.cancel.bind(this)} className = "btn btn-secondary margin-left-1">Back</Button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-5">
            <span className='text-center'>
                <button className='btn btn-warning mb-2' onClick={this.showPost}>Leave a Post</button>
            </span>
            <div className = "row">
                
                <div className={this.state.col} style={{display: this.state.hidden}}>
                    <div className='card'>
                    {this.showAlert()}
                    <div>
                        <p>{this.state.createdAt}</p>
                        <fieldset className="starability-fade">
                            <h5 className="font-bold"><i></i></h5>
                            <input type="radio" id="no-rate" className="input-no-rate" defaultChecked name="rating" value="0" aria-label="No rating."/>
                            <input type="radio" id="second-rate1" checked={this.state.star === '1'} name="rating" value="1" onChange={this.changeStarHandler}/>
                            <label htmlFor="second-rate1"  title="Terrible">1 star</label>
                            <input type="radio" id="second-rate2" checked={this.state.star === '2'} name="rating" value="2" onChange={this.changeStarHandler}/>
                            <label htmlFor="second-rate2" title="Not good">2 stars</label>
                            <input type="radio" id="second-rate3" checked={this.state.star === '3'} name="rating" value="3" onChange={this.changeStarHandler}/>
                            <label htmlFor="second-rate3" title="Average">3 stars</label>
                            <input type="radio" id="second-rate4" checked={this.state.star === '4'} name="rating" value="4" onChange={this.changeStarHandler}/>
                            <label htmlFor="second-rate4" title="Very good">4 stars</label>
                            <input type="radio" id="second-rate5" checked={this.state.star === '5'} name="rating" value="5" onChange={this.changeStarHandler}/>
                            <label htmlFor="second-rate5" title="Amazing">5 stars</label>
                        </fieldset>
                        <div className="comment-area mt-1">
                            <textarea className="form-control" placeholder="what is your view?" rows="4" style={{fontWeight: "bold"}} value={this.state.comment} onChange={this.changeCommentHandler}></textarea>
                        </div>
                        { this.state.userId !== '' && (
                            <div className="row mt-2">
                                <div className="col-12">
                                    <div className='d-flex flex-row-reverse'>
                                        <button className='btn btn-warning' onClick={this.unshowPost}>Back</button>&nbsp;&nbsp;
                                        { this.state.checkAdd !== 'add' && (<>
                                        <button className="btn btn-danger" onClick={() => this.deletePost(this.state.postId)}>Delete</button>&nbsp;&nbsp;
                                        </>)}
                                        <button className="btn btn-success" onClick={() => this.createOrUpdatePost()}>Submit</button>
                                        
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    </div>
                </div>
                <div className={this.state.col}>
                
                <div className = "card mt-2">
                { this.state.posts.length !== 0 ? (<>
                    { this.state.posts.map( post => 
                    <div className="comment-box ml-2" key={post.id}>
                        <fieldset className="starability-fade">
                            
                            { this.state.userId === post.user.id ? (
                                <h5 ><i className="font-bold">Your post</i></h5>
                                
                            ):(
                                <h5 ><i className="font-bold">{post.user.firstName} {post.user.lastName}</i></h5>
                            )}
                            <p>{post.createdAt}</p>
                            
                            { [...Array(post.star)].map((x, i) => 
                            <FontAwesomeIcon icon={faStar} style={{color: "#e25111"}} key={i}></FontAwesomeIcon>
                            )}
                            { [...Array(5-post.star)].map((x, i) => 
                            <FontAwesomeIcon icon={faStar} key={i}></FontAwesomeIcon>
                            )}
                            
                        </fieldset>
                        <div className="comment-area mt-1">
                            <textarea className="form-control" rows="4" style={{fontWeight: "bold"}} disabled value={post.comment}></textarea>
                        </div>
                        
                    </div>
                    )}
                    <div className='d-flex flex-row-reverse'>
                        <button className="btn btn-secondary" onClick={this.showMore} disabled={this.state.posts.length % 5 !== 0}>Show more</button>
                    </div>
                </>
                ):(
                    <h5 className='text-center'>There is no posts.</h5>
                )}
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
    const match = {params: useParams()};
    return <BookDetail {...props} navigate = {navigate} match = {match}/>
}

export default WithNavigate


