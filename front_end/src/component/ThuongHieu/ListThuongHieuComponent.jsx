import React, { useEffect, useState } from 'react';
import { deleteThuongHieu, listThuongHieu } from '../../service/ThuongHieuService';
import { useNavigate } from 'react-router-dom';

const ListThuongHieuComponent = () => {
    const [th, setThuongHieu] = useState([]);
    const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
    const [totalPages, setTotalPages] = useState(0); // Tổng số trang
    const itemsPerPage = 3;
    const navigator = useNavigate();

    useEffect(() => {
        getAllThuongHieu();
    }, [currentPage]); // Thay đổi khi trang hiện tại thay đổi

    function getAllThuongHieu() {
        listThuongHieu({ page: currentPage, size: itemsPerPage }) // Gọi API với trang hiện tại và kích thước trang
            .then((response) => {
                setThuongHieu(response.data.content); // Giả sử dữ liệu trả về có cấu trúc này
                setTotalPages(response.data.totalPages); // Cập nhật tổng số trang
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function addThuongHieu() {
        navigator('/add-thuong-hieu');
    }

    function updateThuongHieu(id) {
        navigator(`/update-thuong-hieu/${id}`);
    }

    function removeThuongHieu(id) {
        if (window.confirm("Bạn có chắc chắn muốn xóa thương hiệu này không?")) {
            deleteThuongHieu(id)
                .then(() => {
                    getAllThuongHieu(); // Gọi lại danh sách thương hiệu sau khi xóa
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    return (
        <div className='container'>
            <h5>Thương hiệu</h5>
            <div className='card'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between mb-3'>
                        <button className='btn btn-success' onClick={addThuongHieu}>
                            <i className="bi bi-plus-circle"></i> Thêm thương hiệu
                        </button>
                    </div>

                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th>ID thương hiệu</th>
                                <th>Mã thương hiệu</th>
                                <th>Tên thương hiệu</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {th.map(thuongHieu => (
                                <tr key={thuongHieu.id}>
                                    <td>{thuongHieu.id}</td>
                                    <td>{thuongHieu.maThuongHieu}</td>
                                    <td>{thuongHieu.tenThuongHieu}</td>
                                    <td>
                                        <button className='btn btn-info'
                                            onClick={() => updateThuongHieu(thuongHieu.id)}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button
                                            className='btn btn-danger'
                                            style={{ marginLeft: '10px' }}
                                            onClick={() => removeThuongHieu(thuongHieu.id)}>
                                            <i className='bi bi-trash'></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Thêm nút phân trang */}
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
        </div>
    );
}

export default ListThuongHieuComponent;
