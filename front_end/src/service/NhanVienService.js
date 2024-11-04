import axios from 'axios';

const API_URL = 'http://localhost:8080/nhan-vien';
const apiVaiTro = 'http://localhost:8080/vai-tro';

// Lấy danh sách nhân viên
export const getAllNhanVien = async (trangThai) => {
    const response = await axios.get(API_URL, {
        params: {
            trangThai: trangThai
        }
    });
    return response.data;
};

// Tạo mới nhân viên
export const createNhanVien = (nhanVienRequest) => axios.post(API_URL, nhanVienRequest);


// Lấy thông tin một nhân viên theo ID
export const getOneNhanVien = (nhanVienId) => axios.get(`${API_URL}/${nhanVienId}`);


// Cập nhật thông tin nhân viên
export const updateNhanVien = async (nhanVienId, nhanVienRequest) => {
    const response = await axios.put(`${API_URL}/${nhanVienId}`, nhanVienRequest);
    return response.data;
};

// Thay đổi trạng thái nhân viên
export const changeStatus = async (nhanVienId) => {
    const response = await axios.put(`${API_URL}/changeStatus/${nhanVienId}`);
    return response.data;
};

export const getVaiTro = () => {
    return axios.get(apiVaiTro);
};