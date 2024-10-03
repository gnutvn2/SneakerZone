import React, { useEffect, useState } from 'react'
import { listMauSac } from '../../service/MauSacService';
import { useNavigate } from 'react-router-dom';

const ListMauSac = () => {
  const [ms, setMauSac] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const getAllMauSac = () => {
    listMauSac({page: currentPage, size: itemsPerPage}).then((response) => {
      setMauSac(response.data.content);
      setTotalPages(response.data.totalPages);
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    getAllMauSac();
  }, [currentPage]);

  return (
    <div className='container'>
      <h5>Màu sắc</h5>
      <div className='card'>
        <div className='card-body'>
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
                </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>

    </div >
  )
}

export default ListMauSac