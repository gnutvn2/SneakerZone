import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createDeGiay, getOneDeGiay, updateDeGiay } from '../../service/DeGiayService';

const DeGiayComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [maDeGiay, setMaDeGiay] = useState('');
  const [tenDeGiay, setTenDeGiay] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      getOneDeGiay(id).then((response) => {
        const { maDeGiay, tenDeGiay } = response.data;
        setMaDeGiay(maDeGiay);
        setTenDeGiay(tenDeGiay);
      }).catch((error) => {
        console.log("Lỗi khi lấy dữ liệu đế giày: " + error);
      });
    }
  }, [id]);

  const saveOrUpdate = (e) => {
    e.preventDefault();

    const deGiay = { maDeGiay, tenDeGiay };

    const handleError = (error) => {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.log("Lỗi: " + error);
      }
    };

    if (id) {
      updateDeGiay(id, deGiay).then((response) => {
        console.log("Cập nhật thành công: " + response.data.content);
        navigate('/de-giay');
      }).catch(handleError);
    } else {
      createDeGiay(deGiay).then((response) => {
        console.log("Thêm thành công: " + response.data.content);
        navigate('/de-giay');
      }).catch(handleError);
    }
  };

  return (
    <div className='container'>
      <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
          <h5 className='text-center' style={{ marginTop: "15px" }}>{id ? "Cập nhật đế giày" : "Thêm đế giày"}</h5>
          <div className='card-body'>
            <form>
              <div className='form-group mb-3'>
                <label className='form-label'>Mã đế giày: </label>
                <input
                  type="text"
                  placeholder='Nhập mã đế giày..'
                  name='maDeGiay'
                  value={maDeGiay}
                  className={`form-control ${errors.maDeGiay ? "is-invalid" : ""}`}
                  onChange={(e) => setMaDeGiay(e.target.value)}
                />
                {errors.maDeGiay && <div className='invalid-feedback'>{errors.maDeGiay}</div>}
              </div>
              <div className='form-group mb-3'>
                <label className='form-label'>Tên đế giày: </label>
                <input
                  type="text"
                  placeholder='Nhập tên đế giày..'
                  name='tenDeGiay'
                  value={tenDeGiay}
                  className={`form-control ${errors.tenDeGiay ? "is-invalid" : ""}`}
                  onChange={(e) => setTenDeGiay(e.target.value)}
                />
                {errors.tenDeGiay && <div className='invalid-feedback'>{errors.tenDeGiay}</div>}
              </div>
              <button className='btn btn-outline-success' onClick={saveOrUpdate}>{id ? "Cập nhật đế giày" : " Thêm đế giày"}</button>
              <button className='btn btn-outline-primary' style={{ marginLeft: "10px" }} onClick={() => navigate('/de-giay')}>Quay lại</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeGiayComponent;
