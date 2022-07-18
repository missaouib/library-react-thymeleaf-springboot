import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {Component} from 'react'
import { Button, Table } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import CategoryService from '../../services/categories/CategoryService';
import { faEdit, faTrash, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import AuthService from '../../services/auth/AuthService';
import AdminService from '../../services/auth/AdminService';

class CategoryHome extends Component{
    constructor(props) {
        super(props)

        this.state = {
            categories: [],
            isAdmin: false,
            alert: true,
            error: '',
            currentUser: undefined
        }
        this.addCategory = this.addCategory.bind(this);
        this.editCategory = this.editCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }
    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) this.setState({currentUser: user, isAdmin: user.roles.includes('ROLE_ADMIN')});

        CategoryService.getCategories().then((res) => {
            this.setState({categories: res.data})
        })
    }

    addCategory() {
        this.props.navigate('/create-category/add')
    }
    editCategory(id) {
        this.props.navigate(`/create-category/${id}`)
    }
    deleteCategory(id) {
        AdminService.deleteCategory(id).then(res => {
            if (res.data.success) {
                this.setState({alert: false, error: res.data.message})
                this.setState({categories: this.state.categories.filter(category => category.id !== id)});
            } else {
                this.setState({alert: false, error: res.data.message})
            }
        })
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
    render() {
        return (
            <div>
                <div className = "main-body pb-5">
                
                    <div className = "card">
                        {this.showAlert()}
                        <div className = "card-body font-link">
                        { this.state.isAdmin && (
                            <p className = "my-2">
                                <Button onClick = {this.addCategory} className = "btn btn-primary">
                                    <FontAwesomeIcon icon={faPlusCircle} /> Add Category
                                </Button>
                            </p>
                        )}
                            <Table striped hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        { this.state.isAdmin && (
                                        <th colSpan={2}>Function</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.categories.map( (category, index) =>
                                        <tr key = {category.id}>
                                            <td>{ index }</td>
                                            <td>{ category.name }</td>
                                            { this.state.isAdmin && (<>
                                            <td>
                                                <Button onClick={() => this.editCategory(category.id)} className="btn btn-primary"><FontAwesomeIcon icon={ faEdit } /></Button>
                                            </td>
                                            <td>
                                                <Button onClick={() => this.deleteCategory(category.id)} className="btn btn-danger"><FontAwesomeIcon icon={ faTrash } /></Button>
                                            </td>
                                            </>
                                            )}
                                        </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

function WithNavigate(props) {
    const navigate = useNavigate();
    //const match = {params: useParams()};
    return <CategoryHome {...props} navigate={navigate}/>
}

export default WithNavigate;
