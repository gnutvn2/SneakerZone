import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../assets/Sidebar.css';
import logo from '../assets/img/logoSneakZone.png'

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
          <Link className='nav-link' to="/ThongKe"> <i className="bi bi-bar-chart-fill"></i>Thống kê</Link>
        </li>

        {/* Bán hàng tại quầy */}
        <li className='nav-item'>
          <Link className='nav-link' to="/BanHangTaiQuay"> <i className="bi bi-shop"></i>Bán hàng tại quầy</Link>
        </li>

        {/* Quản lý đơn hàng */}
        <li className='nav-item'>
          <Link className='nav-link' to="/DonHang"><i className="bi bi-card-checklist"></i>Đơn hàng</Link>
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
          </ul>
        </li>

        {/* Trả hàng */}
        <li className='nav-item'>
          <Link className='nav-link' to="/TraHang"><i className="bi bi-arrow-counterclockwise"></i>Trả hàng</Link>
        </li>

        {/* Giảm giá */}
        <li
          className={`nav-item has-submenu ${activeSubmenu === 2 ? 'active' : ''}`}
          onClick={() => toggleSubmenu(2)}
        >
          <Link className='nav-link' to="#"><i className="bi bi-percent"></i>Giảm giá</Link>
          <ul className='submenu'>
            <li className='nav-item'>
              <Link className='nav-link' to="/DotGiamGia"><i className="bi bi-calendar"></i>Đợt giảm giá</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to="/PhieuGiamGia"><i className="bi bi-ticket"></i>Phiếu giảm giá</Link>
            </li>
          </ul>
        </li>

        {/* Tài khoản */}
        <li className='nav-item'>
          <Link className='nav-link' to="/TaiKhoan"><i className="bi bi-person-circle"></i>Tài khoản</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
