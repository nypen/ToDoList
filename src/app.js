import React from 'react';
import { Route, BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom';
import "./app.css";
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/Signup';

class App extends React.Component {
    render() {
        return (
            <div>
              <Home/>
            </div>

        )
    }
}

ReactDOM.render(<BrowserRouter>
            		<App />
            	</BrowserRouter>, document.getElementById('root'));
