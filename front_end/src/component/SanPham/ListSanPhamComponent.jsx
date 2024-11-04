import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listSanPham } from '../../service/SanPhamService';

const ListSanPhamComponent = () => {
    const [sp, setSanPham] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [trangThai, setTrangThai] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 8;
    const navigator = useNavigate();

    const getAllSanPham = () => {
        const pageable = {
            page: currentPage,
            size: itemsPerPage
        };

        listSanPham(pageable, trangThai, keyword)
            .then(response => {
                setSanPham(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => console.error('Error fetching products:', error));
    };

    const createSanPham = () => {
        navigator("/add-san-pham");
    };

    const updateSanPham = (id) => {
        navigator(`/update-san-pham/${id}`);
    };

    const viewChiTietSanPham = (id) => {
        navigator(`/san-pham/${id}`);
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

    const handleSearch = (e) => {
        setKeyword(e.target.value.trim());
        setCurrentPage(0);
    };

    const handleStatusChange = (e) => {
        const value = e.target.value;
        if (value === 'all') {
            setTrangThai(null);
        } else if (value === 'true') {
            setTrangThai(true);
        } else {
            setTrangThai(false);
        }
        setCurrentPage(0);
    };

    useEffect(() => {
        getAllSanPham();
    }, [currentPage, trangThai, keyword]);

    return (
        <div className='container'>
            <h5>Sản phẩm</h5>
            <div className='card mb-5'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between mb-3'>
                        <div>
                            <button className='btn btn-outline-success me-2' onClick={createSanPham}>
                                <i className='bi bi-plus-circle'></i> Thêm mới
                            </button>
                        </div>
                        <div className='d-flex align-items-center'>
                            <div className='input-group'>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tìm kiếm sản phẩm"
                                    value={keyword}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Lọc theo trạng thái */}
                    <div className='mb-3'>
                        <label className='me-2'>Trạng thái:</label>
                        <div className='form-check form-check-inline'>
                            <input
                                className='form-check-input'
                                type='radio'
                                name='trangThai'
                                value='all'
                                checked={trangThai === null}
                                onChange={handleStatusChange}
                            />
                            <label className='form-check-label'>Tất cả</label>
                        </div>
                        <div className='form-check form-check-inline'>
                            <input
                                className='form-check-input'
                                type='radio'
                                name='trangThai'
                                value='true'
                                checked={trangThai === true}
                                onChange={handleStatusChange}
                            />
                            <label className='form-check-label'>Đang bán</label>
                        </div>
                        <div className='form-check form-check-inline'>
                            <input
                                className='form-check-input'
                                type='radio'
                                name='trangThai'
                                value='false'
                                checked={trangThai === false}
                                onChange={handleStatusChange}
                            />
                            <label className='form-check-label'>Ngừng bán</label>
                        </div>
                    </div>

                    <table className='table table-hover text-center'>
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
                            {sp.length > 0 ? (
                                sp.map(sanPham => (
                                    <tr key={sanPham.id}>
                                        <td>{sanPham.id}</td>
                                        <td>{sanPham.maSanPham}</td>
                                        <td>{sanPham.tenSanPham}</td>
                                        <td>{sanPham.danhMuc?.tenDanhMuc}</td>
                                        <td>{sanPham.thuongHieu?.tenThuongHieu}</td>
                                        <td>{new Date(sanPham.ngayTao).toLocaleDateString()}</td>
                                        <td>{sanPham.trangThai ? 'Đang bán' : 'Ngừng bán'}</td>
                                        <td>
                                            <button
                                                className='btn btn-info'
                                                style={{ marginLeft: '10px' }}
                                                onClick={() => updateSanPham(sanPham.id)}>
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button
                                                className='btn btn-success'
                                                style={{ marginLeft: '10px' }}
                                                onClick={() => viewChiTietSanPham(sanPham.id)}>
                                                <i className="bi bi-eye"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
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
        </div>
    );
};

export default ListSanPhamComponent;
