package com.example.shoe.service;

import com.example.shoe.dto.request.ChatLieuRequest;
import com.example.shoe.dto.response.ChatLieuResponse;
import com.example.shoe.entity.ChatLieu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ChatLieuService {
    public Page<ChatLieu> getChatLieu(Pageable pageable);
    public ChatLieu createChatLieu(ChatLieuRequest request);
    public ChatLieuResponse getChatLieuId(Integer id);
    public ChatLieuResponse updateChatLieu(Integer id, ChatLieuRequest request);
    public void deleteChatLieu(Integer id);
    public Page<ChatLieu> searchChatLieu(String keyword, Pageable pageable);

}
