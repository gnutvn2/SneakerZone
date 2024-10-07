import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteChatLieu, listChatLieu } from '../../service/ChatLieuService';

const ListChatLieu = () => {
    const [cl, setChatLieu] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 5;
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const getAllChatLieu = () => {
        listChatLieu({ page: currentPage, size: itemsPerPage }, searchQuery)
            .then((response) => {
                console.log(response.data); // Log phản hồi để kiểm tra
                setChatLieu(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getAllChatLieu();
    }, [currentPage, searchQuery]);

    const createChatLieu = () => {
        navigate('/add-chat-lieu');
    };

    const updateChatLieu = (id) => {
        navigate(`/update-chat-lieu/${id}`);
    };

    const removeChatLieu = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa chất liệu này không?")) {
            deleteChatLieu(id)
                .then(() => {
                    getAllChatLieu();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handlerSearchInput = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(0);
    };

    return (
        <div className='container'>
            <h5>Chất liệu</h5>
            <div className='card'>
                <div className='card-body'>
                    <div className="d-flex justify-content-between mb-3">
                        <button className='btn btn-success' onClick={createChatLieu}>
                            <i className="bi bi-plus-circle"></i> Thêm chất liệu
                        </button>
                        <div>
                            <input
                                type="text"
                                placeholder='Tìm kiếm...'
                                className='form-control'
                                value={searchQuery}
                                onChange={handlerSearchInput}
                            />
                        </div>
                    </div>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th>ID chất liệu</th>
                                <th>Mã chất liệu</th>
                                <th>Tên chất liệu</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cl.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center">Không có dữ liệu.</td>
                                </tr>
                            ) : (
                                cl.map(chatLieu => (
                                    <tr key={chatLieu.id}>
                                        <td>{chatLieu.id}</td>
                                        <td>{chatLieu.maChatLieu}</td>
                                        <td>{chatLieu.tenChatLieu}</td>
                                        <td>
                                            <button className='btn btn-info' onClick={() => updateChatLieu(chatLieu.id)}>
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button
                                                className='btn btn-danger'
                                                style={{ marginLeft: '10px' }}
                                                onClick={() => removeChatLieu(chatLieu.id)}>
                                                <i className='bi bi-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    <div className='d-flex justify-content-center my-3'>
                        <button
                            className='btn btn-outline-primary me-2'
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(currentPage - 1)}>
                            Pre
                        </button>
                        <span className='align-self-center'>
                            Trang {currentPage + 1} / {totalPages}
                        </span>
                        <button
                            className='btn btn-outline-primary ms-2'
                            disabled={currentPage + 1 >= totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListChatLieu;
