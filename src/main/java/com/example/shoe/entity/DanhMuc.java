package com.example.shoe.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "danh_muc")
public class DanhMuc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name = "ma_danh_muc")
    String maDanhMuc;
    @Column(name = "ten_danh_muc")
    String tenDanhMuc;
}
