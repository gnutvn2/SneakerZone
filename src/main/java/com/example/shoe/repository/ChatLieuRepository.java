package com.example.shoe.repository;

import com.example.shoe.entity.ChatLieu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatLieuRepository extends JpaRepository<ChatLieu, Integer> {
    boolean existsByTenChatLieu(String tenChatLieu);
}
