import axios from 'axios'

const API_URL = 'http://localhost:3000/products'

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error)
    throw error
  }
}

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Lỗi khi lấy sản phẩm với id ${id}:`, error)
    throw error
  }
}

export const createProduct = async (product) => {
  try {
    const response = await axios.post(API_URL, product)
    return response.data
  } catch (error) {
    console.error('Lỗi khi tạo sản phẩm mới:', error)
    throw error
  }
}

export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, product)
    return response.data
  } catch (error) {
    console.error(`Lỗi khi cập nhật sản phẩm với id ${id}:`, error)
    throw error
  }
}

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Lỗi khi xóa sản phẩm với id ${id}:`, error)
    throw error
  }
}