import axios from "axios";

const apiMauSac = 'http://localhost:8080/mau-sac';

export const listMauSac = (pageable) => {
    return axios.get(apiMauSac , {
        params:{
            page: pageable.page,
            size: pageable.size
        }
    })
}