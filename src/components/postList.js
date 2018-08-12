import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as API from '../utils/api';
import { listPosts, addVote, deletePost } from "../actions/postActions";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { MenuItem } from "@material-ui/core";
import { withRouter } from 'react-router-dom';

class PostList extends Component {

    state = {
        orderBy: 'voteScore'
    };

    handleChange = (event) => {
        this.setState({ orderBy: event.target.value })
    }

    handleVote = (id, option) => {
        let data = {
            option: option
        }

        let vote = option === 'upVote' ? 1 : -1
        API.vote(id, data).then(() => this.props.dispatch(addVote(id, vote)));
    }

    handleDeletePost = (id) => {
        API.getDeletePost(id).then(() => this.props.dispatch(deletePost(id)));
    }

    loadPosts = () => {
        let category = this.props.match ? this.props.match.params.category : undefined;
        if (category !== undefined) {
            API.getAllPostsForCategory(category).then(posts => this.props.dispatch(listPosts(posts)));
        } else {
            API.getAllPosts().then(posts => this.props.dispatch(listPosts(posts)));
        }
    }

    componentDidMount() {
        this.loadPosts()
    }

    componentWillReceiveProps() {
        this.loadPosts()
    }

    render() {

        const { posts } = this.props.posts;
        const { orderBy } = this.state;

        const orderedItens = posts.sort((a, b) => b[orderBy] - a[orderBy])

        return (
            <div>
                {orderedItens.length === 0 &&
                    <h2 className="post-title">NO POSTS FOUND</h2>
                }
                {orderedItens.length !== 0 &&
                    <h2 className="post-title">POSTS</h2>
                }
                {orderedItens.length !== 0 &&
                    <div className="order-select">
                        <InputLabel htmlFor="order">Order by: </InputLabel>
                        <Select
                            value={this.state.orderBy}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'orderby',
                                id: 'order',
                            }}>
                            <MenuItem value={'timestamp'}>Date</MenuItem>
                            <MenuItem value={'voteScore'}>Votes</MenuItem>
                        </Select>
                    </div>
                }
                {orderedItens.length !== 0 && orderedItens.map((post) => (
                    <Card className="post-card" key={post.id}>
                        <CardContent>
                            <Typography variant="headline" component="h2">
                                {post.title}
                            </Typography>
                            <Typography color="textSecondary" component="h3" className="author">
                                Writed by {post.author}
                            </Typography>
                            <div>
                                <Chip label={post.category} className="category"></Chip>
                            </div>
                            <div className="comments">
                                <Typography color="textSecondary" className="mr-5">
                                    {post.commentCount} Comment(s)
                                </Typography>
                                <Typography color="textSecondary" className="mr-5">
                                    |
                                </Typography>
                                <Typography color="textSecondary">
                                    {post.voteScore} Vote(s)
                                </Typography>
                            </div>
                        </CardContent>
                        <CardActions className="pull-right">
                            <Button size="small" component={Link} to={`/${post.category}/${post.id}`}>See More</Button>
                            <Button size="small" onClick={() => this.handleDeletePost(post.id)}>Delete</Button>
                            <Button size="small">Edit</Button>
                        </CardActions>
                        <CardActions>
                            <IconButton onClick={() => this.handleVote(post.id, 'upVote')} className="mg-5" aria-label="Vote Up">
                                <ArrowUpwardIcon color="primary" />
                            </IconButton>
                            <IconButton onClick={() => this.handleVote(post.id, 'downVote')} className="mg-5" aria-label="Vote Down">
                                <ArrowDownwardIcon color="primary" />
                            </IconButton>
                        </CardActions>
                    </Card>
                ))}
            </div>
        )
    }
}


function mapStateToProps({ posts }) {
    return { posts }
}

export default withRouter(connect(mapStateToProps, null)(PostList))
