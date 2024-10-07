import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createMauSac, getOneMauSac, updateMauSac } from '../../service/MauSacService';

const MauSac = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [maMauSac, setMaMauSac] = useState('');
    const [tenMauSac, setTenMauSac] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (id) {
            getOneMauSac(id).then((response) => {
                const { maMauSac, tenMauSac } = response.data;
                setMaMauSac(maMauSac);
                setTenMauSac(tenMauSac);
            }).catch((error) => {
                console.log("Loi khi lay du lieu mau sac: " + error);
            })
        }
    }, [id]);

    const saveOrUpdate = (e) => {
        e.preventDefault();

        const mauSac = { maMauSac, tenMauSac };

        const handlerError = (error) => {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                console.log("Loi: " +error);
            }
        }

        if (id) {
            updateMauSac(id, mauSac).then((response) => {
                console.log("Cap nhat thanh cong: " + response.data.content)
                navigate('/mau-sac');
            }).catch(handlerError);
        } else {
            createMauSac(mauSac).then((response) => {
                console.log("Them thanh cong: " + response.data.content);
                navigate('/mau-sac');
            }).catch(handlerError);
        }
    }

    return (
        <div className='container'>
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    <h5 className='text-center' style={{ marginTop: "15px" }}>{id ? "Cập nhật màu sắc" : "Thêm màu sắc"}</h5>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-3'>
                                <label className='form-label'>Mã màu sắc: </label>
                                <input 
                                    type="text" 
                                    placeholder='Nhập mã màu sắc..'
                                    name='maMauSac'
                                    value={maMauSac}
                                    className={`form-control ${errors.maMauSac ? "is-invalid" :""}`}
                                    onChange={(e) => setMaMauSac(e.target.value)}
                                />
                                {errors.maMauSac && <div className='invalid-feedback'>{errors.maMauSac}</div>}
                            </div>
                            <div className='form-group mb-3'>
                                <label className='form-label'>Tên màu sắc: </label>
                                <input 
                                    type="text" 
                                    placeholder='Nhập tên màu sắc..'
                                    name='tenMauSac'
                                    value={tenMauSac}
                                    className={`form-control ${errors.tenMauSac ? "is-invalid" :""}`}
                                    onChange={(e) => setTenMauSac(e.target.value)}
                                />
                                {errors.tenMauSac && <div className='invalid-feedback'>{errors.tenMauSac}</div>}
                            </div>
                            <button className='btn btn-outline-success' onClick={saveOrUpdate}>{id ? "Cập nhật màu sắc" : " Thêm màu sắc"}</button>
                            <button className='btn btn-outline-primary' style={{marginLeft: "10px"}} onClick={() => navigate('/mau-sac')}>Quay lại</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MauSac