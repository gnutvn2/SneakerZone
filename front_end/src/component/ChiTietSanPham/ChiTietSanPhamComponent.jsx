import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getChiTietSanPhamById,
  createChiTietSanPham,
  updateChiTietSanPham,
  getSanPham,
  getMauSac,
  getSize,
  getChatLieu,
  getDeGiay
} from '../../service/ChiTietSanPham';

const ChiTietSanPhamComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [maChiTietSanPham, setMaChiTietSanPham] = useState('');
  const [tenChiTietSanPham, setTenChiTietSanPham] = useState('');
  const [hinhAnh, setHinhAnh] = useState('');
  const [soLuongTon, setSoLuongTon] = useState('');
  const [gia, setGia] = useState('');
  const [sanPhamId, setSanPhamId] = useState('');
  const [mauSacId, setMauSacId] = useState('');
  const [sizeId, setSizeId] = useState('');
  const [chatLieuId, setChatLieuId] = useState('');
  const [deGiayId, setDeGiayId] = useState('');
  const [trangThai, setTrangThai] = useState(true);

  const [sanPham, setSanPham] = useState([]);
  const [mauSac, setMauSac] = useState([]);
  const [size, setSize] = useState([]);
  const [chatLieu, setChatLieu] = useState([]);
  const [deGiay, setDeGiay] = useState([]);

  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (id) {
      getChiTietSanPhamById(id).then((response) => {
        const chiTietSanPham = response.data;
        setMaChiTietSanPham(chiTietSanPham.maChiTietSanPham);
        setTenChiTietSanPham(chiTietSanPham.tenChiTietSanPham);
        setHinhAnh(chiTietSanPham.hinhAnh);
        setSoLuongTon(chiTietSanPham.soLuongTon);
        setGia(chiTietSanPham.gia);
        setSanPhamId(chiTietSanPham.sanPhamId);
        setMauSacId(chiTietSanPham.mauSacId);
        setSizeId(chiTietSanPham.sizeId);
        setChatLieuId(chiTietSanPham.chatLieuId);
        setDeGiayId(chiTietSanPham.deGiayId);
        setTrangThai(trangThai === 'Còn hàng')
      });
    }

    getSanPham().then((res) => setSanPham(res.data.content));
    getMauSac().then((res) => setMauSac(res.data.content));
    getSize().then((res) => setSize(res.data.content));
    getChatLieu().then((res) => setChatLieu(res.data.content));
    getDeGiay().then((res) => setDeGiay(res.data.content));
  }, [id]);

  // Xử lý form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tải hình ảnh lên Cloudinary trước nếu có file được chọn
    let uploadedImageUrl = hinhAnh;
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default'); // Thay đổi upload preset của bạn nếu cần

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dr9bd58dz/image/upload`,
          formData
        );
        uploadedImageUrl = response.data.secure_url;
      } catch (error) {
        console.error('Upload image failed:', error);
        return;
      }
    }

    const chiTietSanPhamRequest = {
      maChiTietSanPham,
      tenChiTietSanPham,
      hinhAnh: uploadedImageUrl, // Sử dụng URL của hình ảnh đã upload
      soLuongTon,
      gia,
      sanPhamId,
      mauSacId,
      sizeId,
      chatLieuId,
      deGiayId,
      trangThai: trangThai ? true : false
    };

    if (id) {
      updateChiTietSanPham(id, chiTietSanPhamRequest)
        .then(() => {
          navigate('/san-pham');
        })
        .catch((error) => {
          setErrors(error.response.data.errors);
        });
    } else {
      createChiTietSanPham(chiTietSanPhamRequest)
        .then(() => {
          navigate('/san-pham');
        })
        .catch((error) => {
          setErrors(error.response.data.errors);
        });
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
          <h5 className='text-center mt-4'>{id ? "Cập nhật chi tiết sản phẩm" : "Thêm chi tiết sản phẩm"}</h5>
          <div className='card-body'>
            <form onSubmit={handleSubmit}>
              <div className='row mb-3'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='form-label'>Mã chi tiết sản phẩm: </label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Nhập mã chi tiết sản phẩm...'
                      value={maChiTietSanPham}
                      onChange={(e) => setMaChiTietSanPham(e.target.value)}
                      readOnly={id ? true : false} // Không cho sửa nếu đang cập nhật
                    />
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='form-label'>Tên chi tiết sản phẩm: </label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Nhập tên chi tiết sản phẩm...'
                      value={tenChiTietSanPham}
                      onChange={(e) => setTenChiTietSanPham(e.target.value)}
                    />
                    {errors.tenChiTietSanPham && <small className='text-danger'>{errors.tenChiTietSanPham}</small>}
                  </div>
                </div>
              </div>

              <div className='form-group col-md-8 mb-3'>
                <label className='form-label'>Hình ảnh:</label>
                <input
                  type='file'
                  className='form-control'
                  onChange={handleFileChange}
                />
                {hinhAnh && (
                  <div className='mt-2'>
                    <img src={hinhAnh} alt='Preview' style={{ width: '100px' }} />
                  </div>
                )}
              </div>

              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-group mb-3'>
                    <label className='form-label'>Số lượng tồn:</label>
                    <input
                      type='number'
                      className='form-control'
                      placeholder='Nhập số lượng...'
                      value={soLuongTon}
                      onChange={(e) => setSoLuongTon(e.target.value)}
                    />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group mb-3'>
                    <label className='form-label'>Giá:</label>
                    <input
                      type='number'
                      className='form-control'
                      placeholder='Nhập giá bán...'
                      value={gia}
                      onChange={(e) => setGia(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className='row mb-3'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='form-label'>Sản phẩm:</label>
                    <select
                      className='form-control'
                      value={sanPhamId}
                      onChange={(e) => setSanPhamId(e.target.value)}
                    >
                      <option value=''>Chọn sản phẩm</option>
                      {sanPham.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.tenSanPham}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='form-label'>Màu sắc:</label>
                    <select
                      className='form-control'
                      value={mauSacId}
                      onChange={(e) => setMauSacId(e.target.value)}
                    >
                      <option value=''>Chọn màu sắc</option>
                      {mauSac.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.tenMauSac}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className='row mb-3'>
                <div className='col-md-4'>
                  <div className='form-group'>
                    <label className='form-label'>Kích cỡ:</label>
                    <select
                      className='form-control'
                      value={sizeId}
                      onChange={(e) => setSizeId(e.target.value)}
                    >
                      <option value=''>Chọn kích cỡ</option>
                      {size.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.tenSize}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='col-md-4'>
                  <div className='form-group'>
                    <label className='form-label'>Chất liệu:</label>
                    <select
                      className='form-control'
                      value={chatLieuId}
                      onChange={(e) => setChatLieuId(e.target.value)}
                    >
                      <option value=''>Chọn chất liệu</option>
                      {chatLieu.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.tenChatLieu}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='col-md-4'>
                  <div className='form-group'>
                    <label className='form-label'>Đế giày:</label>
                    <select
                      className='form-control'
                      value={deGiayId}
                      onChange={(e) => setDeGiayId(e.target.value)}
                    >
                      <option value=''>Chọn đế giày</option>
                      {deGiay.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.tenDeGiay}
                        </option>
                      ))}
                    </select>
                  </div>
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
                    <label className='form-check-label' htmlFor='active'>Còn hàng</label>
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
                    <label className='form-check-label' htmlFor='inactive'>Hết hàng</label>
                  </div>
                </div>
              </div>

              <button type='submit' className='btn btn-primary'>
                {id ? "Cập nhật" : "Thêm mới"}
              </button>
              {/* <button
                type='button'
                className='btn btn-secondary ms-2'
                onClick={() => navigate('/san-pham/:id')}
              >
                Hủy
              </button> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChiTietSanPhamComponent;
