import React, { useState, useEffect } from 'react';
import '../../assets/Modal.css';
import { updateTrangThai, listSanPham } from '../../service/SanPhamService';

const InactiveProductsModal = ({ isOpen, onClose }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 5; // Số sản phẩm trên mỗi trang

    const getInactiveProducts = () => {
        listSanPham({ page: currentPage, size: itemsPerPage }, false)
            .then((response) => {
                setProducts(response.data.content);
                setTotalPages(response.data.totalPages); // Cập nhật tổng số trang
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (isOpen) {
            getInactiveProducts();
        }
    }, [isOpen, currentPage]);

    const handleUpdateTrangThai = (sanPhamId) => {
        updateTrangThai(sanPhamId)
            .then(() => {
                getInactiveProducts(); // Reload danh sách sản phẩm ngừng hoạt động
            })
            .catch((error) => {
                console.log("Cập nhật trạng thái thất bại: ", error);
            });
    };

    if (!isOpen) return null;

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
                        {products.length > 0 ? (
                            products.map(sanPham => (
                                <tr key={sanPham.id}>
                                    <td>{sanPham.id}</td>
                                    <td>{sanPham.maSanPham}</td>
                                    <td>{sanPham.tenSanPham}</td>
                                    <td>{sanPham.danhMuc?.tenDanhMuc}</td>
                                    <td>{sanPham.thuongHieu?.tenThuongHieu}</td>
                                    <td>{sanPham.trangThai ? 'Hoạt động' : 'Ngừng hoạt động'}</td>
                                    <td>
                                        <button
                                            className='btn btn-warning'
                                            style={{ marginLeft: '10px' }}
                                            onClick={() => handleUpdateTrangThai(sanPham.id)}
                                        >
                                            <i className='bi bi-arrow-counterclockwise' />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">Không có sản phẩm nào.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Nút phân trang */}
                <div className="d-flex justify-content-center my-3">
                    <button
                        className="btn btn-outline-primary me-2"
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage(currentPage - 1)}>
                        Pre
                    </button>
                    <span className="align-self-center">Trang {currentPage + 1} / {totalPages}</span>
                    <button
                        className="btn btn-outline-primary ms-2"
                        disabled={currentPage + 1 >= totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}>
                        Next
                    </button>
                </div>


            </div>
        </div>
    );
}

export default InactiveProductsModal;
