import React, { useEffect, useState } from 'react';
import { listDanhMuc, deleteDanhMuc } from '../../service/DanhMucService';
import { useNavigate } from 'react-router-dom';

const ListDanhMuc = () => {
  const [dm, setDanhMuc] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const itemsPerPage = 5; // Số lượng mục trên mỗi trang
  const navigator = useNavigate();

  useEffect(() => {
    getAllDanhMuc();
  }, [currentPage]); // Gọi lại khi currentPage thay đổi

  function getAllDanhMuc() {
    listDanhMuc({ page: currentPage, size: itemsPerPage })
      .then((response) => {
        setDanhMuc(response.data.content); // Cập nhật danh mục
        setTotalPages(response.data.totalPages); // Cập nhật tổng số trang
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Chuyển hướng tới trang thêm danh mục
  function addDanhMuc() {
    navigator('/add-danh-muc');
  }

  // Chuyển hướng tới trang cập nhật danh mục
  function updateDanhMuc(id) {
    navigator(`/update-danh-muc/${id}`);
  }

  // Xóa danh mục sau khi xác nhận
  function removeDanhMuc(id) {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
      deleteDanhMuc(id)
        .then(() => {
          getAllDanhMuc(); // Tải lại danh sách sau khi xóa
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div className='container'>
      <h5>Danh mục</h5>
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            {/* Tạo mới 1 danh mục */}
            <button className='btn btn-success' onClick={addDanhMuc}>
              <i className="bi bi-plus-circle"></i> Thêm danh mục
            </button>
          </div>

          <table className='table table-hover'>
            <thead>
              <tr>
                <th>ID danh mục</th>
                <th>Mã danh mục</th>
                <th>Tên danh mục</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {dm.map(danhMuc => (
                <tr key={danhMuc.id}>
                  <td>{danhMuc.id}</td>
                  <td>{danhMuc.maDanhMuc}</td>
                  <td>{danhMuc.tenDanhMuc}</td>
                  <td>
                    <button className='btn btn-info'
                      onClick={() => updateDanhMuc(danhMuc.id)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className='btn btn-danger'
                      style={{ marginLeft: '10px' }}
                      onClick={() => removeDanhMuc(danhMuc.id)}>
                      <i className='bi bi-trash'></i>
                    </button>
                  </td>
                </tr>
              ))}
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
    </div>
  );
}

export default ListDanhMuc;
