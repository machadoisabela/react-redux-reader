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

class App extends Component {


  render() {


    return (
      <div>
        <AppBar position="static">
          <Toolbar color="inherit">
            <Typography variant="title" color="inherit">
              LEITURA
              </Typography>
          </Toolbar>
        </AppBar>
        <CatoriesList />
        <Button style={{ float: 'right', margin: '10px' }} color="primary"><Link to="/post/add">ADD NEW POST</Link></Button>
        <Route exact path="/" render={() => (
          <PostList />
        )} />
        <Route exact path="/post/add" render={() => (
          <AddPost/>
        )}/>
      </div>
    );
  }
}

export default App;
