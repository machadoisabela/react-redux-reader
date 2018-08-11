import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import '../App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import PostList from './postList';
import AddPost from './addPost';
import CatoriesList from './categoriesList';
import PostDetails from './postDetails';

class App extends Component {


  render() {


    return (
      <div>
        <AppBar position="static">
          <Toolbar color="inherit">
            <Typography  variant="title" color="inherit">
                <Link className="app-title" to="/">LEITURA</Link>
              </Typography>
          </Toolbar>
        </AppBar>
        <CatoriesList />
        <Button style={{ float: 'right', margin: '10px' }} color="primary"><Link to="/post/add">ADD NEW POST</Link></Button>
        <Route exact path="/:category" render={() => (
          <PostList />
        )} />
        <Route exact path="/" render={() => (
          <PostList />
        )} />
        <Route exact path="/post/add" render={() => (
          <AddPost/>
        )}/>
        <Route exact path="/:category/:id" render={() => (
          <PostDetails/>
        )}/>
      </div>
    );
  }
}

export default App;
