import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function CenteredModal({ heading, children, onHide, onRemove, show }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Đóng
        </Button>
        <Button variant='danger' onClick={onRemove}>
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
