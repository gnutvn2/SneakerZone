import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createDanhMuc, getDanhMuc, updateDanhMuc } from '../../service/DanhMucService';

const DanhMucComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [maDanhMuc, setMaDanhMuc] = useState('');
    const [tenDanhMuc, setTenDanhMuc] = useState('');
    const [errors, setErrors] = useState({}); // Trạng thái lỗi từ backend

    useEffect(() => {
        if (id) {
            getDanhMuc(id).then((response) => {
                setMaDanhMuc(response.data.maDanhMuc);
                setTenDanhMuc(response.data.tenDanhMuc);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    // Tiêu đề trang
    function pageTitle() {
        return <h5 className='text-center' style={{ marginTop: "15px" }}>{id ? 'Cập nhật danh mục' : 'Thêm danh mục'}</h5>;
    }

    // Xử lý khi người dùng nhập mã danh mục
    function handleMaDanhMuc(e) {
        setMaDanhMuc(e.target.value);
    }

    // Xử lý khi người dùng nhập tên danh mục
    function handleTenDanhMuc(e) {
        setTenDanhMuc(e.target.value);
    }

    // Lưu hoặc cập nhật danh mục
    function saveOrUpdateDanhMuc(e) {
        e.preventDefault();
        const danhMuc = { maDanhMuc, tenDanhMuc };

        const handleError = (error) => {
            if (error.response && error.response.data) {
                // Gán lỗi từ backend vào state errors
                setErrors(error.response.data);
            } else {
                console.error(error);
            }
        };

        if (id) {
            updateDanhMuc(id, danhMuc).then(() => {
                navigate('/danh-muc');
            }).catch(handleError);
        } else {
            createDanhMuc(danhMuc).then(() => {
                navigate('/danh-muc');
            }).catch(handleError);
        }
    }

    return (
        <div className='container'>
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-3'>
                                <label className='form-label'>Mã danh mục: </label>
                                <input
                                    type="text"
                                    placeholder='Nhập mã danh mục!'
                                    name='maDanhMuc'
                                    value={maDanhMuc}
                                    className={`form-control ${errors.maDanhMuc ? 'is-invalid' : ''}`}
                                    onChange={handleMaDanhMuc}
                                />
                                {/* Hiển thị lỗi dưới input */}
                                {errors.maDanhMuc && <div className='invalid-feedback'>{errors.maDanhMuc}</div>}
                            </div>

                            <div className='form-group mb-3'>
                                <label className='form-label'>Tên danh mục: </label>
                                <input
                                    type="text"
                                    placeholder='Nhập tên danh mục!'
                                    name='tenDanhMuc'
                                    value={tenDanhMuc}
                                    className={`form-control ${errors.tenDanhMuc ? 'is-invalid' : ''}`}
                                    onChange={handleTenDanhMuc}
                                />
                                {/* Hiển thị lỗi dưới input */}
                                {errors.tenDanhMuc && <div className='invalid-feedback'>{errors.tenDanhMuc}</div>}
                            </div>



                            <button className='btn btn-success' onClick={saveOrUpdateDanhMuc}>Lưu</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DanhMucComponent;
