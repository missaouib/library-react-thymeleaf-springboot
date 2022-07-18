import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import BookService from '../../services/books/BookService';
import AuthorService from '../../services/authors/AuthorService';
import PublisherService from '../../services/publishers/PublisherService';
import CategoryService from '../../services/categories/CategoryService';
import AuthService from '../../services/auth/AuthService';
import AdminService from '../../services/auth/AdminService';


class AddBook extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            isbn: '',
            name: '',
            serialName: '',
            language: '',
            description: '',
            authors: [],
            categories: [],
            publishers: [],
            authorId: '',
            categoryId: '',
            publisherId: '',
            image: '',
            alert: true,
            error: '',
            currentUser: undefined,
            isAdmin: false
        }

        this.changeIsbnHandler = this.changeIsbnHandler.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSerialNameHandler = this.changeSerialNameHandler.bind(this);
        this.changeLanguageHandler = this.changeLanguageHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.createOrUpdateBook = this.createOrUpdateBook.bind(this);
        this.changeAuthorIdHandler = this.changeAuthorIdHandler.bind(this);
        this.changeCategoryIdHandler = this.changeCategoryIdHandler.bind(this);
        this.changePublisherIdHandler = this.changePublisherIdHandler.bind(this);
        this.changeFileHandler = this.changeFileHandler.bind(this);
        this.showAlert = this.showAlert.bind(this);
    }
    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) this.setState({currentUser: user, isAdmin: user.roles.includes('ROLE_ADMIN')})
        if (this.state.id === 'add') {
            AuthorService.getAuthors().then((res) => {
                this.setState({authors: res.data})
                this.setState({authorId: res.data[0].id})
            });

            CategoryService.getCategories().then((res) => {
                this.setState({categories: res.data})
                this.setState({categoryId: res.data[0].id})
            })

            PublisherService.getPublishers().then((res) => {
                this.setState({publishers: res.data})
                this.setState({publisherId: res.data[0].id})
               
            })
            return
            
        } else {
            AuthorService.getAuthors().then((res) => {
                this.setState({authors: res.data})
            });

            CategoryService.getCategories().then((res) => {
                this.setState({categories: res.data})
            })

            PublisherService.getPublishers().then((res) => {
                this.setState({publishers: res.data})
            })

            BookService.getBookById(this.state.id).then( (res) => {
                let book = res.data;
                console.log(book);
                this.setState({isbn: book.isbn, name: book.name, serialName: book.serialName,
                  language: book.language, description: book.description});
                this.setState({authorId: book.authors[0].id})
                this.setState({categoryId: book.categories[0].id})
                this.setState({publisherId: book.publishers[0].id})

            });
        }
        
               
    }
    getTitle() {
        if (this.state.id === 'add') {
            return <h3 className='text-center'>Add Book</h3>
        }
         else {
             return <h3 className='text-center'>Update Book</h3>
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
    changeFileHandler = (event) => {
        this.setState({image: event.target.files})
    }
    changeIsbnHandler = (event) => {
        this.setState({isbn: event.target.value})
    }
    changeNameHandler = (event) => {
        this.setState({name: event.target.value})
    }
    changeSerialNameHandler = (event) => {
        this.setState({serialName: event.target.value})
    }
    changeLanguageHandler = (event) => {
      this.setState({language: event.target.value})
    }
    changeDescriptionHandler = (event) => {
      this.setState({description: event.target.value})
    }
    changeAuthorIdHandler = (event) => {
        this.setState({authorId: event.target.value})
    }
    changePublisherIdHandler = (event) => {
        this.setState({publisherId: event.target.value})
    }
    changeCategoryIdHandler = (event) => {
        this.setState({categoryId: event.target.value})
    }
    createOrUpdateBook = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", this.state.image[0]);
        formData.append("book", new Blob(
            [JSON.stringify({
                isbn: this.state.isbn,
                name: this.state.name,
                serialName: this.state.serialName,
                language: this.state.language,
                description: this.state.description,
                authorId: this.state.authorId,
                categoryId: this.state.categoryId,
                publisherId: this.state.publisherId
            })],
            { type: "application/json"}
        ))
        console.log("author ID: " + this.state.authorId + ", categoryId= " + 
            this.state.categoryId + ", pubId = " + this.state.publisherId)
        
        if (this.state.id === 'add') {
            AdminService.createBook(formData).then(res => {
                if (res.data.success === false) {
                    this.setState({alert: res.data.success, error: this.state.message})
                } else {
                    this.setState({alert: false, error: this.state.message})
                    this.props.navigate('/all/books');
                }
            });
        } else {
            AdminService.updateBook(formData, this.state.id).then(res => {
                if (res.data.success === false) {
                    console.log(res.data)
                    this.setState({alert: res.data.success, error: this.state.message})
                } else {
                    this.setState({alert: false, error: this.state.message})
                    this.props.navigate(`/books/${this.state.id}`);
                }
            });
        }
        
    }
    cancel() {
        this.props.navigate('/all/books')
    }
    addAuthor() {
        this.props.navigate('/create-author/add')
    }
    addCategory() {
        this.props.navigate('/create-category/add')
    }
    addPublisher() {
        this.props.navigate('/create-publisher/add')
    }
  render() {
    return (
      <div>
        <div className='main-body mt-3'>
            
          <div className='container'>
                
            {this.state.isAdmin ? (<>
              <div className='row pb-3'>
                  <div className='card col-md-6 offset-md-3 col-sm-12'>
                      {
                          this.getTitle()
                      }
                      <div className='card-body'>
                          <Form>
                            <Form.Group>
                            { this.showAlert() }
                            </Form.Group>
                            <Form.Group controlId='formBasicIsbn'>
                                <Form.Label>ISBN</Form.Label>
                                <Form.Control className = "font-bold" type = "text" placeholder="ISBN" name = "isbn" 
                                    style={{fontWeight: "bold"}} value={this.state.isbn} onChange={this.changeIsbnHandler} />
                            </Form.Group>
                            <Form.Group controlId='formBasicName'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type = "text" placeholder="Name" name = "name" 
                                   style={{fontWeight: "bold"}} value={this.state.name} onChange={this.changeNameHandler} />
                            </Form.Group>
                            <Form.Group controlId='formBasicSerialName'>
                                <Form.Label>Serial Name</Form.Label>
                                <Form.Control type = "text" placeholder="Serial Name" name = "serialName" 
                                    style={{fontWeight: "bold"}} value={this.state.serialName} onChange={this.changeSerialNameHandler} />
                            </Form.Group>
                            <Form.Group controlId='formBasicLanguage'>
                                <Form.Label>Language</Form.Label>
                                <Form.Control type = "text" placeholder="Language" name = "language" 
                                   style={{fontWeight: "bold"}} value={this.state.language} onChange={this.changeLanguageHandler} />
                            </Form.Group>
                            <Form.Group controlId='formBasicLanguage'>
                                <Form.Label>Description</Form.Label>
                                <textarea className = "form-control" placeholder="Description" name = "description" style={{width: "100%", height: "100px", resize: "none", fontWeight: "bold"}}
                                    value={this.state.description} onChange={this.changeDescriptionHandler} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Author&nbsp;[Add <a href = "/create-author/add">Here</a>]</Form.Label>
                                <Form.Select onChange={this.changeAuthorIdHandler} value = {this.state.authorId}>
                                    { this.state.authors.map( (author) => 
                                        <option key = { author.id } value = {author.id} >{ author.name }</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Category&nbsp;[Add <a href = "/create-author/add">Here</a>]</Form.Label>
                                <Form.Select onChange={this.changeCategoryIdHandler} value = {this.state.categoryId}>
                                    { this.state.categories.map( (category) => 
                                        <option key = { category.id } value = {category.id} >{ category.name }</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Publisher&nbsp;[Add <a href = "/create-author/add">Here</a>]</Form.Label>
                                <Form.Select className='form-control' onChange={this.changePublisherIdHandler} value = {this.state.publisherId}>
                                    { this.state.publishers.map( (publisher) => 
                                        <option key = { publisher.id } value = {publisher.id}>{ publisher.name }</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Picture  </Form.Label>
                                <p style={{color: "red"}}><i>Ignore this field if you don't want to change picture.</i></p>
                                <Form.Control accept="image/png, image/jpeg" type="file" placeholder = "Picture" name = "image" onChange = { this.changeFileHandler }/>
                            </Form.Group>
                            <Form.Group className = "mt-2">
                                <Button className='btn btn-success' onClick={this.createOrUpdateBook}>Save</Button>
                                <Button className='btn btn-danger' onClick={this.cancel.bind(this)} style = {{marginLeft: "10px"}}>Cancel</Button>
                            </Form.Group>
                            
                          </Form>
                      </div>
                  </div>
              </div>
              </>
              ) : (
                <>
                <h3 className='text-center'>Access Denied</h3>
                </>
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
    return <AddBook {...props} navigate = {navigate} match = {match}/>
}
export default WithNavigate