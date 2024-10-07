import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteSize, listSize } from '../../service/SizeService';

const ListSize = () => {
    const [sizes, setSizes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 5;
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const getAllSizes = () => {
        listSize({ page: currentPage, size: itemsPerPage }, searchQuery).then((response) => {
            setSizes(response.data.content);
            setTotalPages(response.data.totalPages);
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        getAllSizes();
    }, [currentPage, searchQuery]);

    const createSize = () => {
        navigate('/add-size')
    }

    const updateSize = (id) => {
        navigate(`/update-size/${id}`)
    }

    const removeSize = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa kích thước này không?")) {
            deleteSize(id).then(() => {
                getAllSizes();
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
            <h5>Kích thước giày</h5>
            <div className='card'>
                <div className='card-body'>
                    <div className="d-flex justify-content-between mb-3">
                        <button className='btn btn-success' onClick={createSize}>
                            <i className="bi bi-plus-circle"></i> Thêm kích thước
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
                    {sizes.length > 0 ? (
                        <table className='table table-hover'>
                            <thead>
                                <tr>
                                    <th>ID kích thước</th>
                                    <th>Mã kích thước</th>
                                    <th>Tên kích thước</th>
                                    <th>Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sizes.map(size =>
                                    <tr key={size.id}>
                                        <td>{size.id}</td>
                                        <td>{size.maSize}</td>
                                        <td>{size.tenSize}</td>
                                        <td>
                                            <button className='btn btn-info'
                                                onClick={() => updateSize(size.id)}>
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button
                                                className='btn btn-danger'
                                                style={{ marginLeft: '10px' }}
                                                onClick={() => removeSize(size.id)}>
                                                <i className='bi bi-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <p className='text-center'>Không tìm thấy kết quả nào.</p>
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

export default ListSize;
