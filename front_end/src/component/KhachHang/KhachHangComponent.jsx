import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createKhachHang, getOneKhachHang, updateKhachHang } from '../../service/KhachHangService';

const KhachHangComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [maKhachHang, setMaKhachHang] = useState('');
  const [hoTen, setHoTen] = useState('');
  const [gioiTinh, setGioiTinh] = useState(true); // Mặc định là Nam
  const [soDienThoai, setSoDienThoai] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [email, setEmail] = useState('');
  const [diaChi, setDiaChi] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      getOneKhachHang(id).then((response) => {
        const { maKhachHang, hoTen, gioiTinh, soDienThoai, email, diaChi } = response.data;
        setMaKhachHang(maKhachHang);
        setHoTen(hoTen);
        setGioiTinh(gioiTinh);
        setSoDienThoai(soDienThoai);
        setEmail(email);
        setDiaChi(diaChi);
      }).catch((error) => {
        console.log("Lỗi khi lấy dữ liệu khách hàng: " + error);
      });
    }
  }, [id]);

  const saveOrUpdate = (e) => {
    e.preventDefault();

    const khachHangData = { maKhachHang, hoTen, gioiTinh, soDienThoai, matKhau, email, diaChi };

    const handleError = (error) => {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.log("Lỗi: " + error);
      }
    };

    if (id) {
      updateKhachHang(id, khachHangData).then(() => {
        navigate('/khach-hang');
      }).catch(handleError);
    } else {
      createKhachHang(khachHangData).then(() => {
        navigate('/khach-hang');
      }).catch(handleError);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='card col-md-6 offset-md-3 mb-5'>
          <h5 className='text-center mt-2'>{id ? "Cập Nhật Khách Hàng" : "Thêm Khách Hàng"}</h5>
          <div className='card-body'>
            <form onSubmit={saveOrUpdate}>
              <div className='form-group mb-3'>
                <label className='form-label'>Mã Khách Hàng:</label>
                <input
                  type="text"
                  placeholder='Nhập mã khách hàng..'
                  value={maKhachHang}
                  className={`form-control ${errors.maKhachHang ? "is-invalid" : ""}`}
                  onChange={(e) => setMaKhachHang(e.target.value)}
                />
                {errors.maKhachHang && <div className='invalid-feedback'>{errors.maKhachHang}</div>}
              </div>
              <div className='form-group mb-3'>
                <label className='form-label'>Họ và Tên:</label>
                <input
                  type="text"
                  placeholder='Nhập họ và tên..'
                  value={hoTen}
                  className={`form-control ${errors.hoTen ? "is-invalid" : ""}`}
                  onChange={(e) => setHoTen(e.target.value)}
                />
                {errors.hoTen && <div className='invalid-feedback'>{errors.hoTen}</div>}
              </div>
              <div className='form-group mb-3'>
                <label className='form-label'>Giới Tính:</label>
                <div>
                  <div className='form-check form-check-inline'>
                    <input
                      type="radio"
                      className='form-check-input'
                      value={true}
                      checked={gioiTinh === true}
                      onChange={() => setGioiTinh(true)}
                      id='gioiTinhNam'
                    />
                    <label className='form-check-label' htmlFor='gioiTinhNam'>Nam</label>
                  </div>
                  <div className='form-check form-check-inline'>
                    <input
                      type="radio"
                      className='form-check-input'
                      value={false}
                      checked={gioiTinh === false}
                      onChange={() => setGioiTinh(false)}
                      id='gioiTinhNu'
                    />
                    <label className='form-check-label' htmlFor='gioiTinhNu'>Nữ</label>
                  </div>
                </div>
              </div>
              <div className='form-group mb-3'>
                <label className='form-label'>Số Điện Thoại:</label>
                <input
                  type="text"
                  placeholder='Nhập số điện thoại..'
                  value={soDienThoai}
                  className={`form-control ${errors.soDienThoai ? "is-invalid" : ""}`}
                  onChange={(e) => setSoDienThoai(e.target.value)}
                />
                {errors.soDienThoai && <div className='invalid-feedback'>{errors.soDienThoai}</div>}
              </div>
              <div className='form-group mb-3'>
                <label className='form-label'>Email:</label>
                <input
                  type="email"
                  placeholder='Nhập email..'
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>
              <div className='form-group mb-3'>
                <label className='form-label'>Địa Chỉ:</label>
                <input
                  type="text"
                  placeholder='Nhập địa chỉ..'
                  value={diaChi}
                  className={`form-control ${errors.diaChi ? "is-invalid" : ""}`}
                  onChange={(e) => setDiaChi(e.target.value)}
                />
                {errors.diaChi && <div className='invalid-feedback'>{errors.diaChi}</div>}
              </div>
              <button type="submit" className='btn btn-success'>
                {id ? "Cập Nhật" : "Thêm"}
              </button>
              <button className='btn btn-outline-primary' style={{ marginLeft: "10px" }} onClick={() => navigate('/khach-hang')}>
                Quay Lại
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KhachHangComponent;
