import React, { Component } from "react";
import { connect } from 'react-redux';
import * as API from '../utils/api';
import { showPost } from "../actions/postActions";
import { withRouter, Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { addVote, deletePost } from "../actions/postActions";
import CommentsList from './commentsList';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';


class PostDetails extends Component {

    handleVote = (id, option) => {
        let data = {
            option: option
        }

        let vote = option === 'upVote' ? 1 : -1
        API.vote(id, data).then(() => this.props.dispatch(addVote(id, vote)));
    }

    handleDeletePost = (id) => {
        API.getDeletePost(id).then(() => this.props.dispatch(deletePost(id)));
        this.props.history.push('/')
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        if (id) {
            API.getPost(id).then(post => this.props.dispatch(showPost(post)));
        }
    }

    render() {

        const { post } = this.props;

        return (
            <div className="">
                {post && (
                    <Card className="post-detail">
                        <h1>{post.title}</h1>
                        <div className="author">Writed by {post.author}</div>
                        <div className="body">{post.body}</div>
                        <div className="actions">
                            <div className="vote">{post.voteScore} Vote(s)</div>
                            <IconButton onClick={() => this.handleVote(post.id, 'upVote')} className="mg-5" aria-label="Vote Up">
                                <ArrowUpwardIcon color="primary" />
                            </IconButton>
                            <IconButton onClick={() => this.handleVote(post.id, 'downVote')} className="mg-5" aria-label="Vote Down">
                                <ArrowDownwardIcon color="primary" />
                            </IconButton>
                            <Button className="mg-5" size="small" onClick={() => this.handleDeletePost(post.id)}>Delete</Button>
                            <Button className="mg-5" size="small" component={Link} to={`/edit/post/${post.category}/${post.id}`}>Edit</Button>
                        </div>
                        <div>
                            <div>{post.commentCount} Comment(s)</div>
                            <CommentsList />
                        </div>
                    </Card>
                )}
            </div>
        )
    }
}


function mapStateToProps({ posts }) {
    return posts
}

export default withRouter(connect(mapStateToProps, null)(PostDetails))
