package com.example.shoe.service.impl;

import com.example.shoe.dto.request.ChatLieuRequest;
import com.example.shoe.dto.response.ChatLieuResponse;
import com.example.shoe.entity.ChatLieu;
import com.example.shoe.mapper.ShoeMapper;
import com.example.shoe.repository.ChatLieuRepository;
import com.example.shoe.service.ChatLieuService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ChatLieuServiceImpl implements ChatLieuService {
    ChatLieuRepository chatLieuRepository;
    ShoeMapper shoeMapper;


    @Override
    public List<ChatLieu> getChatLieu() {
        return chatLieuRepository.findAll();
    }

    @Override
    public ChatLieu createChatLieu(ChatLieuRequest request) {
        if (chatLieuRepository.existsByTenChatLieu(request.getTenChatLieu())) {
            throw new RuntimeException("Chất liệu đã tồn tại. Vui lòng nhập chất liệu mới!");
        }
        ChatLieu chatLieu = shoeMapper.toChatLieu(request);
        return chatLieuRepository.save(chatLieu);
    }

    @Override
    public ChatLieuResponse getChatLieuId(Integer id) {
        ChatLieu chatLieu = chatLieuRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Không tìm thấy chất liệu"));
        return shoeMapper.toChatLieuResponse(chatLieu);
    }

    @Override
    public ChatLieuResponse updateChatLieu(Integer id, ChatLieuRequest request) {
        ChatLieu chatLieu = chatLieuRepository.findById(id)
                        .orElseThrow(()-> new RuntimeException("Không tìm thấy chất liệu"));
        shoeMapper.toUpdateChatLieu(chatLieu, request);
        return shoeMapper.toChatLieuResponse(chatLieuRepository.save(chatLieu));
    }

    @Override
    public void deleteChatLieu(Integer id) {
        if (!chatLieuRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy chất liệu");
        }
        chatLieuRepository.deleteById(id);
    }
}
