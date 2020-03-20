import React , { Component } from 'react';

class TodoItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      updateChecked : false,
      post : this.props.text
    }
    this.deleteTodo = this.deleteTodo.bind(this);
    this.setUpdateCheck = this.setUpdateCheck.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.postUpdate = this.postUpdate.bind(this);
  }

  updatePost(e){
    this.setState({post:e.target.value});
  }

  postUpdate(e){
    var newTodo = {
      id: this.props.item.id,
      post: this.post,
      date: this.props.item.date
    };
    const options = {
      method : 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(this.props.item)
    };
    fetch('/api/updateTodo',options);
  }

  setUpdateCheck(e){
    console.log('updated');
    this.setState({updateChecked:!this.state.updateChecked});
  }

  deleteTodo(e){
    const options = {
      method : 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(this.props.item)
    };
    fetch('/api/deleteTodo',options);
  }

  render(){

    return(
      <div>
      {
        !this.state.updateChecked?
        <div className="todoItem" >
          <div>
            {this.props.text}
          </div>
          <div>
            <button className="btnEdit" onClick={this.setUpdateCheck}>Edit</button>
          </div>
          <div>
            Date
          </div>
          <div>
            <button className="btnDlt" onClick={this.deleteTodo}>Delete</button>
          </div>
        </div>
        :
        <div className="todoItem" >
          <div>
            <input type="text" value={this.state.post} onChange={this.updatePost}/>
          </div>
          <div>
            <button className="btnSave" onClick={this.postUpdate}>Save</button>
          </div>
          <div>
            Date
          </div>
          <div>
            <button className="btnDlt" onClick={this.deleteTodo}>Delete</button>
          </div>
        </div>

      }
      </div>
    )
  };
}

export default TodoItem;
