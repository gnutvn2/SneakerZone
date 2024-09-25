import axios from "axios";

const apiSanPham = "http://localhost:8080/san-pham";

export const listSanPham = (pageale) => {
    return axios.get(apiSanPham, {
        params: { page: pageale.page, size: pageale.size }
    });
};

export const createSanPham = (sanPham) => axios.post(apiSanPham, sanPham);
export const getSanPham = (sanPhamId) => axios.get(apiSanPham + '/' + sanPhamId);
export const updateSanPham = (sanPhamId, sanPham) => axios.put(apiSanPham + '/' + sanPhamId, sanPham);


