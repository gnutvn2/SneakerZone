import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { listChiTietSanPham } from '../../service/ChiTietSanPham';

const ListChiTietSanPham = () => {
    const { id } = useParams(); 
    const [chiTietSanPham, setChiTietSanPham] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 8;
    const navigate = useNavigate();

    const getAllChiTietSanPham = () => {
        listChiTietSanPham({ page: currentPage, size: itemsPerPage }, id)
            .then((response) => {
                console.log(response.data);
                setChiTietSanPham(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getAllChiTietSanPham();
    }, [id, currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className='container'>
            <h5>Danh sách chi tiết sản phẩm</h5>
            <div className='card'>
                <div className='card-body'>
                    <table className='table table-hover text-center'>
                        <thead>
                            <tr>
                                {/* <th>ID</th> */}
                                <th>Mã chi tiết</th>
                                <th>Tên chi tiết</th>
                                <th>Hình ảnh</th>
                                <th>Số lượng tồn</th>
                                <th>Giá</th>
                                <th>Tên sản phẩm</th>
                                <th>Tên màu sắc</th>
                                <th>Tên size</th>
                                <th>Tên chất liệu</th>
                                <th>Tên đế giày</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chiTietSanPham.length > 0 ? (
                                chiTietSanPham.map((item) => (
                                    <tr key={item.id}>
                                        {/* <td>{item.id}</td> */}
                                        <td>{item.maChiTietSanPham}</td>
                                        <td>{item.tenChiTietSanPham}</td>
                                        <td>{item.hinhAnh}</td>
                                        <td>{item.soLuongTon}</td>
                                        <td>{item.gia}</td>
                                        <td>{item.sanPham.tenSanPham}</td>
                                        <td>{item.mauSac.tenMauSac}</td>
                                        <td>{item.size.tenSize}</td>
                                        <td>{item.chatLieu.tenChatLieu}</td>
                                        <td>{item.deGiay.tenDeGiay}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">Không có chi tiết sản phẩm nào.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Nút phân trang */}
                    <div className="d-flex justify-content-center my-3">
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
    );
};

export default ListChiTietSanPham;
