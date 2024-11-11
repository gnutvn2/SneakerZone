import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../assets/Sidebar.css';
import logo from '../assets/img/s.png'

const Sidebar = () => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleSubmenu = (index) => {
    // Nếu submenu được nhấn đã mở, thì đóng lại. Nếu chưa mở, thì mở submenu đó và đóng các submenu khác.
    if (activeSubmenu === index) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(index);
    }
  };

  return (
    <div className='sidebar'>
      <div className='logo'>
        <img src={logo} alt="SneakZone Logo" />
      </div>
      <ul>
        {/* Thống kê */}
        <li className='nav-item'>
          <Link className='nav-link' to="/thong-ke"> <i className="bi bi-bar-chart-fill"></i>Thống kê(Commingsoon)</Link>
        </li>

        {/* Bán hàng tại quầy */}
        <li className='nav-item'>
          <Link className='nav-link' to="/ban-hang"> <i className="bi bi-shop"></i>Bán hàng tại quầy</Link>
        </li>

        {/* Quản lý đơn hàng */}
        <li className='nav-item'>
          <Link className='nav-link' to="/lich-su-mua-hang"><i className="bi bi-card-checklist"></i>Lịch sử mua hàng</Link>
        </li>

        {/* Quản lý sản phẩm */}
        <li
          className={`nav-item has-submenu ${activeSubmenu === 1 ? 'active' : ''}`}
          onClick={() => toggleSubmenu(1)}
        >
          <Link className='nav-link' to="#"><i className="bi bi-box-seam"></i>Quản lý sản phẩm</Link>
          <ul className='submenu'>
            <li className='nav-item'>
              <Link className='nav-link' to="/san-pham"><i className="bi bi-box"></i>Sản phẩm</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to="/danh-muc"><i className="bi bi-tag"></i>Danh mục</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to="/thuong-hieu"><i className="bi bi-award"></i>Thương hiệu</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to="/mau-sac"><i class="bi bi-palette"></i>Màu sắc</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to="/chat-lieu"><i class="bi bi-grid"></i>Chất liệu</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to="/size"><i class="bi bi-arrows-fullscreen"></i>Size</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to="/de-giay"><i class="bi bi-layers"></i>Đế giày</Link>
            </li>
          </ul>
        </li>

        {/* Trả hàng */}
        <li className='nav-item'>
          <Link className='nav-link' to="/TraHang"><i className="bi bi-arrow-counterclockwise"></i>Trả hàng (Commingsoon)</Link>
        </li>

        {/* Giảm giá */}
        <li
          className={`nav-item has-submenu ${activeSubmenu === 2 ? 'active' : ''}`}
          onClick={() => toggleSubmenu(2)}
        >
          <Link className='nav-link' to="#"><i className="bi bi-percent"></i>Giảm giá (Commingsoon)</Link>
          <ul className='submenu'>
            <li className='nav-item'>
              <Link className='nav-link' to="/DotGiamGia"><i className="bi bi-calendar"></i>Đợt giảm giá</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to="/PhieuGiamGia"><i className="bi bi-ticket"></i>Phiếu giảm giá</Link>
            </li>
          </ul>
        </li>

        {/* Quản lý người dùng */}
        <li
          className={`nav-item has-submenu ${activeSubmenu === 3 ? 'active' : ''}`}
          onClick={() => toggleSubmenu(3)}
        >
          <Link className='nav-link' to="#"><i className="bi bi-people"></i>Quản lý người dùng</Link>
          <ul className='submenu'>
            <li className='nav-item'>
              <Link className='nav-link' to="/vai-tro"><i className="bi bi-shield-lock"></i>Vai trò</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to="/nhan-vien"><i className="bi bi-person-badge"></i>Nhân viên</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to="/khach-hang"><i className="bi bi-person"></i>Khách hàng</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
