import React, { Component } from "react";
import { connect } from 'react-redux';
import * as API from '../utils/api';
import { showPost } from "../actions/postActions";
import { withRouter } from 'react-router-dom';


class PostDetails extends Component {

    componentDidMount(){        
        const { id } = this.props.match.params;

        API.getPost(id).then(post => this.props.dispatch(showPost(post)));
    }

    render() {
        
        const { post } = this.props;

        return (
            <div className="">               
                <h1>{post && post.title }</h1>
            </div>
        )
    }
}


function mapStateToProps({ posts }) {
    return posts
}

export default withRouter(connect(mapStateToProps, null)(PostDetails))
