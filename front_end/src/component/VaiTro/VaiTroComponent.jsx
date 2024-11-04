import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createVaiTro, getOneVaiTro, updateVaiTro } from '../../service/VaitroService';

const VaiTroComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [maVaiTro, setMaVaiTro] = useState('');
  const [tenVaiTro, setTenVaiTro] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      getOneVaiTro(id).then((response) => {
        const { maVaiTro, tenVaiTro } = response.data;
        setMaVaiTro(maVaiTro);
        setTenVaiTro(tenVaiTro);
      }).catch(error => {
        console.log(error);
      });
    }
  }, [id]);

  const saveOrUpdate = (e) => {
    e.preventDefault();

    const vaiTro = { maVaiTro, tenVaiTro };

    const handleError = (error) => {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.log("Lỗi: " + error);
      }
    };

    if (id) {
      updateVaiTro(id, vaiTro).then((response) => {
        console.log("Cập nhật thành công: " + response.data);
        navigate('/vai-tro');
      }).catch(handleError);
    } else {
      createVaiTro(vaiTro).then((response) => {
        console.log("Thêm thành công: " + response.data);
        navigate('/vai-tro')
      }).catch(handleError)
    }
  };

  return (
    <div className='container h-100'>
      <div className='row h-100 justify-content-center align-items-center'>
        <div className='card col-md-6'>
          <h5 className='text-center' style={{ marginTop: "15px" }}>{id ? "Cập nhật vai trò" : "Thêm vai trò"}</h5>
          <div className='card-body'>
            <form>
              <div className='form-group mb-3'>
                <label className='form-label'>Mã vai trò: </label>
                <input
                  type="text"
                  placeholder='Nhập mã vai trò..'
                  name='maVaiTro'
                  value={maVaiTro}
                  className={`form-control ${errors.maVaiTro ? "is-invalid" : ""}`}
                  onChange={(e) => setMaVaiTro(e.target.value)}
                />
                {errors.maVaiTro && <div className='invalid-feedback'>{errors.maVaiTro}</div>}
              </div>
              <div className='form-group mb-3'>
                <label className='form-label'>Tên vai trò: </label>
                <input
                  type="text"
                  placeholder='Nhập tên vai trò..'
                  name='tenVaiTro'
                  value={tenVaiTro}
                  className={`form-control ${errors.tenVaiTro ? "is-invalid" : ""}`}
                  onChange={(e) => setTenVaiTro(e.target.value)}
                />
                {errors.tenVaiTro && <div className='invalid-feedback'>{errors.tenVaiTro}</div>}
              </div>
              <button className='btn btn-outline-success' onClick={saveOrUpdate}>{id ? "Cập nhật" : "Thêm"}</button>
              <button className='btn btn-outline-primary' style={{ marginLeft: "10px" }} onClick={() => navigate('/vai-tro')}>Quay lại</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaiTroComponent;
