import React , { Component } from 'react';

class TodoItem extends Component{
  constructor(){
    super();
    this.state = {
      todos : []
    }
  }

  componentDidMount() {
    console.log('mount');
    fetch('/api/todos')
    .then(res => console.log(res));
    //.then(res => res.json())
    //.then( todos => this.setState({todos},()=>console.log("todos fetched"),todos))
  }

  render(){
    return(
      <div>
        {this.state.todos.map(todo=>
          <li key={todo.id} >1. {todo.post}</li>
        )}
      </div>
)
  };
}

export default TodoItem;
