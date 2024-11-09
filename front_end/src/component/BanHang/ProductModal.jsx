import React, { useEffect, useState } from 'react';
import { listChiTietSanPham } from '../../service/BanHangService';

const ProductModal = ({ showModal,onClose, handleCloseModal, onAddProduct }) => {
    const [chiTietSanPhams, setChiTietSanPhams] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [trangThai] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 3;

    useEffect(() => {
        if (showModal) {
            getProductsBySearch(keyword);
        }
    }, [showModal, keyword, currentPage]);

    function getProductsBySearch(keyword) {
        listChiTietSanPham({ page: currentPage, size: itemsPerPage }, keyword, trangThai)
            .then((response) => {
                setChiTietSanPhams(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                console.error("Lỗi khi lấy sản phẩm:", error);
            });
    }

    const handleSearchChange = (event) => {
        setKeyword(event.target.value);
        setCurrentPage(0);  // Đặt lại trang về 0 khi thay đổi từ khóa tìm kiếm
    };

    const handleSelectProduct = (product) => {
        if (product.soLuongTon > 0) {
            // Cập nhật giỏ hàng
            onAddProduct(product, 1); // Thêm sản phẩm vào giỏ hàng với số lượng mặc định là 1
            // Đóng modal
            onClose();
        } else {
            alert("Sản phẩm này đã hết hàng.");
        }
    };
    
    if (!showModal) return null;

    return (
        <div className="modal-overlay" style={modalOverlayStyle}>
            <div className="modal-content" style={modalContentStyle}>
                <div className="modal-header">
                    <h5 className="modal-title">Chọn Sản Phẩm</h5>
                    <button className="close btn btn-outline-secondary ms-2" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <div className="d-flex justify-content-end mb-3">
                        <input
                            type="text"
                            className="form-control w-25"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={keyword}
                            onChange={handleSearchChange}
                        />
                    </div>
                    {chiTietSanPhams && chiTietSanPhams.length > 0 ? (
                        <div>
                            <table className="table table-bordered" style={tableStyle}>
                                <thead>
                                    <tr>
                                        <th scope="col">Tên Sản Phẩm</th>
                                        <th scope="col">Màu sắc</th>
                                        <th scope="col">Size</th>
                                        <th scope="col">Chất liệu</th>
                                        <th scope="col">Đế giày</th>
                                        <th scope="col">Hình ảnh</th>
                                        <th scope="col">Tồn kho</th>
                                        <th scope="col">Giá</th>
                                        <th scope="col">Chọn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chiTietSanPhams.map((product) => (
                                        <tr key={product.id}>
                                            <td style={tdStyle}>{product.tenChiTietSanPham}</td>
                                            <td style={tdStyle}>{product.mauSacTen}</td>
                                            <td style={tdStyle}>{product.sizeTen}</td>
                                            <td style={tdStyle}>{product.chatLieuTen}</td>
                                            <td style={tdStyle}>{product.deGiayTen}</td>
                                            <td style={tdStyle}>
                                                {product.hinhAnh ? (
                                                    <img src={product.hinhAnh} alt="Hình sản phẩm" style={imgStyle} />
                                                ) : 'Không có'}
                                            </td>
                                            <td style={tdStyle}>{product.soLuongTon}</td>
                                            <td style={tdStyle}>{product.gia}</td>
                                            <td style={tdStyle}>
                                                <button
                                                    className="btn btn-outline-primary"
                                                    onClick={() => handleSelectProduct(product)}
                                                >
                                                    Chọn
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="d-flex justify-content-center my-3">
                                <button
                                    className="btn btn-outline-primary me-2"
                                    disabled={currentPage === 0}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                >
                                    Pre
                                </button>
                                <span className="align-self-center">Trang {currentPage + 1} / {totalPages}</span>
                                <button
                                    className="btn btn-outline-primary ms-2"
                                    disabled={currentPage + 1 >= totalPages}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className='text-center'>Không có sản phẩm nào.</p>
                    )}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: "10%",
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalContentStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    width: '80%',
    maxWidth: '1000px',
    maxHeight: '80vh',
    overflowY: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const tableStyle = {
    width: '100%',
    tableLayout: 'auto',
    textAlign: 'center',
};

const tdStyle = {
    padding: '8px',
    verticalAlign: 'middle',
    minWidth: '99px',
};

const imgStyle = {
    width: '150px',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
};

export default ProductModal;
