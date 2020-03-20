import React , { Component } from 'react';
import TodoItem from './TodoItem'
import "../app.css"

class TodoList extends Component{
  constructor(){
    super();
    this.state = {
      todos : [],
      user : "user1"
    }
    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    fetch("/api/todos").then(res => {
      res.json().then(todos => {
        this.setState({ todos });
      });
    });
  }

  addItem(e){
  //  if(e) e.prevenDefault();
  e.preventDefault();

    if(this.refs.todoItem.value!==""){
      var newTodo = {
        id: this.state.todos.length,
        post: this.refs.todoItem.value,
        date: "Date.now()"
      };

      const options = {
        method : 'POST',
        headers : {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(newTodo)
      };
      fetch("/api/addtodo",options);
      this.refs.todoItem.value = "";
      this.componentDidMount();
    }

  }

  render(){
    return(
      <div className="todoList">
        <div className="todoAdd">
          <form onSubmit={this.addItem}>
            <input ref="todoItem" type="text" placeholder="Type new task" />
            <button  type="submit" >Add</button>
          </form>
        </div>
        {this.state.todos.map(todo=>
          <TodoItem item={todo} key={todo.id} text={todo.post}/>
        )}
      </div>
    )
  };
}

export default TodoList;
