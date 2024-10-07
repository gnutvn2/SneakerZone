import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteDeGiay, listDeGiay } from '../../service/DeGiayService';

const ListDeGiay = () => {
    const [dg, setDeGiay] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 5;
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const getAllDeGiay = () => {
        listDeGiay({ page: currentPage, size: itemsPerPage }, searchQuery).then((response) => {
            setDeGiay(response.data.content);
            setTotalPages(response.data.totalPages);
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        getAllDeGiay();
    }, [currentPage, searchQuery]);

    const createDeGiay = () => {
        navigate('/add-de-giay')
    }

    const updateDeGiay = (id) => {
        navigate(`/update-de-giay/${id}`)
    }

    const removeDeGiay = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa đế giày này không ?")) {
            deleteDeGiay(id).then(() => {
                getAllDeGiay();
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    const handlerSearchInput = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(0);
    }

    return (
        <div className='container'>
            <h5>Đế giày</h5>
            <div className='card'>
                <div className='card-body'>
                    <div className="d-flex justify-content-between mb-3">
                        <button className='btn btn-success' onClick={createDeGiay}>
                            <i className="bi bi-plus-circle"></i> Thêm đế giày
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
                    {dg.length > 0 ? (
                        <table className='table table-hover'>
                            <thead>
                                <tr>
                                    <th>ID đế giày</th>
                                    <th>Mã đế giày</th>
                                    <th>Tên đế giày</th>
                                    <th>Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dg.map(deGiay =>
                                    <tr key={deGiay.id}>
                                        <td>{deGiay.id}</td>
                                        <td>{deGiay.maDeGiay}</td>
                                        <td>{deGiay.tenDeGiay}</td>
                                        <td>
                                            <button className='btn btn-info'
                                                onClick={() => updateDeGiay(deGiay.id)}>
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button
                                                className='btn btn-danger'
                                                style={{ marginLeft: '10px' }}
                                                onClick={() => removeDeGiay(deGiay.id)}>
                                                <i className='bi bi-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <p className='text-center'>Không có dữ liệu.</p>
                    )}

                    <div className='d-flex justify-content-center my-3'>
                        <button
                            className='btn btn-outline-primary me-2'
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >Pre
                        </button>
                        <span className='align-self-center'>Trang {currentPage + 1} / {totalPages}</span>
                        <button
                            className='btn btn-outline-primary ms-2'
                            disabled={currentPage + 1 >= totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >Next
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ListDeGiay;
