import React, { Component } from "react";
import { ReactSortable } from "react-sortablejs";
import TodoItem from "./TodoItem";
import "../app.css";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      user_id: this.props.user_id,
      username: this.props.username
    };
    this.addTodo = this.addTodo.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.renewTodos = this.renewTodos.bind(this);
  }

  renewTodos() {
    var user = {
      username: this.state.userame,
      user_id: this.state.user_id,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    };
    fetch("/api/todos",options)
      .then(res => {
        console.log('renew');
        res.json().then(new_todos => {
          this.setState({ todos: new_todos });
        });
      })
      .catch(err => console.log(err));
      console.log('why');
  }

  componentDidMount() {
    this.renewTodos();
  }

  addTodo(e) {
    e.preventDefault();
    if (this.refs.todoItem.value !== "") {
      var newTodo = {
        text: this.refs.todoItem.value,
        user_id: this.props.user_id,
        order: this.state.todos.length
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTodo)
      };
      this.refs.todoItem.value = "";
      fetch("/api/addtodo", options).then(res => {
        res.json().then(result => {
          console.log(result, 333333);
          this.state.todos.push(result);
          this.setState({ ...this.state });
        });
      });
    }
  }

  async deleteTodo(todo_id) {
    var del_todo = {
      id: todo_id
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(del_todo)
    };
    fetch("/api/deleteTodo", options).then(res => {
      res.json().then(result => {
        const todos = this.state.todos.filter(todo => todo.id !== result.id);

        this.setState({ todos });
      });
    });
  }

  updateTodo(todo_id, todo_new_text) {
    console.log("updating post " + todo_id + " with new text" + todo_new_text);
    var newTodo = {
      id: todo_id,
      text: todo_new_text
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTodo)
    };
    fetch("/api/updateTodo", options).then(res =>{
      const todos = this.state.todos.filter((todo)=>{
        if(todo.id===todo_id){
          todo.text=todo_new_text;
        }
        return todo;
      });
      this.setState({ todos });
    });
  }

  updateOrder(e){
    console.log('update order'+ e.oldIndex +" " + e.newIndex);

    var update_order = {
      id: this.state.todos[e.newIndex].id,
      index: e.newIndex
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(update_order)
    };
    fetch("/api/updateOrder",options).then(res=>{
      console.log(res);
    })
    console.log(this.state.todos);
  }



  render() {
    console.log(this.state.todos);
    return (
      <div  className="todolist-container">
        <div className="todoAdd">
          <form onSubmit={this.addTodo}>
            <input ref="todoItem" type="text" placeholder="Type new task" />
            <button type="submit">Add</button>
          </form>
        </div>
        <div className="sortable-container">
          <ReactSortable
            className = "sortable-list"
            list={this.state.todos}
            setList={newState => this.setState({ todos: newState })}
            onEnd={this.updateOrder}
            animation={150}
          >
            {this.state.todos &&
              this.state.todos.map(todo => (
                <TodoItem
                  item={todo}
                  key={todo.id}
                  deleteTodo={this.deleteTodo.bind(this)}
                  updateTodo={this.updateTodo.bind(this)}
                />
              ))}
          </ReactSortable>
        </div>
      </div>
    );
  }
}

export default TodoList;
