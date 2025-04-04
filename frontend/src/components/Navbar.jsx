import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Quản Lý Sản Phẩm</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Danh sách sản phẩm</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-product">Thêm sản phẩm mới</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar