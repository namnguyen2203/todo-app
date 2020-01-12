import React, { Component } from 'react'
import classNames from 'classnames'
import { Spinner } from 'react-bootstrap'

import TodoItem from './TodoItem'
import './style.css'

const axios = require('axios')
const shortid = require('shortid')

class TodoList extends Component {
  constructor() {
    super()
    this.state = {
      todoList: [],
      displayBy: 'all',
      isLoading: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {
    axios
      .get('https://gezdi.sse.codesandbox.io/todos')
      .then((res) => this.setState({ todoList: res.data, isLoading: false }))
      .catch((error) => console.log(error))
  }

  handleChange(item) {
    const { todoList } = this.state
    const index = todoList.indexOf(item)

    axios
      .put('https://gezdi.sse.codesandbox.io/todos/' + item.id, {
        task: item.task,
        isCompleted: !item.isCompleted
      })
      .then((res) => {
        this.setState({
          todoList: [...todoList.slice(0, index), res.data, ...todoList.slice(index + 1)]
        })
      })
      .catch((err) => console.log(err))
  }

  handleSubmit(event) {
    event.preventDefault()
    const value = event.target.elements[0].value

    if (value && value.trim() !== '') {
      axios
        .post('https://gezdi.sse.codesandbox.io/todos', {
          task: value,
          isCompleted: false,
          id: shortid.generate()
        })
        .then((res) => {
          this.setState({
            todoList: [...this.state.todoList, res.data]
          })
        })
        .catch((err) => console.log(err))
    }

    event.target.reset()
    event.target.elements[0].blur()
  }

  handleDisplayBy(event) {
    this.setState({ displayBy: event.target.value })
  }

  handleRemove(item) {
    const { todoList } = this.state
    const index = todoList.indexOf(item)

    axios
      .delete('https://gezdi.sse.codesandbox.io/todos/' + item.id)
      .then((res) => console.log('Delete successful'))
      .catch((err) => console.log(err))

    this.setState({
      todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)]
    })
  }

  countUncompletedTodo() {
    return this.state.todoList.filter((todo) => !todo.isCompleted).length
  }

  render() {
    const { todoList, displayBy, isLoading } = this.state
    let uncompletedTodo = this.countUncompletedTodo()
    let filterTodoList = []
    if (displayBy === 'all') {
      filterTodoList = todoList
    } else if (displayBy === 'completed') {
      filterTodoList = todoList.filter((item) => item.isCompleted)
    } else {
      filterTodoList = todoList.filter((item) => !item.isCompleted)
    }
    return (
      <div className='card card-body'>
        <h1 className='title'>Thêm bài hát</h1>
        <form className='form-inline mb-3' onSubmit={this.handleSubmit}>
          <input type='text' className='form-control mr-2' placeholder='Nhập tên bài hát...' />
          <input type='submit' className='btn btn-outline-primary my-2' value='Thêm' />
        </form>
        <h2 className='title'>Danh sách bài hát</h2>

        <p>
          Còn lại{' '}
          <span
            className={classNames('badge', 'badge-pill', {
              'badge-success': uncompletedTodo === 0,
              'badge-danger': uncompletedTodo === todoList.length,
              'badge-warning': uncompletedTodo > 0 && uncompletedTodo < todoList.length
            })}
          >
            {this.countUncompletedTodo()}
          </span>{' '}
          bài hát
        </p>
        <div className='input-group mb-3'>
          <div className='input-group-prepend'>
            <label className='input-group-text' htmlFor='filterTodoList'>
              Hiển thị theo
            </label>
          </div>
          <select
            className='custom-select'
            id='filterTodoList'
            onChange={this.handleDisplayBy.bind(this)}
          >
            <option value='all'>Tất cả</option>
            <option value='completed'>Đã hoàn thành</option>
            <option value='uncompleted'>Chưa hoàn thành</option>
          </select>
        </div>
        <ul className='list-group'>
          {isLoading ? (
            <div className='text-center'>
              <Spinner animation='border' variant='primary' />
            </div>
          ) : (
            filterTodoList.map((item, index) => (
              <TodoItem
                id={index}
                key={index}
                todo={item}
                handleChange={this.handleChange}
                handleRemove={this.handleRemove}
              />
            ))
          )}
        </ul>
      </div>
    )
  }
}

export default TodoList
