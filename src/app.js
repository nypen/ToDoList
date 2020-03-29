import React from 'react';
import { Route, BrowserRouter , Switch} from 'react-router-dom'
import ReactDOM from 'react-dom';
import "./app.css";
import TodoList from './components/TodoList';
import SignIn from './components/SignIn';
import SignUp from './components/Signup';

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            user_id : null,
            username: null,
            logged:false,
            redirectTo:null
        }
        this.updateUser = this.updateUser.bind(this);
        this.logOut = this.logOut.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
      }
    
      componentDidMount(){
        fetch("/api/getuser",{
          credentials:"include"
        })
        .then(response=>{
          response.json()
          .then(res=>{
            if(res.user){
              this.setState({
                user_id:res.user.id,
                username:res.user.username,
                logged:true,
                rederictTo:"/todo"
              })
            }
            })
          })
      }
    
      updateUser(loggedUser){
        this.setState({
         user_id: loggedUser.user_id,//loggedUser.user_id,
          username: loggedUser.username,
          logged: loggedUser.logged
        });
      }
    
      logOut(){
        fetch("/api/logout",{
          credentials:"include",
          method: "POST"
        })
        this.setState({
          user_id:null,
          username:null,
          logged:false
        })
      }
    render() {
            return (
                <div className="app">
                  <div className = "head">
                    <h1>Todo List</h1>
                    {this.state.logged?
                    <button className="btnLogout" onClick={this.logOut}>LogOut</button>
                    :""}
                  </div>
                
               {
                this.state.logged?
                
                <div>
                    <TodoList
                    username={this.state.username}
                    user_id={this.state.user_id}
                    logOut={this.logOut}
                    />
                </div>

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

ReactDOM.render(<BrowserRouter>
            		<App />
            	</BrowserRouter>, document.getElementById('root'));
