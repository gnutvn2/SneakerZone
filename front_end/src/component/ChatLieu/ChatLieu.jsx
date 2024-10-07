import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createChatLieu, updateChatLieu, getOneChatLieu } from '../../service/ChatLieuService';

const ChatLieu = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [maChatLieu, setMaChatLieu] = useState('');
    const [tenChatLieu, setTenChatLieu] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (id) {
            getOneChatLieu(id).then((response) => {
                const { maChatLieu, tenChatLieu } = response.data;
                setMaChatLieu(maChatLieu);
                setTenChatLieu(tenChatLieu);
            }).catch((error) => {
                console.log("Lỗi khi lấy dữ liệu chất liệu: " + error);
            });
        }
    }, [id]);

    const saveOrUpdate = (e) => {
        e.preventDefault();

        const chatLieu = { maChatLieu, tenChatLieu };

        const handlerError = (error) => {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                console.log("Lỗi: " + error);
            }
        };

        if (id) {
            updateChatLieu(id, chatLieu).then((response) => {
                console.log("Cập nhật thành công: " + response.data.content);
                navigate('/chat-lieu');
            }).catch(handlerError);
        } else {
            createChatLieu(chatLieu).then((response) => {
                console.log("Thêm thành công: " + response.data.content);
                navigate('/chat-lieu');
            }).catch(handlerError);
        }
    };

    return (
        <div className='container'>
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    <h5 className='text-center' style={{ marginTop: "15px" }}>{id ? "Cập nhật chất liệu" : "Thêm chất liệu"}</h5>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-3'>
                                <label className='form-label'>Mã chất liệu: </label>
                                <input 
                                    type="text" 
                                    placeholder='Nhập mã chất liệu..'
                                    name='maChatLieu'
                                    value={maChatLieu}
                                    className={`form-control ${errors.maChatLieu ? "is-invalid" : ""}`}
                                    onChange={(e) => setMaChatLieu(e.target.value)}
                                />
                                {errors.maChatLieu && <div className='invalid-feedback'>{errors.maChatLieu}</div>}
                            </div>
                            <div className='form-group mb-3'>
                                <label className='form-label'>Tên chất liệu: </label>
                                <input 
                                    type="text" 
                                    placeholder='Nhập tên chất liệu..'
                                    name='tenChatLieu'
                                    value={tenChatLieu}
                                    className={`form-control ${errors.tenChatLieu ? "is-invalid" : ""}`}
                                    onChange={(e) => setTenChatLieu(e.target.value)}
                                />
                                {errors.tenChatLieu && <div className='invalid-feedback'>{errors.tenChatLieu}</div>}
                            </div>
                            <button className='btn btn-outline-success' onClick={saveOrUpdate}>{id ? "Cập nhật" : "Thêm"}</button>
                            <button type="button" className='btn btn-outline-primary' style={{ marginLeft: "10px" }} onClick={() => navigate('/chat-lieu')}>Quay lại</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatLieu;
