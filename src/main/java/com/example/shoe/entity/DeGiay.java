package com.example.shoe.entity;

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
@Table(name = "de_giay")
public class DeGiay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name = "ma_de_giay")
    String maDeGiay;
    @Column(name = "ten_de_giay")
    String tenDeGiay;
    @OneToMany(mappedBy = "deGiay")
    List<ChiTietSanPham> listChiTietSanPham;
}
