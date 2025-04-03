import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function ProductForm({ initialValues, onSubmit, submitButtonText, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues)
    }
  }, [initialValues])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Tên sản phẩm không được để trống'
    }
    
    if (!formData.price) {
      newErrors.price = 'Giá sản phẩm không được để trống'
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Giá sản phẩm phải là số dương'
    }
    
    if (!formData.description || formData.description.trim() === '') {
      newErrors.description = 'Mô tả sản phẩm không được để trống'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      const productData = {
        ...formData,
        price: parseFloat(formData.price)
      }
      
      onSubmit(productData)
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Tên sản phẩm</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Giá</label>
            <input
              type="number"
              className={`form-control ${errors.price ? 'is-invalid' : ''}`}
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
          </div>
          
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Mô tả</label>
            <textarea
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>
          
          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : submitButtonText}
            </button>
            <Link to="/" className="btn btn-secondary">Trở lại</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductForm