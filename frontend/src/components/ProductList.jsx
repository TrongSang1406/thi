import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct } from '../services/api'
import DeleteConfirmation from './DeleteConfirmation'
import LoadingSpinner from './LoadingSpinner'

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await getProducts()
      setProducts(data)
      setError(null)
    } catch (err) {
      setError('Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDeleteClick = (product) => {
    setProductToDelete(product)
    setShowDeleteModal(true)
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
    setProductToDelete(null)
  }

  const handleConfirmDelete = async () => {
    if (!productToDelete) return

    try {
      await deleteProduct(productToDelete.id)
      alert('Xóa sản phẩm thành công!')
      fetchProducts()
      handleCloseDeleteModal()
    } catch (err) {
      console.error('Lỗi khi xóa sản phẩm:', err)
      alert('Có lỗi xảy ra khi xóa sản phẩm. Vui lòng thử lại.')
    }
  }

  if (loading) return <LoadingSpinner />

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )
  }

  return (
    <div className="product-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Danh sách sản phẩm</h2>
        <Link to="/add-product" className="btn btn-success">
          <i className="bi bi-plus-circle me-1"></i> Thêm mới
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="alert alert-info">Không có sản phẩm nào trong danh sách.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-primary">
              <tr>
                <th>STT</th>
                <th>Tên sản phẩm</th>
                <th>Mô tả</th>
                <th>Giá</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td><td>
                    <Link to={`/products/${product.id}`}>{product.title}</Link>
                  </td>
                  </td>
                  <td>{product.description}</td>
                  <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link to={`/edit-product/${product.id}`} className="btn btn-warning btn-sm">
                        Sửa
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteClick(product)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <DeleteConfirmation
        show={showDeleteModal}
        product={productToDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}

export default ProductList