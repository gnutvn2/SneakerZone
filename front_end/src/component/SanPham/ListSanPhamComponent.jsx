import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listSanPham, updateTrangThai } from '../../service/SanPhamService';
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
        listSanPham({ page: currentPage, size: itemsPerPage }, true)
            .then((response) => {
                setSanPham(response.data.content);
                setTotalPages(response.data.totalPages);
            }).catch((error) => {
                console.log(error);
            });
    };

    function createSanPham() {
        navigator("/add-san-pham");
    }

    function updateSanPham(id) {
        navigator(`/update-san-pham/${id}`)
    }

    const handleUpdateTrangThai = (sanPhamId) => {
        updateTrangThai(sanPhamId)
            .then(() => {
                getAllSanPham();
            })
            .catch((error) => {
                console.log("Cập nhật trạng thái thất bại: ", error);
            });
    };

    const getInactiveProducts = () => {
        listSanPham({ page: currentPage, size: itemsPerPage }, false)
            .then((response) => {
                setInactiveProducts(response.data.content);
                setModalOpen(true);
            }).catch((error) => {
                console.log(error);
            });
    };

    const handleShowModal = () => {
        getInactiveProducts();
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        getAllSanPham(); // Refresh lại danh sách sản phẩm hoạt động
    };

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
                            <button className='btn btn-success me-2' onClick={createSanPham}>
                                <i className='bi bi-plus-circle'></i> Thêm
                            </button>
                            <button className='btn btn-info' onClick={handleShowModal}>
                                <i className='bi bi-arrow-counterclockwise'></i> Sản phẩm không hoạt động
                            </button>
                        </div>
                    </div>

                    <table className='table table-hover text-center'>
                        <thead >
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
                            {sp.length > 0 ? (
                                sp.map(sanPham =>
                                    <tr key={sanPham.id}>
                                        <td>{sanPham.id}</td>
                                        <td>{sanPham.maSanPham}</td>
                                        <td>{sanPham.tenSanPham}</td>
                                        <td>{sanPham.danhMuc?.tenDanhMuc}</td>
                                        <td>{sanPham.thuongHieu?.tenThuongHieu}</td>
                                        <td>{sanPham.ngayTao}</td>
                                        <td>{sanPham.trangThai ? 'Hoạt động' : 'Ngừng hoạt động'}</td>
                                        <td>
                                        <button
                                                className='btn btn-danger'
                                                onClick={() => handleUpdateTrangThai(sanPham.id)}
                                            >
                                                <i class="bi bi-arrow-repeat"></i>
                                            </button>
                                            <button 
                                                className='btn btn-info'
                                                style={{ marginLeft: '10px' }}
                                                onClick={updateSanPham}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button
                                                className='btn btn-success'
                                                style={{ marginLeft: '10px' }}>
                                                <i class="bi bi-eye"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">Không có sản phẩm nào.</td>
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
