import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../services/api'
import ProductForm from './ProductForm'

function AddProduct() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (productData) => {
    try {
      setLoading(true)
      await createProduct(productData)
      alert('Thêm sản phẩm thành công!')
      navigate('/')
    } catch (err) {
      console.error('Lỗi khi thêm sản phẩm:', err)
      alert('Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="add-product">
      <h2 className="mb-4">Thêm sản phẩm mới</h2>
      
      <ProductForm
        initialValues={{ name: '', price: '', description: '' }}
        onSubmit={handleSubmit}
        submitButtonText="Thêm"
        loading={loading}
      />
    </div>
  )
}

export default AddProduct