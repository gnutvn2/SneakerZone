import React from 'react';
import '../../assets/Modal.css';

const InactiveProductsModal = ({ isOpen, onClose, inactiveProducts }) => {
    if (!isOpen) return null; // Không hiển thị modal nếu isOpen là false

    return (
        <div className="modal" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2 className='text-center'>Sản phẩm ngừng hoạt động</h2>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID sản phẩm</th>
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Tên danh mục</th>
                            <th>Tên thương hiệu</th>
                            <th>Trạng thái</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inactiveProducts.length > 0 ? (
                            inactiveProducts.map(sanPham => (
                                <tr key={sanPham.id}>
                                    <td>{sanPham.id}</td>
                                    <td>{sanPham.maSanPham}</td>
                                    <td>{sanPham.tenSanPham}</td>
                                    <td>{sanPham.danhMuc?.tenDanhMuc}</td>
                                    <td>{sanPham.thuongHieu?.tenThuongHieu}</td>
                                    <td>{sanPham.trangThai ? 'Hoạt động' : 'Ngừng hoạt động'}</td>
                                    <td>
                                        <button className='btn btn-warning'>
                                            <i className='bi bi-arrow-counterclockwise' />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">Không có sản phẩm nào.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InactiveProductsModal;
