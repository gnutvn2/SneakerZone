import React, { useEffect, useState } from 'react';
import { getAllNhanVien, changeStatus } from '../../service/NhanVienService';
import { useNavigate } from 'react-router-dom';

const ListNhanVien = () => {
  const [nhanVienList, setNhanVienList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllNhanVien();
  }, []);

  const fetchAllNhanVien = async () => {
    try {
      const data = await getAllNhanVien();
      setNhanVienList(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách nhân viên:", error);
    }
  };

  const createNhanVien = () => {
    navigate('/add-nhan-vien');
  };

  const updateNhanVien = (id) => {
    navigate(`/update-nhan-vien/${id}`);
  };

  const handleChangeStatus = async (nhanVienId) => {
    try {
      await changeStatus(nhanVienId);
      fetchAllNhanVien(); // Cập nhật lại danh sách sau khi thay đổi trạng thái
    } catch (error) {
      console.error(`Lỗi khi thay đổi trạng thái nhân viên với ID: ${nhanVienId}`, error);
    }
  };

  const filteredNhanVienList = nhanVienList.filter(nhanVien => {
    if (selectedStatus === 'all') return true;
    if (selectedStatus === 'active') return nhanVien.trangThai === true;
    if (selectedStatus === 'inactive') return nhanVien.trangThai === false;
    return true;
  });

  return (
    <div className='container mt-4'>
      <h5>Danh sách Nhân Viên</h5>
      <div className='card'>
        <div className='card-body'>
          <div className="mb-3 col-md-2">
            <label className="form-label">Trạng thái:</label>
            <select
              className="form-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Ngừng hoạt động</option>
            </select>
          </div>
          <div>
            <button
              className='btn btn-outline-success'
              onClick={createNhanVien}>
              <i className="bi bi-plus-circle"></i> Thêm
            </button>
          </div>
          <table className='table table-hover text-center'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Mã Nhân Viên</th>
                <th>Tên Nhân Viên</th>
                <th>Email</th>
                <th>Điện Thoại</th>
                <th>Trạng Thái</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {filteredNhanVienList.map(nhanVien => (
                <tr key={nhanVien.id}>
                  <td>{nhanVien.id}</td>
                  <td>{nhanVien.maNhanVien}</td>
                  <td>{nhanVien.hoTen}</td>
                  <td>{nhanVien.email}</td>
                  <td>{nhanVien.soDienThoai}</td>
                  <td>
                    <button
                      className={`btn ${nhanVien.trangThai ? 'btn-outline-success' : 'btn-outline-danger'}`}
                      onClick={() => handleChangeStatus(nhanVien.id)}
                    >
                      <i className={`bi ${nhanVien.trangThai ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}></i>
                    </button>
                  </td>
                  <td>
                    <button className='btn btn-outline-info'
                      onClick={() => updateNhanVien(nhanVien.id)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListNhanVien;
