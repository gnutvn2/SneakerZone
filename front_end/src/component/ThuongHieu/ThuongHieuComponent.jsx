import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createThuongHieu, getThuongHieu, updateThuongHieu } from '../../service/ThuongHieuService'

const ThuongHieuComponent = () => {
  const { id } = useParams();
  const navigator = useNavigate();

  const [maThuongHieu, setMaThuongHieu] = useState('');
  const [tenThuongHieu, setTenThuongHieu] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      getThuongHieu(id).then((response) => {
          setMaThuongHieu(response.data.maThuongHieu);
          setTenThuongHieu(response.data.tenThuongHieu);
        }).catch(error => {
          console.log(error);
        });
    }
  }, [id]);

  function pageTietle() {
    return <h5 className='text-center' style={{ marginTop: "15px" }}>{id ? "Cập nhật thương hiệu" : "Thêm thương hiệu"}</h5>
  }

  function handleMaThuongHieu(e) {
    setMaThuongHieu(e.target.value);
  }

  function handleTenThuongHieu(e) {
    setTenThuongHieu(e.target.value);
  }

  function saveOrUpdate(e) {
    e.preventDefault();
    const thuongHieu = { maThuongHieu, tenThuongHieu };

    const handleError = (error) => {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.error(error);
      }
    };

    if (id) {
      updateThuongHieu(id, thuongHieu).then(() => {
        navigator('/thuong-hieu')
      }).catch(handleError);
    } else {
      createThuongHieu(thuongHieu).then(() => {
        navigator('/thuong-hieu')
      }).catch(handleError);
    }
  }

  return (
    <div className='container'>
      <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
          {pageTietle()}
          <div className='card-body'>
            <form>
              <div className='form-group mb-3'>
                <label className='form-label'>Mã thương hiệu: </label>
                <input
                  type="text"
                  placeholder='Nhập tên thương hiệu!'
                  name='maThuongHieu'
                  value={maThuongHieu}
                  className={`form-control ${errors.maThuongHieu ? 'is-invalid' : ''}`}
                  onChange={handleMaThuongHieu}
                />
                {errors.maThuongHieu && <div className='invalid-feedback'>{errors.maThuongHieu}</div>}
              </div>

              <div className='form-group mb-3'>
                <label className='form-label'>Tên thương hiệu: </label>
                <input
                  type="text"
                  placeholder='Nhập tên thương hiệu'
                  name='tenThuongHieu'
                  value={tenThuongHieu}
                  className={`form-control ${errors.tenThuongHieu ? 'is-invalid' : ''}`}
                  onChange={handleTenThuongHieu}
                />
                {errors.tenThuongHieu && <div className='invalid-feedback'>{errors.tenThuongHieu}</div>}
              </div>
              <button className='btn btn-success' onClick={saveOrUpdate}>Lưu</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThuongHieuComponent