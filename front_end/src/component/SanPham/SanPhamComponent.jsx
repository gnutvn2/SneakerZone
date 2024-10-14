import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSanPham, getSanPham, getThuongHieu, getDanhMuc, updateSanPham } from '../../service/SanPhamService';

const SanPhamComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [maSanPham, setMaSanPham] = useState('');
  const [tenSanPham, setTenSanPham] = useState('');
  const [moTa, setMoTa] = useState('');
  const [trangThai, setTrangThai] = useState(true);
  const [ngayTao, setNgayTao] = useState('');
  const [thuongHieuId, setThuongHieuId] = useState('');
  const [danhMucId, setDanhMucId] = useState('');
  const [th, setThuongHieu] = useState([]);
  const [dm, setDanhMuc] = useState([]);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    getThuongHieu()
      .then(response => {
        setThuongHieu(response.data.content);
      })
      .catch(error => console.error("Có lỗi xảy ra khi lấy thương hiệu:", error));

    getDanhMuc()
      .then(response => {
        setDanhMuc(response.data.content);
      })
      .catch(error => console.error("Có lỗi xảy ra khi lấy danh mục:", error));

    if (id) {
      getSanPham(id)

        .then(response => {
          const { maSanPham, tenSanPham, moTa, trangThai, ngayTao, thuongHieuId, danhMucId } = response.data;
          setMaSanPham(maSanPham);
          setTenSanPham(tenSanPham);
          setMoTa(moTa);
          setTrangThai(trangThai === 'Đang bán');
          setNgayTao(ngayTao);
          setThuongHieuId(thuongHieuId);
          setDanhMucId(danhMucId);
        })
        .catch(error => {
          console.error("Có lỗi xảy ra khi lấy sản phẩm:", error);
        });
    }
  }, [id]);

  const saveOrUpdate = (e) => {
    e.preventDefault();
    const sanPham = {
      maSanPham,
      tenSanPham,
      moTa,
      trangThai: trangThai ? true : false,
      ngayTao,
      thuongHieuId,
      danhMucId
    };

    const handleError = (error) => {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.log(error);
      };
    };

    if (id) {
      updateSanPham(id, sanPham)
        .then(() => navigate('/san-pham'))
        .catch(handleError);
    } else {
      createSanPham(sanPham)
        .then(() => navigate('/san-pham'))
        .catch(handleError);
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
                    className={`form-control ${errors.maSanPham ? 'is-invalid' : ''}`}
                  />
                  {errors.maSanPham && <div className='invalid-feedback'>{errors.maSanPham}</div>}
                </div>

                <div className='form-group mb-3 col-md-6'>
                  <label className='form-label'>Tên sản phẩm: </label>
                  <input
                    type='text'
                    placeholder='Nhập tên sản phẩm...'
                    name='tenSanPham'
                    value={tenSanPham}
                    onChange={(e) => setTenSanPham(e.target.value)}
                    className={`form-control ${errors.tenSanPham ? 'is-invalid' : ''}`}
                  />
                  {errors.tenSanPham && <div className='invalid-feedback'>{errors.tenSanPham}</div>}
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
                    <label className='form-check-label' htmlFor='active'>Đang bán</label>
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
                    <label className='form-check-label' htmlFor='inactive'>Ngừng bán</label>
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
                    className={`form-control ${errors.ngayTao ? 'is-invalid' : ''}`}
                  />
                  {errors.ngayTao && <div className='invalid-feedback'>{errors.ngayTao}</div>}
                </div>

                <div className='col-md-4'>
                  <label className='form-label'>Thương hiệu:</label>
                  <select
                    className={`form-select ${errors.thuongHieuId ? 'is-invalid':''}`}
                    value={thuongHieuId}
                    onChange={(e) => setThuongHieuId(e.target.value)}
                  >
                    <option value="">Chọn thương hiệu</option>
                    {th.map((thuongHieu) => (
                      <option key={thuongHieu.id} value={thuongHieu.id}>
                        {thuongHieu.tenThuongHieu}
                      </option>
                    ))}
                  </select>
                  {errors.thuongHieuId && <div className='invalid-feedback'>{errors.thuongHieuId}</div>}
                </div>

                <div className='col-md-4'>
                  <label className='form-label'>Danh mục:</label>
                  <select
                    className={`form-select ${errors.danhMucId ? 'is-invalid' : ''}`}
                    value={danhMucId}
                    onChange={(e) => setDanhMucId(e.target.value)}
                  >
                    <option value="">Chọn danh mục</option>
                    {dm.map((danhMuc) => (
                      <option key={danhMuc.id} value={danhMuc.id}>
                        {danhMuc.tenDanhMuc}
                      </option>
                    ))}
                  </select>
                  {errors.danhMucId && <div className='invalid-feedback'>{errors.danhMucId}</div>}
                </div>
              </div>

              <div className='form-group mb-3'>
                <label className='form-label'>Mô tả: </label>
                <textarea
                  rows='4'
                  placeholder='Nhập mô tả sản phẩm...'
                  value={moTa}
                  onChange={(e) => setMoTa(e.target.value)}
                  className='form-control'
                />
              </div>

              <button className='btn btn-success' onClick={saveOrUpdate}>
                {id ? "Cập nhật" : "Thêm"}
              </button>
              <button className='btn btn-danger' style={{ marginLeft: "10px" }} onClick={() => navigate('/san-pham')}>
                Quay lại
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SanPhamComponent;
