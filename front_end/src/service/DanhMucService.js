import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/danh-muc'

export const listDanhMuc = (pageable) => {
    return axios.get(REST_API_BASE_URL, {
        params: { page: pageable.page, size: pageable.size }
    });
};

export const createDanhMuc = (danhMuc) => axios.post(REST_API_BASE_URL, danhMuc);
export const getDanhMuc = (danhMucId) => axios.get(REST_API_BASE_URL + '/' + danhMucId);
export const updateDanhMuc = (danhMucId, danhMuc) => axios.put(REST_API_BASE_URL + '/' + danhMucId, danhMuc);
export const deleteDanhMuc = (danhMucId) => axios.delete(REST_API_BASE_URL + '/' + danhMucId);