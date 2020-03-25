import React, { Component } from "react";
import "../app.css";


class SignUp extends Component{
  constructor(props){
    super(props);
    this.state = {
			username: '',
			password: '',
			confirmPassword: '',
      passMsg: null,
      userMsg:null,
      success:null
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
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()
    var newUser = {
      username: this.state.username,
      password: this.state.password,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    };
		//request to server to add a new username/password
    if(!this.state.username || !this.state.password || !this.state.confirmPassword){
      this.setState({unfillMsg:'Please fill all the fields.'})
      return;
    }
    if(this.state.password !== this.state.confirmPassword){
        this.setState({passMsg:'Passwords do not match.'})
    }else{
      fetch("/api/signup", options)
      .then(res => { res.json().then(response=>{
        if (!response.error && (this.state.password == this.state.confirmPassword)) {
          this.setState({ //redirect to login page
            success:'Your account has been created.You can now Sign in.',
            passMsg: null,
            userMsg:null
          })
        } else {
          this.setState({userMsg:response.error})
        }
      })
    })
    .catch(error => {
        console.log('signup error: ')
        console.log(error)
      });
    }
	}

  render(){
    return(
      <div className="SignupForm">
				<h4>Sign up</h4>
        <p className="successMsg">{this.state.success}</p>
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
					<div className="form-group">
						<div className="col-3 col-mr-auto">
							<input className="form-input"
								placeholder="confirm password"
								type="password"
								name="confirmPassword"
								value={this.state.confirmPassword}
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className="form-group ">
						<div className="col-7"></div>
						<button
							className="signButton"
							onClick={this.handleSubmit}
							type="submit"
						>Sign up</button>
					</div>
					</form>
          <p className="errorMsg">{this.state.passMsg}</p>
          <p className="errorMsg">{this.state.unfillMsg}</p>
          <p className="errorMsg">{this.state.userMsg}</p>
				</div>
    )
  }
}

export default SignUp;
