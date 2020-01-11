import React, { Component } from 'react';
import TodoList from './components/TodoList/';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <TodoList />
      </div>
    );
  }
}

export default App;
