import axios from "axios";

export const apiChiTietSanPham = 'http://localhost:8080/chi-tiet-san-pham';

export const listChiTietSanPham = (pageable) => {
    return axios.get(apiChiTietSanPham, {
        params: {
            page: pageable.page,
            size: pageable.size,
        },
    });
};

export const getChiTietSanPhamById = (id) => {
    return axios.get(`${apiChiTietSanPham}/${id}`);
};

export const createChiTietSanPham = (request) => {
    return axios.post(apiChiTietSanPham, request);
};

export const updateChiTietSanPham = (id, request) => {
    return axios.put(`${apiChiTietSanPham}/${id}`, request);
};

export const deleteChiTietSanPham = (id) => {
    return axios.delete(`${apiChiTietSanPham}/${id}`);
};

export const searchChiTietSanPham = (keyword, pageable) => {
    return axios.get(`${apiChiTietSanPham}/search`, {
        params: {
            keyword,
            page: pageable.page,
            size: pageable.size,
        },
    });
};

export const filterChiTietSanPham = (filters, pageable) => {
    return axios.get(`${apiChiTietSanPham}/filter`, {
        params: {
            ...filters,
            page: pageable.page,
            size: pageable.size,
        },
    });
};
