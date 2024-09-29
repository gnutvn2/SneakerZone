import axios from "axios";

const apiSanPham = "http://localhost:8080/san-pham";
const apiThuongHieu = "http://localhost:8080/thuong-hieu";
const apiDanhMuc = "http://localhost:8080/danh-muc";

export const listSanPham = (pageale, trangThai = true) => {
    return axios.get(apiSanPham, {
        params: { 
            page: pageale.page, 
            size: pageale.size,
            trangThai: trangThai // true hoặc false - trạng thái sản phẩm
        }
    });
};

export const createSanPham = (sanPham) => axios.post(apiSanPham, sanPham);
export const getSanPham = (sanPhamId) => axios.get(apiSanPham + '/' + sanPhamId);
export const updateSanPham = (sanPhamId, sanPham) => axios.put(apiSanPham + '/' + sanPhamId, sanPham);

export const updateTrangThai = (sanPhamId) => {
    return axios.put(`${apiSanPham}/status/${sanPhamId}`);
};

export const listThuongHieu = () => {
    return axios.get(apiThuongHieu);
};

export const listDanhMuc = () => {
    return axios.get(apiDanhMuc);
};