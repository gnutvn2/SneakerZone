import axios from "axios";

const apiHoaDon = 'http://localhost:8080/hoa-don';

export const listHoaDonDaThanhToan = (pageable) => {
    return axios.get(apiHoaDon, {
        params:{
            page: pageable.page,
            size: pageable.size,
            trangThai: "Đã thanh toán"
        }
    });
}

export const getHoaDonDetail = (hoaDonId) => {
    return axios.get(`${apiHoaDon}/${hoaDonId}`);
};
