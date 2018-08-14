import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost, showPost, editPost } from '../actions/postActions';
import { withRouter } from 'react-router-dom';
import * as API from '../utils/api';
import { listCategories } from "../actions/categoryActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

class AddPost extends Component {

    state = {
        id: '',
        title: '',
        author: '',
        category: '',
        body: '',
        isEdit: false,
        notFound: false
    };

    componentDidMount() {
        API.getAllCategories().then((response) => this.props.dispatch(listCategories(response)));
       
        if(this.props.match.params.id){
            API.getPost(this.props.match.params.id).then(post => this.props.dispatch(showPost(post)))
        }
        
    }

    componentWillReceiveProps(nextProp){
        if(this.props.match.params.id && nextProp.posts.post){
            if(!nextProp.posts.post.title){
                this.setState({
                    notFound: true
                })
            }else{
                this.setState({
                    title: nextProp.posts.post.title,
                    body: nextProp.posts.post.body,
                    isEdit: true
                })
            }
        }
    }

    handleAddPost = (e) => {
        e.preventDefault()

        const post = {};
        post.id =  Date.now();
        post.timestamp = Date.now();
        post.author = this.state.author;
        post.body = this.state.body;
        post.title = this.state.title;
        post.category = this.state.category;

        API.addNewPost(post).then(post => this.props.dispatch(addPost(post)));
        this.props.history.push('/')
    }

    handleEditPost = (e) => {
        e.preventDefault()
        const post = {};
        post.body = this.state.body;
        post.title = this.state.title;

        API.editPost(this.props.match.params.id, post).then(post => this.props.dispatch(editPost(this.props.match.params.id, post)))
        this.props.history.push('/')
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    render() {
        const { category, title, author, body, isEdit, notFound } = this.state;
        const { categories } = this.props.categories.categories;

        return (

            <div className="add-post">
                {notFound === true &&
                    <h1 className="text-center">404</h1>
                }
                {notFound === false && 
                    <form className="post-form">
                        {isEdit === false &&
                            <Typography variant="title">
                                Add New Post
                            </Typography>
                        }
                        {isEdit === true &&
                            <Typography variant="title">
                            Edit Post
                            </Typography>
                        }
                        <TextField
                            id="title"
                            label="Title"
                            name="title"
                            margin="normal"
                            value={title}
                            onChange={(event) => this.handleChange(event)}
                            fullWidth
                        />
                        {isEdit === false &&
                            <div>
                                <TextField
                                    id="author"
                                    label="Author"
                                    name="author"
                                    margin="normal"
                                    value={author}
                                    onChange={(event) => this.handleChange(event)}
                                    fullWidth
                                />
                                <InputLabel htmlFor="category">Category: </InputLabel>
                                <Select inputProps={{                            
                                        id: 'category',
                                    }}
                                    name ="category"
                                    onChange={(event) => this.handleChange(event)} value={category}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {categories !== undefined && categories.map((category) => (
                                        <MenuItem key={category.name} value={category.name} >{category.name}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                        }
                        <TextField
                            id="body"
                            label="Body"
                            name="body"
                            multiline
                            rowsMax="5"
                            margin="normal"
                            value={body}
                            onChange={(event) => this.handleChange(event)}
                            fullWidth
                        />
                        {isEdit === false &&
                            <Button style={{ float: 'right' }} color="primary" onClick={(event) => this.handleAddPost(event)}>Add</Button>
                        }
                        {isEdit === true &&
                            <Button style={{ float: 'right' }} color="primary" onClick={(event) => this.handleEditPost(event)}>Edit</Button>
                        }
                            
                    </form>
                }
            </div>
        )
    }
}

function mapStateToProps({categories, posts}) {
    return {categories, posts}
}


export default withRouter(connect(mapStateToProps, null)(AddPost))