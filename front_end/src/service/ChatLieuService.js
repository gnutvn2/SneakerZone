import axios from "axios";

const apiChatLieu = 'http://localhost:8080/chat-lieu';

export const listChatLieu = (pageable, searchQuery = '') => {
    return axios.get(apiChatLieu + '/search' , {
        params:{
            page: pageable.page,
            size: pageable.size,
            keyword: searchQuery
        }
    })
}

export const createChatLieu = (chatLieu) => axios.post(apiChatLieu, chatLieu);
export const getOneChatLieu = (chatLieuId) => axios.get(`${apiChatLieu}/${chatLieuId}`);
export const updateChatLieu = (chatLieuId, chatLieu) => axios.put(`${apiChatLieu}/${chatLieuId}`, chatLieu);
export const deleteChatLieu = (chatLieuId) => axios.delete(`${apiChatLieu}/${chatLieuId}`);