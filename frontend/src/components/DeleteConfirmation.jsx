import { Modal, Button } from 'react-bootstrap'

function DeleteConfirmation({ show, product, onClose, onConfirm }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận xóa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {product && (
          <p>Bạn có chắc chắn muốn xóa sản phẩm "{product.name}" không?</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Hủy
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirmation