import axios from "axios";

const api = 'http://localhost:8080/thuong-hieu'

export const listThuongHieu = (pageable) => {
    return axios.get(api, {
        params: { page: pageable.page,size: pageable.size}
    });
};

export const createThuongHieu = (thuongHieu) => axios.post(api, thuongHieu);
export const getThuongHieu = (thuongHieuId) => axios.get(api + '/' + thuongHieuId);
export const updateThuongHieu = (thuongHieuId, thuongHieu) => axios.put(api + '/' + thuongHieuId, thuongHieu);
export const deleteThuongHieu = (thuongHieuId) => axios.delete(api + '/' + thuongHieuId);



