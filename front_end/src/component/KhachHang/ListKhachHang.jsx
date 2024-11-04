import React, { useEffect, useState } from 'react';
import { getAllKhachHang, deleteKhachHang } from '../../service/KhachHangService';
import { useNavigate } from 'react-router-dom';

const ListKhachHang = () => {
  const [khachHangList, setKhachHangList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const fetchAllKhachHang = () => {
    getAllKhachHang({ page: currentPage, size: itemsPerPage }, keyword)
      .then((response) => {
        setKhachHangList(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách khách hàng', error);
      });
  };

  useEffect(() => {
    fetchAllKhachHang();
  }, [currentPage, keyword]);

  const handleCreateKhachHang = () => {
    navigate('/add-khach-hang');
  };

  const handleUpdateKhachHang = (id) => {
    navigate(`/update-khach-hang/${id}`);
  };

  const handleDeleteKhachHang = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này không?")) {
      try {
        await deleteKhachHang(id);
        fetchAllKhachHang();
      } catch (error) {
        console.error(`Lỗi khi xóa khách hàng với ID: ${id}`, error);
      }
    }
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value)
    setCurrentPage(0);
  };

  return (
    <div className='container mt-4'>
      <h5>Khách Hàng</h5>
      <div className='card'>
        <div className='card-body'>
          <div className="d-flex justify-content-between mb-3">
            <button className='btn btn-outline-success' onClick={handleCreateKhachHang}>
              <i className="bi bi-plus-circle"></i> Thêm
            </button>
            <div>
              <input
                type="text"
                placeholder='Tìm kiếm...'
                className='form-control'
                value={keyword}
                onChange={handleSearch}
              />
            </div>

          </div>
          <table className='table table-hover text-center'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Mã Khách Hàng</th>
                <th>Tên Khách Hàng</th>
                <th>Email</th>
                <th>Điện Thoại</th>
                <th>Địa Chỉ</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {khachHangList.length > 0 ? (
                khachHangList.map(khachHang => (
                  <tr key={khachHang.id}>
                    <td>{khachHang.id}</td>
                    <td>{khachHang.maKhachHang}</td>
                    <td>{khachHang.hoTen}</td>
                    <td>{khachHang.email}</td>
                    <td>{khachHang.soDienThoai}</td>
                    <td>{khachHang.diaChi}</td>
                    <td>
                      <button className='btn btn-outline-info' onClick={() => handleUpdateKhachHang(khachHang.id)}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button className='btn btn-outline-danger ms-2' onClick={() => handleDeleteKhachHang(khachHang.id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">Không tìm thấy khách hàng nào.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className='d-flex justify-content-center my-3'>
            <button
              className='btn btn-outline-primary me-2'
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Pre
            </button>
            <span className='align-self-center'>Trang {currentPage + 1} / {totalPages}</span>
            <button
              className='btn btn-outline-primary ms-2'
              disabled={currentPage + 1 >= totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListKhachHang;
