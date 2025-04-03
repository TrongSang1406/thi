import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById, updateProduct } from '../services/api'
import ProductForm from './ProductForm'
import LoadingSpinner from './LoadingSpinner'

function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
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
  
  const handleSubmit = async (productData) => {
    try {
      setUpdating(true)
      await updateProduct(id, productData)
      alert('Cập nhật sản phẩm thành công!')
      navigate('/')
    } catch (err) {
      console.error('Lỗi khi cập nhật sản phẩm:', err)
      alert('Có lỗi xảy ra khi cập nhật sản phẩm. Vui lòng thử lại.')
    } finally {
      setUpdating(false)
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
  
  if (!product) {
    return (
      <div className="alert alert-warning" role="alert">
        Không tìm thấy sản phẩm với ID: {id}
      </div>
    )
  }
  
  return (
    <div className="edit-product">
      <h2 className="mb-4">Cập nhật sản phẩm</h2>
      
      <ProductForm
        initialValues={{
          name: product.name,
          price: product.price,
          description: product.description
        }}
        onSubmit={handleSubmit}
        submitButtonText="Sửa"
        loading={updating}
      />
    </div>
  )
}

export default EditProduct