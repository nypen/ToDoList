import React, { Component } from "react";
import "../app.css";
import SignIn from './SignIn';
import SignUp from './Signup';
import TodoList from './TodoList';
import { Route, BrowserRouter} from 'react-router-dom'

class Home extends Component{
  constructor(){
    super();
    this.state = {
        user_id : null,
        username: null,
        logged:false
    }
    this.updateUser = this.updateUser.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  updateUser(loggedUser){
    this.setState({
      user_id: loggedUser.user_id,//loggedUser.user_id,
      username: loggedUser.username,
      logged: loggedUser.logged
    });
  }

  logOut(){
    this.setState({
      user_id:null,
      username:null,
      logged:false
    })
  }

    render(){
      return(
        <div className="app">
          <div className="header">
            <a>Todo</a>
            {this.state.logged?
              <button className="signButton" onClick={this.logOut}>Logout</button>
              :""
            }
          </div>
            {this.state.logged?
              <TodoList
              user_id={this.state.user_id}
              username={this.state.username}
              logOut={this.logOut}/>
            :
            <div className="sign-container">
              <SignIn updateUser={this.updateUser}/>
              <SignUp/>
            </div>
          }
        </div>

      )
    }


}

export default Home;
