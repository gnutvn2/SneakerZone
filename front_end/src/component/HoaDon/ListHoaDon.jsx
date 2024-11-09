import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {listHoaDonDaThanhToan} from '../../service/HoaDonServcie'

const HoaDonList = () => {
  const [hoaDon, setHoaDon] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  const getAllHoaDonDaThanhToan = () => {
    listHoaDonDaThanhToan({page: currentPage, size: itemsPerPage}).then((response) =>{
      setHoaDon(response.data.content);
      setTotalPages(response.data.totalPages);
    }).catch((error) =>{
      console.log(error);
    });
  };

  useEffect(()=>{
    getAllHoaDonDaThanhToan();
  }, [currentPage]);


  return (
    <div className="container">
      <h5>Lịch sử mua hàng</h5>
      <div className="card">
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Mã hóa đơn</th>
                <th>Tên khách hàng</th>
                <th>Tên nhân viên</th>
                <th>Ngày tạo</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {hoaDon.map(item =>
                <tr key={item.id}>
                  <td>{item.maHoaDon}</td>
                  <td>{item.tenKhachHang}</td>
                  <td>{item.tenNhanVien}</td>
                  <td>{item.ngayTao}</td>
                  <td>{item.tongTien} VNĐ</td>
                  <td>{item.trangThai}</td>
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
      
    </div>
  );
};

export default HoaDonList;
