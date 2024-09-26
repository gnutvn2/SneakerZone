import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listSanPham } from '../../service/SanPhamService';
import InactiveProductsModal from './InactiveProductsModal'; // Import modal

const ListSanPhamComponent = () => {
    const [sp, setSanPham] = useState([]);
    const [inactiveProducts, setInactiveProducts] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const navigator = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 5;

    const getAllSanPham = () => {
        listSanPham({ page: currentPage, size: itemsPerPage}, true) // Đang hoạt động
            .then((response) => {
                console.log("Sp active:", response.data.content); // Log sản phẩm đang hoạt động
                setSanPham(response.data.content);
                setTotalPages(response.data.totalPages);
            }).catch((error) => {
                console.log(error);
            });
    };


    const getInactiveProducts = () => {
       
        listSanPham({ page: currentPage, size: itemsPerPage}, false)
            .then((response) => {
                console.log("Inactive products:", response.data.content); // Log dữ liệu API trả về
                setInactiveProducts(response.data.content); // Lưu vào state
                setModalOpen(true); // Mở modal sau khi nhận được dữ liệu
            }).catch((error) => {
                console.log(error);
            });
    };





    const handleShowModal = () => {
        getInactiveProducts(); // Gọi hàm để lấy sản phẩm không hoạt động và mở modal
    };

    const handleCloseModal = () => {
        setModalOpen(false); // Đóng modal
        getAllSanPham(); // Refresh lại danh sách sản phẩm hoạt động
    };

    useEffect(() => {
        getAllSanPham();
    }, [currentPage]);

    return (
        <div className='container'>
            <h5>Sản phẩm</h5>
            <div className='card'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between mb-3'>
                        <div>
                            <button className='btn btn-success me-2'>
                                <i className='bi bi-plus-circle'></i> Thêm
                            </button>
                            <button className='btn btn-info' onClick={handleShowModal}>
                                <i className='bi bi-arrow-counterclockwise'></i> Sản phẩm không hoạt động
                            </button>
                        </div>
                    </div>

                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th>ID sản phẩm</th>
                                <th>Mã sản phẩm</th>
                                <th>Tên sản phẩm</th>
                                <th>Tên danh mục</th>
                                <th>Tên thương hiệu</th>
                                <th>Ngày tạo</th>
                                <th>Trạng thái</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sp.map(sanPham =>
                                <tr key={sanPham.id}>
                                    <td>{sanPham.id}</td>
                                    <td>{sanPham.maSanPham}</td>
                                    <td>{sanPham.tenSanPham}</td>
                                    <td>{sanPham.danhMuc?.tenDanhMuc}</td>
                                    <td>{sanPham.thuongHieu?.tenThuongHieu}</td>
                                    <td>{sanPham.ngayTao}</td>
                                    <td>{sanPham.trangThai ? 'Hoạt động' : 'Ngừng hoạt động'}</td>
                                    <td>
                                        <button className='btn btn-info'>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button
                                            className='btn btn-danger'
                                            style={{ marginLeft: '10px' }}>
                                            <i className='bi bi-trash'></i>
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal để hiển thị sản phẩm không hoạt động */}
            <InactiveProductsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                inactiveProducts={inactiveProducts} // Truyền danh sách sản phẩm không hoạt động
            />
        </div>
    );
}

export default ListSanPhamComponent;
