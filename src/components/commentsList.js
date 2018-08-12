import React, { Component } from "react";
import { connect } from 'react-redux';
import { listComments, addVoteOnComment } from "../actions/commentsActions";
import * as API from '../utils/api';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { withRouter } from 'react-router-dom';

class CommentsList extends Component {

    handleVote = (id, option) => {
        let data = {
            option: option
        }

        let vote = option === 'upVote' ? 1 : -1
        API.voteComment(id, data).then(() => this.props.dispatch(addVoteOnComment(id, vote)));
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        if (id) {
            API.getAllComments(id).then(comments => this.props.dispatch(listComments(id, comments)));
        }
    }

    render() {

        const { comments } = this.props.comments;

        return (
            <div>
                <List>
                    {comments.length !== 0 && comments.map((comment) =>
                        <ListItem className="details-comments">
                            <ListItemText primary={comment.body} secondary={comment.author}></ListItemText>
                            <ListItemSecondaryAction>
                                {comment.voteScore} Vote(s)
                                <IconButton onClick={() => this.handleVote(comment.id, 'upVote')} aria-label="Vote Up">
                                    <ArrowUpwardIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={() => this.handleVote(comment.id, 'downVote')} aria-label="Vote Down">
                                    <ArrowDownwardIcon color="primary" />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                </List>
            </div>
        )
    }
}


function mapStateToProps({ comments }) {
    return { comments }
}

export default  withRouter(connect(mapStateToProps, null)(CommentsList))
