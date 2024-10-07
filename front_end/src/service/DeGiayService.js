import axios from "axios";

const apiDeGiay = 'http://localhost:8080/de-giay';

export const listDeGiay = (pageable, searchQuery = '') => {
    return axios.get(apiDeGiay + '/search' , {
        params:{
            page: pageable.page,
            size: pageable.size,
            keyword: searchQuery
        }
    })
}

export const createDeGiay = (deGiay) => axios.post(apiDeGiay, deGiay);
export const getOneDeGiay = (deGiayId) => axios.get(`${apiDeGiay}/${deGiayId}`);
export const updateDeGiay = (deGiayId, deGiay) => axios.put(`${apiDeGiay}/${deGiayId}`, deGiay);
export const deleteDeGiay = (deGiayId) => axios.delete(`${apiDeGiay}/${deGiayId}`);