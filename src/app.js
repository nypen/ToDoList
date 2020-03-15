import React from 'react';
import ReactDOM from 'react-dom';
import TodoItem from './TodoItem';

class App extends React.Component {
    render() {
        return (
            <div>
            <h1>Welcome to rr!</h1>
            
            <TodoItem/>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
