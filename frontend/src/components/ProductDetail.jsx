import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../services/api'
import LoadingSpinner from './LoadingSpinner'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await getProductById(id)
        setProduct(data)
        setError(null)
      } catch (err) {
        setError('Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProduct()
  }, [id])
  
  if (loading) return <LoadingSpinner />
  
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )
  }
  
  if (!product) {
    return (
      <div className="alert alert-warning" role="alert">
        Không tìm thấy sản phẩm với ID: {id}
      </div>
    )
  }
  
  return (
    <div className="product-detail">
      <h2 className="mb-4">Chi tiết sản phẩm</h2>
      
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">{product.name}</h3>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-3 fw-bold">Giá:</div>
            <div className="col-md-9">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-3 fw-bold">Mô tả:</div>
            <div className="col-md-9">{product.description}</div>
          </div>
        </div>
        <div className="card-footer">
          <div className="d-flex gap-2">
            <Link to="/" className="btn btn-secondary">Trở lại</Link>
            <Link to={`/edit-product/${product.id}`} className="btn btn-warning">
              Sửa sản phẩm
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail