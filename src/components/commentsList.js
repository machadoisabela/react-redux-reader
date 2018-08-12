import React, { Component } from "react";
import { connect } from 'react-redux';
import { listComments, addVoteOnComment, addComment, deleteComment } from "../actions/commentsActions";
import * as API from '../utils/api';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class CommentsList extends Component {

    state = {
        author: '',
        body: ''
    };

    handleAddComment = (e) => {
        e.preventDefault()

        const comment = {};
        comment.id = Date.now();
        comment.timestamp = Date.now();
        comment.author = this.state.author;
        comment.body = this.state.body;
        comment.parentId = this.props.match.params.id;

        API.addNewComment(comment).then(comment => this.props.dispatch(addComment(comment)));

        this.setState({
            body: '',
            author: ''
        });
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleVote = (id, option) => {
        let data = {
            option: option
        }

        let vote = option === 'upVote' ? 1 : -1
        API.voteComment(id, data).then(() => this.props.dispatch(addVoteOnComment(id, vote)));
    }

    handleDeleteComment = (id) => {
        API.deleteComments(id).then(() => this.props.dispatch(deleteComment(id)));
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        if (id) {
            API.getAllComments(id).then(comments => this.props.dispatch(listComments(id, comments)));
        }
    }

    render() {

        const { comments } = this.props.comments;
        const { author, body } = this.state;

        return (
            <div>
                <List>
                    {comments.length !== 0 && comments.map((comment) =>
                        <ListItem key={comment.id} className="details-comments">
                            <ListItemText primary={comment.body} secondary={comment.author}></ListItemText>
                            <ListItemSecondaryAction>
                                {comment.voteScore} Vote(s)
                                <IconButton onClick={() => this.handleVote(comment.id, 'upVote')} aria-label="Vote Up">
                                    <ArrowUpwardIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={() => this.handleVote(comment.id, 'downVote')} aria-label="Vote Down">
                                    <ArrowDownwardIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={() => this.handleDeleteComment(comment.id)} aria-label="Delete">
                                    <CloseIcon color="primary" />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                </List>
                <form className="new-comment">
                    <div className="mt-5">Add New Comment</div>
                    <TextField
                        id="author"
                        label="Author"
                        name="author"
                        margin="normal"
                        value={author}
                        onChange={(event) => this.handleChange(event)}
                        fullWidth
                    />
                    <TextField
                        id="body"
                        label="Body"
                        name="body"
                        margin="normal"
                        value={body}
                        onChange={(event) => this.handleChange(event)}
                        fullWidth
                    />
                    <Button style={{ float: 'right' }} color="primary" onClick={(event) => this.handleAddComment(event)}>Add</Button>
                </form>
            </div>
        )
    }
}


function mapStateToProps({ comments }) {
    return { comments }
}

export default withRouter(connect(mapStateToProps, null)(CommentsList))
