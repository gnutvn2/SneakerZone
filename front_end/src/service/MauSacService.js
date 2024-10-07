import axios from "axios";

const apiMauSac = 'http://localhost:8080/mau-sac';

export const listMauSac = (pageable, searchQuery = '') => {
    return axios.get(apiMauSac + '/search' , {
        params:{
            page: pageable.page,
            size: pageable.size,
            keyword: searchQuery
        }
    })
}

export const createMauSac = (mauSac) => axios.post(apiMauSac, mauSac);
export const getOneMauSac = (mauSacId) => axios.get(apiMauSac +'/' + mauSacId);
export const updateMauSac = (mauSacId, mauSac) => axios.put(apiMauSac+'/'+ mauSacId, mauSac);
export const deleteMauSac = (mauSacId) => axios.delete(apiMauSac + '/' + mauSacId);