import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getChiTietSanPhamById,
  createChiTietSanPham,
  updateChiTietSanPham,
  getMauSac,
  getSize,
  getChatLieu,
  getDeGiay
} from '../../service/ChiTietSanPham';

const ChiTietSanPhamComponent = () => {
  const { chiTietSanPhamId, sanPhamId } = useParams();
  const navigate = useNavigate();

  // Khởi tạo state cho các trường dữ liệu
  const [formData, setFormData] = useState({
    maChiTietSanPham: '',
    tenChiTietSanPham: '',
    hinhAnh: '',
    soLuongTon: '',
    gia: '',
    sanPhamId: sanPhamId || '',
    mauSacId: '',
    sizeId: '',
    chatLieuId: '',
    deGiayId: '',
    trangThai: true,
  });

  const [mauSac, setMauSac] = useState([]);
  const [size, setSize] = useState([]);
  const [chatLieu, setChatLieu] = useState([]);
  const [deGiay, setDeGiay] = useState([]);

  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (chiTietSanPhamId) {
      getChiTietSanPhamById(sanPhamId, chiTietSanPhamId)
        .then((response) => {
          const chiTietSanPham = response.data;
          setFormData({
            ...formData,
            maChiTietSanPham: chiTietSanPham.maChiTietSanPham,
            tenChiTietSanPham: chiTietSanPham.tenChiTietSanPham,
            hinhAnh: chiTietSanPham.hinhAnh,
            soLuongTon: chiTietSanPham.soLuongTon,
            gia: chiTietSanPham.gia,
            sanPhamId: chiTietSanPham.sanPhamId || sanPhamId,
            mauSacId: chiTietSanPham.mauSacId,
            sizeId: chiTietSanPham.sizeId,
            chatLieuId: chiTietSanPham.chatLieuId,
            deGiayId: chiTietSanPham.deGiayId,
            trangThai: chiTietSanPham.trangThai,
          });
        })
        .catch((error) => {
          console.error('Lỗi khi lấy thông tin chi tiết sản phẩm:', error);
        });
    }

    getMauSac().then((res) => setMauSac(res.data.content));
    getSize().then((res) => setSize(res.data.content));
    getChatLieu().then((res) => setChatLieu(res.data.content));
    getDeGiay().then((res) => setDeGiay(res.data.content));
  }, [sanPhamId, chiTietSanPhamId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
    } else {
      alert('Vui lòng chọn một tệp hình ảnh hợp lệ.');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append các trường vào FormData nhưng chỉ append nếu giá trị hợp lệ
    for (const key in formData) {
      if (formData[key] !== '' && formData[key] !== null && formData[key] !== undefined) {
        formDataToSend.append(key, formData[key]);
      }
    }

    if (!file && !formData.hinhAnh) {
      setErrors(prevErrors => ({
        ...prevErrors,
        hinhAnh: 'Vui lòng chọn hình ảnh.'
      }));
      return;
    }

    // Kiểm tra nếu không có file mới được chọn thì không gửi ảnh
    if (file) {
      formDataToSend.append('hinhAnh', file);
    }

    let apiCall;

    if (chiTietSanPhamId) {
      apiCall = () => updateChiTietSanPham(formData.sanPhamId, chiTietSanPhamId, formDataToSend);
    } else {
      apiCall = () => createChiTietSanPham(formData.sanPhamId, formDataToSend);
    }

    try {
      await apiCall();
      navigate('/san-pham');
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.error('Lỗi khác:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBack = () => {
    navigate(`/san-pham/${formData.sanPhamId}`)
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='card col-md-8 offset-md-2 mt-4 mb-5'>
          <h5 className='text-center mt-4'>
            {chiTietSanPhamId ? 'Cập nhật chi tiết sản phẩm' : 'Thêm chi tiết sản phẩm'}
          </h5>
          <div className='card-body'>
            <form onSubmit={handleSubmit}>
              <div className='row mb-3'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='form-label'>Mã chi tiết sản phẩm:</label>
                    <input
                      type='text'
                      className={`form-control ${errors.maChiTietSanPham ? 'is-invalid' : ''}`}
                      placeholder='Nhập mã chi tiết sản phẩm...'
                      value={formData.maChiTietSanPham}
                      onChange={handleChange}
                      name="maChiTietSanPham"
                    />
                    {errors.maChiTietSanPham && <div className='invalid-feedback'>{errors.maChiTietSanPham}</div>}
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='form-label'>Tên chi tiết sản phẩm:</label>
                    <input
                      type='text'
                      className={`form-control ${errors.tenChiTietSanPham ? 'is-invalid' : ''}`}
                      placeholder='Nhập tên chi tiết sản phẩm...'
                      value={formData.tenChiTietSanPham}
                      onChange={handleChange}
                      name="tenChiTietSanPham"
                    />
                    {errors.tenChiTietSanPham &&
                      <div className='invalid-feedback'>{errors.tenChiTietSanPham}</div>
                    }
                  </div>
                </div>
              </div>

              <div className='form-group mb-3 col-md-7'>
                <label className='form-label'>Hình ảnh:</label>
                <input
                  type='file'
                  className={`form-control ${errors.hinhAnh ? 'is-invalid' : ''}`}
                  onChange={handleFileChange}
                />
                {formData.hinhAnh && (
                  <div className='mt-2'>
                    <img src={formData.hinhAnh} alt='Preview' style={{ width: '100px' }} />
                  </div>
                )}
                {!file && !formData.hinhAnh && <div className='invalid-feedback'>Vui lòng chọn hình ảnh.</div>}
              </div>

              <div className='row mb-3'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='form-label'>Số lượng tồn:</label>
                    <input
                      type='number'
                      className={`form-control ${errors.soLuongTon ? 'is-invalid' : ''}`}
                      placeholder='Nhập số lượng...'
                      value={formData.soLuongTon}
                      onChange={handleChange}
                      name="soLuongTon"
                    />
                    {errors.soLuongTon && <div className='invalid-feedback'>{errors.soLuongTon}</div>}
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='form-label'>Giá:</label>
                    <input
                      type='number'
                      className={`form-control ${errors.gia ? 'is-invalid' : ''}`}
                      placeholder='Nhập giá...'
                      value={formData.gia}
                      onChange={handleChange}
                      name="gia"
                    />
                    {errors.gia && <div className='invalid-feedback'>{errors.gia}</div>}
                  </div>
                </div>
              </div>

              <div className='row mb-3'>
                <div className='col-md-6'>
                  <label className='form-label'>Màu sắc:</label>
                  <select
                    className={`form-control ${errors.mauSacId ? 'is-invalid' : ''}`}
                    name='mauSacId'
                    value={formData.mauSacId}
                    onChange={handleChange}
                  >
                    <option value=''>Chọn màu sắc</option>
                    {mauSac.map((mauSacItem) => (
                      <option key={mauSacItem.id} value={mauSacItem.id}>
                        {mauSacItem.tenMauSac}
                      </option>
                    ))}
                  </select>
                  {errors.mauSacId && <div className='invalid-feedback'>{errors.mauSacId}</div>}
                </div>

                <div className='col-md-6'>
                  <label className='form-label'>Kích thước:</label>
                  <select
                    className={`form-control ${errors.sizeId ? 'is-invalid' : ''}`}
                    name='sizeId'
                    value={formData.sizeId}
                    onChange={handleChange}
                  >
                    <option value=''>Chọn kích thước</option>
                    {size.map((sizeItem) => (
                      <option key={sizeItem.id} value={sizeItem.id}>
                        {sizeItem.tenSize}
                      </option>
                    ))}
                  </select>
                  {errors.sizeId && <div className='invalid-feedback'>{errors.sizeId}</div>}
                </div>
              </div>

              <div className='row mb-3'>
                <div className='col-md-6'>
                  <label className='form-label'>Chất liệu:</label>
                  <select
                    className={`form-control ${errors.chatLieuId ? 'is-invalid' : ''}`}
                    name='chatLieuId'
                    value={formData.chatLieuId}
                    onChange={handleChange}
                  >
                    <option value=''>Chọn chất liệu</option>
                    {chatLieu.map((chatLieuItem) => (
                      <option key={chatLieuItem.id} value={chatLieuItem.id}>
                        {chatLieuItem.tenChatLieu}
                      </option>
                    ))}
                  </select>
                  {errors.chatLieuId && <div className='invalid-feedback'>{errors.chatLieuId}</div>}
                </div>

                <div className='col-md-6'>
                  <label className='form-label'>Đế giày:</label>
                  <select
                    className={`form-control ${errors.deGiayId ? 'is-invalid' : ''}`}
                    name='deGiayId'
                    value={formData.deGiayId}
                    onChange={handleChange}
                  >
                    <option value=''>Chọn đế giày</option>
                    {deGiay.map((deGiayItem) => (
                      <option key={deGiayItem.id} value={deGiayItem.id}>
                        {deGiayItem.tenDeGiay}
                      </option>
                    ))}
                  </select>
                  {errors.deGiayId && <div className='invalid-feedback'>{errors.deGiayId}</div>}
                </div>
              </div>

              <div className='row mb-3'>
                <div className='col-md-6'>
                  <label className='form-label'>Trạng thái:</label>
                  <div className='form-check form-check-inline ms-3'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='trangThai'
                      id='trangThaiConHang'
                      value='true'
                      checked={formData.trangThai === true}
                      onChange={() => setFormData({ ...formData, trangThai: true })}
                    />
                    <label className='form-check-label' htmlFor='trangThaiConHang'>
                      Còn hàng
                    </label>
                  </div>
                  <div className='form-check form-check-inline ms-3'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='trangThai'
                      id='trangThaiHetHang'
                      value='false'
                      checked={formData.trangThai === false}
                      onChange={() => setFormData({ ...formData, trangThai: false })}
                    />
                    <label className='form-check-label' htmlFor='trangThaiHetHang'>
                      Hết hàng
                    </label>
                  </div>
                </div>
              </div>

              <button type='submit' className='btn btn-outline-success'>
                {chiTietSanPhamId ? 'Cập nhật' : 'Thêm mới'}
              </button>
              <button 
                className='btn btn-outline-primary ms-2'
                onClick={handleBack}
              >Quay lại</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChiTietSanPhamComponent;
