import axios from "axios";

const apiChiTietSanPham = "http://localhost:8080/chi-tiet-san-pham";

// Hàm lấy danh sách chi tiết sản phẩm theo ID sản phẩm
export const listChiTietSanPhamBySanPhamId = (pageable, sanPhamId) => {
    return axios.get(`${apiChiTietSanPham}/san-pham/${sanPhamId}`, {
        params: {
            page: pageable.page,
            size: pageable.size,
        },
    });
};

// Hàm lấy chi tiết sản phẩm theo ID
export const getChiTietSanPhamById = (id) => {
    return axios.get(`${apiChiTietSanPham}/${id}`);
};

// Hàm tạo chi tiết sản phẩm
export const createChiTietSanPham = (request) => {
    return axios.post(apiChiTietSanPham, request);
};

// Hàm cập nhật chi tiết sản phẩm
export const updateChiTietSanPham = (id, request) => {
    return axios.put(`${apiChiTietSanPham}/${id}`, request);
};

// Hàm xóa chi tiết sản phẩm
export const deleteChiTietSanPham = (id) => {
    return axios.delete(`${apiChiTietSanPham}/${id}`);
};

// Hàm tìm kiếm chi tiết sản phẩm
export const searchChiTietSanPham = (keyword, pageable) => {
    return axios.get(`${apiChiTietSanPham}/search`, {
        params: {
            keyword: keyword,
            page: pageable.page,
            size: pageable.size,
        },
    });
};

export const getSanPham = () => {
    return axios.get('http://localhost:8080/san-pham');
}

export const getMauSac = () => {
    return axios.get('http://localhost:8080/mau-sac');
}

export const getSize = () => {
    return axios.get('http://localhost:8080/size');
}

export const getChatLieu = () => {
    return axios.get('http://localhost:8080/chat-lieu');
}

export const getDeGiay = () => {
    return axios.get('http://localhost:8080/de-giay');
}
