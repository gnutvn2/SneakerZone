import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSize, getOneSize, updateSize } from '../../service/SizeService';

const SizeComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [maSize, setMaSize] = useState('');
  const [tenSize, setTenSize] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      getOneSize(id).then((response) => {
        console.log(response.data);
        const { maSize, tenSize } = response.data;
        setMaSize(maSize);
        setTenSize(tenSize);
      }).catch((error) => {
        console.log("Lỗi khi lấy dữ liệu size: " + error);
      });
    }
  }, [id]);

  const saveOrUpdate = (e) => {
    e.preventDefault();

    const size = { maSize, tenSize };

    const handleError = (error) => {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.log("Lỗi: " + error);
      }
    };

    if (id) {
      updateSize(id, size).then((response) => {
        console.log("Cập nhật thành công: " + response.data.content);
        navigate('/size');
      }).catch(handleError);
    } else {
      createSize(size).then((response) => {
        console.log("Thêm thành công: " + response.data.content);
        navigate('/size');
      }).catch(handleError);
    }
  };

  return (
    <div className='container'>
      <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
          <h5 className='text-center' style={{ marginTop: "15px" }}>{id ? "Cập nhật size" : "Thêm size"}</h5>
          <div className='card-body'>
            <form>
              <div className='form-group mb-3'>
                <label className='form-label'>Mã size: </label>
                <input
                  type="text"
                  placeholder='Nhập mã size..'
                  name='maSize'
                  value={maSize}
                  className={`form-control ${errors.maSize ? "is-invalid" : ""}`}
                  onChange={(e) => setMaSize(e.target.value)}
                />
                {errors.maSize && <div className='invalid-feedback'>{errors.maSize}</div>}
              </div>
              <div className='form-group mb-3'>
                <label className='form-label'>Tên size: </label>
                <input
                  type="text"
                  placeholder='Nhập tên size..'
                  name='tenSize'
                  value={tenSize}
                  className={`form-control ${errors.tenSize ? "is-invalid" : ""}`}
                  onChange={(e) => setTenSize(e.target.value)}
                />
                {errors.tenSize && <div className='invalid-feedback'>{errors.tenSize}</div>}
              </div>
              <button className='btn btn-outline-success' onClick={saveOrUpdate}>{id ? "Cập nhật size" : "Thêm size"}</button>
              <button className='btn btn-outline-primary' style={{ marginLeft: "10px" }} onClick={() => navigate('/size')}>Quay lại</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SizeComponent;
