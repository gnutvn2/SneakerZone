import axios from 'axios';

// URL cơ bản của API
const BASE_URL = 'http://localhost:8080/chi-tiet-san-pham';

// Hàm thêm chi tiết sản phẩm
export const createChiTietSanPham = (sanPhamId, data) => {
    return axios.post(`${BASE_URL}/san-pham/${sanPhamId}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data', // Nếu bạn đang gửi dữ liệu form
        },
    });
};

// Hàm cập nhật chi tiết sản phẩm
export const updateChiTietSanPham = (sanPhamId, chiTietSanPhamId, data) => {
    return axios.put(`${BASE_URL}/san-pham/${sanPhamId}/chi-tiet/${chiTietSanPhamId}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data', // Nếu bạn đang gửi dữ liệu form
        },
    });
};

// Hàm xóa chi tiết sản phẩm
export const deleteChiTietSanPham = (sanPhamId, chiTietSanPhamId) => {
    return axios.delete(`${BASE_URL}/san-pham/${sanPhamId}/chi-tiet/${chiTietSanPhamId}`);
};

// Hàm lấy chi tiết sản phẩm
export const getChiTietSanPhamById = (sanPhamId, chiTietSanPhamId) => {
    return axios.get(`${BASE_URL}/san-pham/${sanPhamId}/chi-tiet/${chiTietSanPhamId}`);
};

// Hàm lấy danh sách chi tiết sản phẩm
export const getAllChiTietSanPhamBySanPhamId = (sanPhamId, pageable) => {
    return axios.get(`${BASE_URL}/san-pham/${sanPhamId}`, { params: pageable });
};

// Hàm tìm kiếm chi tiết sản phẩm
export const searchChiTietSanPham = (sanPhamId, keyword, pageable) => {
    return axios.get(`${BASE_URL}/search`, {
        params: { sanPhamId, keyword, ...pageable }
    });
};

export const getMauSac = () => {
    return axios.get("http://localhost:8080/mau-sac")
};
export const getSanPham = () => {
    return axios.get("http://localhost:8080/san-pham")
};
export const getSize = () => {
    return axios.get("http://localhost:8080/size")
};
export const getChatLieu = () => {
    return axios.get("http://localhost:8080/chat-lieu")
};
export const getDeGiay = () => {
    return axios.get("http://localhost:8080/de-giay")
};
