import React from 'react';
import ReactDOM from 'react-dom';
import "./app.css";
import TodoList from './components/TodoList';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      user : ""
    }
  }

    render() {
        return (
            <div>
              <h1>To do list</h1>
              <TodoList
                user_id={1}/>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
