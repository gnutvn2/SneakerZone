import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { listChiTietSanPhamBySanPhamId } from '../../service/ChiTietSanPham';

const ListChiTietSanPhamComponent = () => {
    const { id } = useParams();
    const [chiTietSanPham, setChiTietSanPham] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    const getChiTietSanPham = () => {
        const pageable = {
            page: currentPage,
            size: itemsPerPage
        };

        listChiTietSanPhamBySanPhamId(pageable, id)
            .then(response => {
                console.log(response.data); // Kiểm tra dữ liệu trả về
                setChiTietSanPham(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => console.error('Error fetching product details:', error));
    };

    useEffect(() => {
        getChiTietSanPham();
    }, [currentPage, id]);

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

    const createChiTietSanPham = () => {
        navigate(`/add-chi-tiet-san-pham/${id}`)
    }

    return (
        <div className="container">
            <h5>Chi tiết sản phẩm</h5>
            <div className="card">
                <div className="card-body">
                <div className='d-flex justify-content-between mb-3'>
                        <div>
                            <button className='btn btn-outline-success me-2' 
                                onClick={createChiTietSanPham}
                                >
                                <i className='bi bi-plus-circle'></i> Thêm mới
                            </button>
                        </div>
                        <div className='d-flex align-items-center'>
                            <div className='input-group'>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tìm kiếm sản phẩm"
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
                                <th>Số lượng tồn</th>
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
                                        <td>{ctsp.gia} vnđ </td>
                                        <td>{ctsp.trangThai ? 'Còn hàng' : 'Hết hàng'}</td>
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
                    <div className="d-flex justify-content-between align-items-center my-3">
                        <div>
                            <button className='btn btn-outline-primary' onClick={() => navigate("/san-pham")}>Quay lại</button>
                        </div>
                        <div className="d-flex align-items-center mx-auto">
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
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ListChiTietSanPhamComponent;
