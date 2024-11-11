import axios from "axios";

const apiHoaDon = 'http://localhost:8080/hoa-don';
const apiChiTietHoaDon = 'http://localhost:8080/chi-tiet-hoa-don';
const apiChiTietSanPham = 'http://localhost:8080/chi-tiet-san-pham';

export const createHoaDon = (hoaDon) => axios.post(apiHoaDon, hoaDon);
export const updateHoaDon = (hoaDonId, hoaDon) => {
    return axios.put(`${apiHoaDon}/${hoaDonId}`, hoaDon);
};
export const deleteHoaDon = (hoaDonId) => axios.delete(`${apiHoaDon}/${hoaDonId}`);

export const listChiTietSanPham = (pageable, keyword, trangThai) => {
    return axios.get(apiChiTietSanPham, {
        params:{
            page: pageable.page,
            size: pageable.size,
            keyword,
            trangThai
        }
    });
}

export const listChiTietHoaDonByHoaDonId = (hoaDonId) => {
    return axios.get(`${apiChiTietHoaDon}/hoa-don/${hoaDonId}`);
};

export const createChiTietHoaDon = (hoaDonId, chiTietHoaDon) => {
    return axios.post(`${apiChiTietHoaDon}/hoa-don/${hoaDonId}`, chiTietHoaDon);
};

export const updateSoLuong = (chiTietHoaDonId, soLuongMua) => {
    return axios.put(`${apiChiTietHoaDon}/update-so-luong/${chiTietHoaDonId}`, 
        soLuongMua, 
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
};


export const deleteChiTietHoaDon = (chiTietHoaDonId) => {
    return axios.delete(`${apiChiTietHoaDon}/${chiTietHoaDonId}`);
};
