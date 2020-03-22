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
    this.addTodo = this.addTodo.bind(this);
    this.renewTodos = this.renewTodos.bind(this);
  }

  renewTodos(){
    console.log('reneiw');
    fetch("/api/todos")
    .then(res => {
      res.json()
      .then(new_todos => {
        this.setState({todos : new_todos});
        console.log(this.state.todos);
      });
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    console.log("mount");
    this.renewTodos();
  }


  addTodo(e){
    e.preventDefault();
    if(this.refs.todoItem.value!==""){
      var newTodo = {
        text: this.refs.todoItem.value,
        user_id: this.props.user_id//change
      };
      const options = {
        method : 'POST',
        headers : {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(newTodo)
      };
      this.refs.todoItem.value = "";
      console.log('add new');
      fetch("/api/addtodo",options)
      .then(res=>{
        this.renewTodos();
      });
    }
  }

  deleteTodo(todo_id){
    var del_todo = {
      id: todo_id
    }
    const options = {
      method : 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(del_todo)
    };
    fetch("/api/deleteTodo",options).
    then(this.componentDidMount());
}

  updateTodo(todo_id,todo_new_text){
    console.log('updating post '+todo_id+' with new text'+ todo_new_text);
    var newTodo = {
      id: todo_id,
      text: todo_new_text,
    };
    const options = {
      method : 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(newTodo)
    };
    fetch('/api/updateTodo',options).
    then(this.renewTodos());
  }

  render(){
    return(
      <div className="todoList">
        <div className="todoAdd">
          <form onSubmit={this.addTodo}>
            <input ref="todoItem" type="text" placeholder="Type new task" />
            <button  type="submit" >Add</button>
          </form>
        </div>
        {this.state.todos.map(todo=>
          <TodoItem item={todo}
                    key={todo.id}
                    deleteTodo = {this.deleteTodo.bind(this)}
                    updateTodo = {this.updateTodo.bind(this)}
                    />
        )}
      </div>
    )
  };
}

export default TodoList;
