package com.example.shoe.repository;

import com.example.shoe.entity.ChatLieu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatLieuRepository extends JpaRepository<ChatLieu, Integer> {
    @Query("""
            select cl
            from ChatLieu cl
            where cl.maChatLieu like %:kwyword%
            or cl.tenChatLieu like %:keyword%
            """)
    Page<ChatLieu> search(@Param("keyword") String keyword, Pageable pageable);
}
