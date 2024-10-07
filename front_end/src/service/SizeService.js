import axios from "axios";

const apiSize = 'http://localhost:8080/size';

export const listSize = (pageable, searchQuery = '') => {
    return axios.get(apiSize + '/search' , {
        params:{
            page: pageable.page,
            size: pageable.size,
            keyword: searchQuery
        }
    })
}

export const createSize = (size) => axios.post(apiSize, size);
export const getOneSize = (sizeId) => axios.get(`${apiSize}/${sizeId}`);
export const updateSize = (sizeId, size) => axios.put(`${apiSize}/${sizeId}`, size);
export const deleteSize = (sizeId) => axios.delete(`${apiSize}/${sizeId}`);