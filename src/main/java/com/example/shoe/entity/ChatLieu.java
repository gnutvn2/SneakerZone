package com.example.shoe.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "chat_lieu")
public class ChatLieu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name = "ma_chat_lieu")
    String maChatLieu;
    @Column(name = "ten_chat_lieu")
    String tenChatLieu;
    @OneToMany(mappedBy = "chatLieu")
    @JsonBackReference
    List<ChiTietSanPham> listChiTietSanPham;
}
