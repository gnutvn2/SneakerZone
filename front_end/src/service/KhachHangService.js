import axios from 'axios';

const API_URL = 'http://localhost:8080/khach-hang';

export const getAllKhachHang = (pageable, keyword) => {
    return axios.get(API_URL, {
        params: {
            page: pageable.page,
            size: pageable.size,
            keyword: keyword
        }
    });
};

export const createKhachHang = (khachHangRequest) => axios.post(API_URL, khachHangRequest);

export const getOneKhachHang = (khachHangId) => axios.get(`${API_URL}/${khachHangId}`);

export const updateKhachHang = (khachHangId, khachHangRequest) => 
    axios.put(`${API_URL}/${khachHangId}`, khachHangRequest);

export const deleteKhachHang = (khachHangId) => axios.delete(`${API_URL}/${khachHangId}`);