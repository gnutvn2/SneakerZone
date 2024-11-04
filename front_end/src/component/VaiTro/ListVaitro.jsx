import React, { useEffect, useState } from 'react';
import { getAllVaiTro, deleteVaiTro } from '../../service/VaitroService';
import { useNavigate } from 'react-router-dom';

const VaiTroComponent = () => {
  const [vaiTroList, setVaiTroList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllVaiTro();
  }, []);

  const fetchAllVaiTro = async () => {
    try {
      const data = await getAllVaiTro();
      setVaiTroList(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách vai trò:", error);
    }
  };

  const createVaiTro = () => {
    navigate('/add-vai-tro');
  }

  function updateVaiTro(id) {
    navigate(`/update-vai-tro/${id}`);
}

  const handleDeleteVaiTro = async (vaiTroId) => {
    try {
      await deleteVaiTro(vaiTroId);
      fetchAllVaiTro();
    } catch (error) {
      console.error(`Lỗi khi xóa vai trò với ID: ${vaiTroId}`, error);
    }
  };

  return (
    <div className='container mt-4'>
      <h5>Danh sách Vai Trò</h5>
      <div className='card'>
        <div className='card-body'>
          <div>
            <button
              className='btn btn-outline-success'
              onClick={createVaiTro}>
              <i className="bi bi-plus-circle"></i> Thêm
            </button>
          </div>
          <table className='table table-hover text-center'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Mã vai trò</th>
                <th>Tên Vai Trò</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {vaiTroList.map(vaiTro => (
                <tr key={vaiTro.id}>
                  <td>{vaiTro.id}</td>
                  <td>{vaiTro.maVaiTro}</td>
                  <td>{vaiTro.tenVaiTro}</td>
                  <td>
                    <button className='btn btn-outline-info'
                      onClick={() => updateVaiTro(vaiTro.id)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className='btn btn-outline-danger ms-2'
                      onClick={() => handleDeleteVaiTro(vaiTro.id)}>
                      <i className='bi bi-trash'></i>
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

export default VaiTroComponent;
