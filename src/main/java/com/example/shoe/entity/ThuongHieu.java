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
@Table(name = "thuong_hieu")
public class ThuongHieu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name = "ma_thuong_hieu")
    String maThuongHieu;
    @Column(name = "ten_thuong_hieu")
    String tenThuongHieu;
    @OneToMany(mappedBy = "thuongHieu")
    @JsonBackReference
    List<SanPham> listSanPham;
}
