package com.example.shoe.service;

import com.example.shoe.dto.request.ChatLieuRequest;
import com.example.shoe.dto.response.ChatLieuResponse;
import com.example.shoe.entity.ChatLieu;

import java.util.List;

public interface ChatLieuService {
    public List<ChatLieu> getChatLieu();
    public ChatLieu createChatLieu(ChatLieuRequest request);
    public ChatLieuResponse getChatLieuId(Integer id);
    public ChatLieuResponse updateChatLieu(Integer id, ChatLieuRequest request);
    public void deleteChatLieu(Integer id);

}
