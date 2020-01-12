import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CenteredModal from '../CenterdModal'

class TodoItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalShow: false
    }
  }

  onHide() {
    this.setState({ modalShow: false })
  }

  render() {
    const { id, todo, handleChange, handleRemove } = this.props
    return (
      <li className='list-group-item'>
        <div className='custom-control custom-checkbox'>
          <input
            type='checkbox'
            className='custom-control-input'
            id={id}
            checked={todo.isCompleted}
            onChange={() => handleChange(todo)}
          />
          <label className='custom-control-label' htmlFor={id}>
            {todo.task}
          </label>
          {todo.isCompleted && (
            <button
              type='button'
              className='close'
              aria-label='Close'
              onClick={() => this.setState({ modalShow: true })}
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          )}
        </div>
        <CenteredModal
          heading='Xóa bài hát'
          show={this.state.modalShow}
          onHide={() => this.onHide()}
          onRemove={() => {
            handleRemove(todo)
            this.onHide()
          }}
        >
          Bạn có muốn xóa không?
        </CenteredModal>
      </li>
    )
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    task: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired
  }),
  id: PropTypes.number.isRequired,
  handleChange: PropTypes.func,
  handleRemove: PropTypes.func
}

export default TodoItem
