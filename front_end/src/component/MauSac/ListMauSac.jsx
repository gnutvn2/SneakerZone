import React, { useEffect, useState } from 'react'
import { deleteMauSac, listMauSac } from '../../service/MauSacService';
import { useNavigate } from 'react-router-dom';

const ListMauSac = () => {
  const [ms, setMauSac] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const getAllMauSac = () => {
    listMauSac({ page: currentPage, size: itemsPerPage }, searchQuery).then((response) => {
      setMauSac(response.data.content);
      setTotalPages(response.data.totalPages);
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    getAllMauSac();
  }, [currentPage, searchQuery]);

  const createMauSac = () => {
    navigate('/add-mau-sac')
  }

  const updateMauSac = (id) => {
    navigate(`/update-mau-sac/${id}`)
  }

  const removeMauSac = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa màu sắc này không ?")) {
      deleteMauSac(id).then(() => {
        getAllMauSac();
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  const handlerSearchInput = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  }


  return (
    <div className='container'>
      <h5>Màu sắc</h5>
      <div className='card'>
        <div className='card-body'>
          <div className="d-flex justify-content-between mb-3">
            <button className='btn btn-success' onClick={createMauSac}>
              <i className="bi bi-plus-circle"></i> Thêm màu sắc
            </button>
            <div>
              <input
                type="text"
                placeholder='Tìm kiếm...'
                className='form-control'
                value={searchQuery}
                onChange={handlerSearchInput}
              />
            </div>

          </div>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th>ID màu sắc</th>
                <th>Mã màu sắc</th>
                <th>Tên màu sắc</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {ms.map(mauSac =>
                <tr key={mauSac.id}>
                  <td>{mauSac.id}</td>
                  <td>{mauSac.maMauSac}</td>
                  <td>{mauSac.tenMauSac}</td>
                  <td>
                    <button className='btn btn-info'
                      onClick={() => updateMauSac(mauSac.id)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className='btn btn-danger'
                      style={{ marginLeft: '10px' }}
                      onClick={() => removeMauSac(mauSac.id)}>
                      <i className='bi bi-trash'></i>
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className='d-flex justify-content-center my-3'>
            <button
              className='btn btn-outline-primary me-2'
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
            >Pre
            </button>
            <span className='align-self-center'>Trang {currentPage + 1} / {totalPages}</span>
            <button
              className='btn btn-outline-primary ms-2'
              disabled={currentPage + 1 >= totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >Next
            </button>
          </div>

        </div>
      </div>

    </div >
  )
}

export default ListMauSac