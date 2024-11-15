import axios from "axios";

const apiSanPham = "http://localhost:8080/san-pham";
const apiThuongHieu = "http://localhost:8080/thuong-hieu";
const apiDanhMuc = "http://localhost:8080/danh-muc";

export const listSanPham = (pageable, trangThai, keyword = '') => {
    return axios.get(apiSanPham + '/search', {
        params: {
            page: pageable.page,
            size: pageable.size,
            trangThai: trangThai,
            keyword: keyword
        }
    });
};

export const createSanPham = (sanPham) => axios.post(apiSanPham, sanPham);
export const getSanPham = (sanPhamId) => axios.get(`${apiSanPham}/${sanPhamId}`);
export const updateSanPham = (sanPhamId, sanPham) => axios.put(`${apiSanPham}/${sanPhamId}`, sanPham);

export const getThuongHieu = () => {
    return axios.get(apiThuongHieu);
};

export const getDanhMuc = () => {
    return axios.get(apiDanhMuc);
};
