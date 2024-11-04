import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getAllChiTietSanPhamBySanPhamId,
    searchChiTietSanPham,
    deleteChiTietSanPham
} from '../../service/ChiTietSanPham';

const ListChiTietSanPhamComponent = () => {
    const { sanPhamId } = useParams();
    console.log("ID san pham o list chi tiet san pham: " + sanPhamId);
    
    const [chiTietSanPham, setChiTietSanPham] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState("");
    const itemsPerPage = 5;
    const navigate = useNavigate();

    const getChiTietSanPham = () => {
        const pageable = {
            page: currentPage,
            size: itemsPerPage,
        };

        getAllChiTietSanPhamBySanPhamId(sanPhamId, pageable)
            .then(response => {
                setChiTietSanPham(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => console.error('Error fetching product details:', error));
    };

    // Hàm tìm kiếm chi tiết sản phẩm theo từ khóa
    const handleSearch = () => {
        const pageable = {
            page: currentPage,
            size: itemsPerPage,
        };

        searchChiTietSanPham(sanPhamId, searchKeyword, pageable)
            .then(response => {
                setChiTietSanPham(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => console.error('Error searching product details:', error));
    };

    useEffect(() => {
        if (searchKeyword) {
            handleSearch();
        } else {
            getChiTietSanPham();
        }
    }, [currentPage, sanPhamId, searchKeyword]);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    // Hàm điều hướng đến trang thêm chi tiết sản phẩm
    const createChiTietSanPham = () => {
        navigate(`/san-pham/${sanPhamId}/add-chi-tiet`)
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleDelete = (chitietSanPhamId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa chi tiết sản phẩm này?")) {
            deleteChiTietSanPham(sanPhamId ,chitietSanPhamId )
                .then(() => {
                    getChiTietSanPham();
                })
                .catch(error => console.error('Error deleting product detail:', error));
        }
    };

    return (
        <div className="container">
            <h5>Chi tiết sản phẩm</h5>
            <div className="card mb-5">
                <div className="card-body">
                    <div className='d-flex justify-content-between mb-3'>
                        <div>
                            <button className='btn btn-outline-success me-2' onClick={createChiTietSanPham}>
                                <i className='bi bi-plus-circle'></i> Thêm mới
                            </button>
                        </div>
                        <div className='d-flex align-items-center'>
                            <div className='input-group'>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tìm kiếm sản phẩm"
                                    value={searchKeyword}
                                    onChange={handleSearchChange}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                        </div>
                    </div>
                    <table className="table table-hover text-center">
                        <thead>
                            <tr>
                                <th>Mã chi tiết</th>
                                <th>Tên chi tiết</th>
                                <th>Màu sắc</th>
                                <th>Kích cỡ</th>
                                <th>Chất liệu</th>
                                <th>Đế giày</th>
                                <th>Hình ảnh</th>
                                <th>Tồn kho</th>
                                <th>Giá bán</th>
                                <th>Trạng thái</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chiTietSanPham.length > 0 ? (
                                chiTietSanPham.map(ctsp => (
                                    <tr key={ctsp.id}>
                                        <td>{ctsp.maChiTietSanPham}</td>
                                        <td>{ctsp.tenChiTietSanPham}</td>
                                        <td>{ctsp.mauSacTen || 'N/A'}</td>
                                        <td>{ctsp.sizeTen || 'N/A'}</td>
                                        <td>{ctsp.chatLieuTen || 'N/A'}</td>
                                        <td>{ctsp.deGiayTen || 'N/A'}</td>
                                        <td>
                                            {ctsp.hinhAnh ? (
                                                <img src={ctsp.hinhAnh} alt="Hình sản phẩm" style={{ width: '50px' }} />
                                            ) : 'Không có'}
                                        </td>
                                        <td>{ctsp.soLuongTon}</td>
                                        <td>{ctsp.gia} VNĐ</td>
                                        <td>{ctsp.trangThai ? 'Còn hàng' : 'Hết hàng'}</td>
                                        <td>
                                            <button
                                                className='btn btn-warning'
                                                onClick={() => navigate(`/san-pham/${sanPhamId}/chi-tiet/${ctsp.id}`)}
                                            >
                                                <i className='bi bi-pencil-square'></i>
                                            </button>
                                            <button
                                                className='btn btn-danger ms-2'
                                                onClick={() => handleDelete(ctsp.id)}
                                            >
                                                <i className='bi bi-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="11" className="text-center">Không có dữ liệu</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Nút phân trang */}
                    <div className="d-flex justify-content-center align-items-center my-3">
                        <button
                            className="btn btn-outline-primary me-2"
                            disabled={currentPage === 0}
                            onClick={handlePreviousPage}>
                            Pre
                        </button>
                        <span className="align-self-center">Trang {currentPage + 1} / {totalPages}</span>
                        <button
                            className="btn btn-outline-primary ms-2"
                            disabled={currentPage + 1 >= totalPages}
                            onClick={handleNextPage}>
                            Next
                        </button>
                    </div>

                    <button className='btn btn-outline-primary' onClick={() => navigate("/san-pham")}>Quay lại</button>
                </div>
            </div>
        </div>
    );
};

export default ListChiTietSanPhamComponent;
