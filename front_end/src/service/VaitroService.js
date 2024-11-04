import axios from 'axios';

const API_URL = 'http://localhost:8080/vai-tro';

// Lấy tất cả vai trò
export const getAllVaiTro = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy tất cả vai trò:", error);
        throw error;
    }
};

// Tạo mới vai trò
export const createVaiTro = async (vaiTroData) => {
    try {
        const response = await axios.post(API_URL, vaiTroData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tạo mới vai trò:", error);
        throw error;
    }
};

// Lấy thông tin chi tiết một vai trò theo ID
export const getOneVaiTro = (vaiTroId) => axios.get(`${API_URL}/${vaiTroId}`);


// Cập nhật vai trò
export const updateVaiTro = async (vaiTroId, vaiTroData) => {
    try {
        const response = await axios.put(`${API_URL}/${vaiTroId}`, vaiTroData);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi cập nhật vai trò với ID: ${vaiTroId}`, error);
        throw error;
    }
};

// Xóa vai trò
export const deleteVaiTro = async (vaiTroId) => {
    try {
        const response = await axios.delete(`${API_URL}/${vaiTroId}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi xóa vai trò với ID: ${vaiTroId}`, error);
        throw error;
    }
};
