import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createNhanVien, getOneNhanVien, getVaiTro, updateNhanVien } from '../../service/NhanVienService';

const NhanVienComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [maNhanVien, setMaNhanVien] = useState('');
  const [hoTen, setHoTen] = useState('');
  const [gioiTinh, setGioiTinh] = useState(true);
  const [soDienThoai, setSoDienThoai] = useState('');
  const [email, setEmail] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [diaChi, setDiaChi] = useState('');
  const [trangThai, setTrangThai] = useState(true);
  const [vaiTroId, setVaiTroId] = useState('');
  const [vaiTro, setVaiTro] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getVaiTro()
      .then(response => {
        setVaiTro(response.data);
      })
      .catch(error => console.error("Có lỗi xảy ra khi lấy vai trò:", error));

    if (id) {
      getOneNhanVien(id)
        .then((response) => {
          const { maNhanVien, hoTen, gioiTinh, soDienThoai, email, matKhau, diaChi, trangThai, vaiTroId } = response.data;
          setMaNhanVien(maNhanVien);
          setHoTen(hoTen);
          setGioiTinh(gioiTinh);
          setSoDienThoai(soDienThoai);
          setEmail(email);
          setMatKhau(matKhau);
          setDiaChi(diaChi);
          setTrangThai(trangThai);
          setVaiTroId(vaiTroId);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [id]);

  const saveOrUpdate = (e) => {
    e.preventDefault();
    const nhanVien = {
      maNhanVien,
      hoTen,
      gioiTinh,
      soDienThoai,
      email,
      matKhau,
      diaChi,
      trangThai,
      vaiTroId
    };

    const handleError = (error) => {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
        console.log(error.response.data);
      } else {
        console.log("Lỗi: " + error);
      }
    };

    if (id) {
      updateNhanVien(id, nhanVien)
        .then(() => navigate('/nhan-vien'))
        .catch(handleError);
    } else {
      createNhanVien(nhanVien)
        .then(() => navigate('/nhan-vien'))
        .catch(handleError);
    }
  };

  return (
    <div className='container'>
      <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
          <h5 className='text-center' style={{ marginTop: "15px" }}>{id ? "Cập nhật nhân viên" : "Thêm nhân viên"}</h5>
          <div className='card-body'>
            <form>
              <div className='row'>
                <div className='form-group mb-3 col-md-6'>
                  <label className='form-label'>Mã nhân viên: </label>
                  <input
                    type="text"
                    placeholder='Nhập mã nhân viên..'
                    name='maNhanVien'
                    value={maNhanVien}
                    className={`form-control ${errors.maNhanVien ? "is-invalid" : ""}`}
                    onChange={(e) => setMaNhanVien(e.target.value)}
                  />
                  {errors.maNhanVien && <div className='invalid-feedback'>{errors.maNhanVien}</div>}
                </div>
                <div className='form-group mb-3 col-md-6'>
                  <label className='form-label'>Tên nhân viên: </label>
                  <input
                    type="text"
                    placeholder='Nhập tên nhân viên..'
                    name='hoTen'
                    value={hoTen}
                    className={`form-control ${errors.hoTen ? "is-invalid" : ""}`}
                    onChange={(e) => setHoTen(e.target.value)}
                  />
                  {errors.hoTen && <div className='invalid-feedback'>{errors.hoTen}</div>}
                </div>
              </div>

              {/* Các trường còn lại */}
              <div className='form-group mb-3'>
                <label className='form-label'>Giới tính:</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gioiTinh"
                      id="gioiTinhNam"
                      value={true}
                      checked={gioiTinh === true}
                      onChange={() => setGioiTinh(true)}
                    />
                    <label className="form-check-label" htmlFor="gioiTinhNam">Nam</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gioiTinh"
                      id="gioiTinhNu"
                      value={false}
                      checked={gioiTinh === false}
                      onChange={() => setGioiTinh(false)}
                    />
                    <label className="form-check-label" htmlFor="gioiTinhNu">Nữ</label>
                  </div>
                </div>
              </div>

              {/* Số điện thoại, Email, Mật khẩu cùng một hàng */}
              <div className='row'>
                <div className='form-group mb-3 col-md-6'>
                  <label className='form-label'>Số điện thoại:</label>
                  <input
                    type="text"
                    placeholder='Nhập số điện thoại..'
                    name='soDienThoai'
                    value={soDienThoai}
                    className={`form-control ${errors.soDienThoai ? "is-invalid" : ""}`}
                    onChange={(e) => setSoDienThoai(e.target.value)}
                  />
                  {errors.soDienThoai && <div className='invalid-feedback'>{errors.soDienThoai}</div>}
                </div>
                <div className='form-group mb-3 col-md-6'>
                  <label className='form-label'>Email:</label>
                  <input
                    type="email"
                    placeholder='Nhập email..'
                    name='email'
                    value={email}
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                </div>
              </div>

              {/* Địa chỉ và vai trò cùng một hàng */}
              <div className='row'>
                <div className='form-group mb-3 col-md-6'>
                  <label className='form-label'>Địa chỉ:</label>
                  <input
                    type="text"
                    placeholder='Nhập địa chỉ..'
                    name='diaChi'
                    value={diaChi}
                    className={`form-control ${errors.diaChi ? "is-invalid" : ""}`}
                    onChange={(e) => setDiaChi(e.target.value)}
                  />
                  {errors.diaChi && <div className='invalid-feedback'>{errors.diaChi}</div>}
                </div>
                <div className='form-group mb-3 col-md-6'>
                  <label className='form-label'>Vai trò:</label>
                  <select
                    className={`form-select ${errors.vaiTroId ? 'is-invalid' : ''}`}
                    value={vaiTroId}
                    onChange={(e) => setVaiTroId(e.target.value)}
                  >
                    <option value="">Chọn vai trò</option>
                    {vaiTro.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.tenVaiTro}
                      </option>
                    ))}
                  </select>
                  {errors.vaiTroId && <div className='invalid-feedback'>{errors.vaiTroId}</div>}
                </div>
              </div>

              {/* Trạng thái */}
              <div className='form-group mb-3'>
                <label className='form-label'>Trạng thái:</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="trangThai"
                      id="trangThaiHoatDong"
                      value={true}
                      checked={trangThai === true}
                      onChange={() => setTrangThai(true)}
                    />
                    <label className="form-check-label" htmlFor="trangThaiHoatDong">Hoạt động</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="trangThai"
                      id="trangThaiKhongHoatDong"
                      value={false}
                      checked={trangThai === false}
                      onChange={() => setTrangThai(false)}
                    />
                    <label className="form-check-label" htmlFor="trangThaiKhongHoatDong">Không hoạt động</label>
                  </div>
                </div>
              </div>

              <button className='btn btn-outline-primary' onClick={saveOrUpdate}>{id ? "Cập nhật" : "Thêm"}</button>
              <button className='btn btn-outline-danger' onClick={() => navigate('/nhan-vien')} style={{ marginLeft: "10px" }}>Hủy</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NhanVienComponent;
