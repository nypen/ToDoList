import React , { Component } from 'react';

class TodoItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      updateChecked : false,
      curr_post : this.props.item.text
    }
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.setUpdateCheck = this.setUpdateCheck.bind(this);
    this.updatePostValue = this.updatePostValue.bind(this);
    this.reInitPostValue = this.reInitPostValue.bind(this);
  }

  updatePostValue(e){
    this.setState({curr_post:e.target.value});
  }

  reInitPostValue(e){
    this.setState({curr_post:this.props.item.text});
    this.setState({updateChecked:!this.state.updateChecked});
  }

  updateTodo(e){
    e.preventDefault();
    this.props.updateTodo(this.props.item.id,this.state.curr_post);
    this.setState({updateChecked:!this.state.updateChecked});
    console.log('update');
  }

  setUpdateCheck(e){
    this.setState({updateChecked:!this.state.updateChecked});
  }

  deleteTodo(e){
    this.props.deleteTodo(this.props.item.id);
  }

  render(){

    return(
      <div>
      {
        !this.state.updateChecked?
        <div className="todoItem" >
          <div>
            {this.props.item.text}
          </div>
          <div>
            <button className="btnEdit" onClick={this.setUpdateCheck}>Edit</button>
          </div>
          <div>
            {this.props.item.post_date}
          </div>
          <div>
            <button className="btnDlt" onClick={this.deleteTodo}>Delete</button>
          </div>
        </div>
        :
        <div className="todoItem" >
          <div>
            <input type="text" value={this.state.curr_post} onChange={this.updatePostValue}/>
          </div>
          <div>
            <button className="btnSave" onClick={this.updateTodo}>Save</button>
          </div>
          <div>
            <button className="btnCancel" onClick={this.reInitPostValue}>Cancel</button>
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
