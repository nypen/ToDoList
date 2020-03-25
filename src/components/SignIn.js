import React, { Component } from "react";
import "../app.css";


class SignIn extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectTo: null,
      failMsg:null,     //invalid user-name or pass
      unfillMsg:null      //
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('handleSUbmit');
    if(this.state.showMessage){
      this.setState({
        failMsg:null,
        unfillMsg:null,
        showMessage:!showMessage})
    }
    var signinUser={
      username: this.state.username,
      password: this.state.password,
    };
    if(!this.state.username || !this.state.password){
      this.setState({unfillMsg:'Please fill all the fields.'})
      return;
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signinUser)
    };
    fetch('/api/signin', options)
    .then(res => { res.json().then(response=>{
      if(response.status==400){
        console.log('invalid username or password');
        this.setState({failMsg:'Invalid username or password.'})
      }else{
        console.log('log success' + response.user_id);
        this.props.updateUser({
          user_id:  response.user_id,
          username: response.username,
          logged: true
        })
      }
    })
  })
  .catch(error => {
    console.log('signup error: '+error)
  });
}

  render() {
    if (this.state.redirectTo) {
      return "loggen in "
    }else{
      return(
        <div className="signin">
          <h4>Login</h4>

          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-3 col-mr-auto">
                <input className="form-input"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-3 col-mr-auto">
                <input className="form-input"
                    placeholder="password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group ">
              <div className="col-7"></div>
              <button
                  className="signButton"
                  onClick={this.handleSubmit}
                  type="submit">Login</button>
            </div>
        </form>
        <p className="errorMsg">{this.state.failMsg}</p>
        <p className="errorMsg">{this.state.unfillMsg}</p>
    </div>
    )
  }
}
}

export default SignIn;
