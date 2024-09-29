import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSanPham, getSanPham, updateSanPham} from '../../service/SanPhamService';

const SanPhamComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [maSanPham, setMaSanPham] = useState('');
  const [tenSanPham, setTenSanPham] = useState('');
  const [moTa, setMoTa] = useState('');
  const [trangThai, setTrangThai] = useState(null);
  const [ngayTao, setNgayTao] = useState('');
  const [thuongHieuId, setThuongHieuId] = useState(''); 
  const [danhMucId, setDanhMucId] = useState('');

  useEffect(() => {
    if (id) {
      getSanPham(id)
        .then(response => {
          const { maSanPham, tenSanPham, moTa, trangThai, ngayTao, thuongHieuId, danhMucId } = response.data;
          setMaSanPham(maSanPham);
          setTenSanPham(tenSanPham);
          setMoTa(moTa);
          setTrangThai(trangThai);
          setNgayTao(ngayTao);
          setThuongHieuId(thuongHieuId || '');
          setDanhMucId(danhMucId || '');
        })
        .catch(error => {
          console.error("Có lỗi xảy ra khi lấy sản phẩm:", error);
          setErrors({ apiError: "Không thể lấy thông tin sản phẩm. Vui lòng thử lại sau." });
        });
    }

  }, [id]);

  const saveOrUpdate = (e) => {
    e.preventDefault();
    const sanPham = { maSanPham, tenSanPham, moTa, trangThai, ngayTao, thuongHieuId, danhMucId };

    if (id) {
      updateSanPham(id, sanPham)
        .then(() => navigate('/san-pham'))
        .catch(error => console.error("Cập nhật sản phẩm thất bại:", error));
    } else {
      createSanPham(sanPham)
        .then(() => navigate('/san-pham'))
        .catch(error => console.error("Thêm sản phẩm thất bại:", error));
    }
  };

  return (
    <div className='container'>
      <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
          <h5 className='text-center' style={{ marginTop: "15px" }}>{id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</h5>
          <div className='card-body'>

            <form>
              <div className="row">
                <div className='form-group mb-3 col-md-6'>
                  <label className='form-label'>Mã sản phẩm: </label>
                  <input
                    type='text'
                    placeholder='Nhập mã sản phẩm...'
                    name='maSanPham'
                    value={maSanPham}
                    onChange={(e) => setMaSanPham(e.target.value)}
                    className='form-control'

                  />
                </div>

                <div className='form-group mb-3 col-md-6'>
                  <label className='form-label'>Tên sản phẩm: </label>
                  <input
                    type='text'
                    placeholder='Nhập tên sản phẩm...'
                    name='tenSanPham'
                    value={tenSanPham}
                    onChange={(e) => setTenSanPham(e.target.value)}
                    className='form-control'

                  />
                </div>
              </div>

              <div className='form-group mb-3 row'>
                <label className='col-md-3 form-label'>Trạng thái: </label>
                <div className='col-md-9'>
                  <div className='form-check form-check-inline'>
                    <input
                      type='radio'
                      id='active'
                      value={true}
                      checked={trangThai === true}
                      onChange={() => setTrangThai(true)}
                      className='form-check-input'
                    />
                    <label className='form-check-label' htmlFor='active'>Hoạt động</label>
                  </div>
                  <div className='form-check form-check-inline'>
                    <input
                      type='radio'
                      id='inactive'
                      value={false}
                      checked={trangThai === false}
                      onChange={() => setTrangThai(false)}
                      className='form-check-input'
                    />
                    <label className='form-check-label' htmlFor='inactive'>Không hoạt động</label>
                  </div>
                </div>
              </div>

              <div className='form-group row mb-3'>
                <div className='col-md-4'>
                  <label className='form-label'>Ngày tạo:</label>
                  <input
                    type='date'
                    value={ngayTao}
                    onChange={(e) => setNgayTao(e.target.value)}
                    className='form-control'

                  />
                </div>

                <div className='col-md-4'>
                  <label className='form-label'>Thương hiệu:</label>
                  <select
                    className="form-select"
                    value={thuongHieuId}
                    onChange={(e) => setThuongHieuId(e.target.value)}

                  >
                    <option value="">Chọn thương hiệu</option>
                  </select>
                </div>

                <div className='col-md-4'>
                  <label className='form-label'>Danh mục:</label>
                  <select
                    className="form-select"
                    value={danhMucId}
                    onChange={(e) => setDanhMucId(e.target.value)}

                  >
                    <option value="">Chọn danh mục</option>

                  </select>
                </div>
              </div>

              <div className='form-group mb-3'>
                <label className='form-label'>Mô tả: </label>
                <textarea
                  placeholder='Nhập mô tả sản phẩm...'
                  name='moTa'
                  value={moTa}
                  onChange={(e) => setMoTa(e.target.value)}
                  className='form-control'
                />
              </div>

              <button className='btn btn-primary' onClick={saveOrUpdate}>Lưu</button>
              <button className='btn btn-danger' onClick={() => navigate('/san-pham')} style={{ marginLeft: "10px" }}>Hủy</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SanPhamComponent;
