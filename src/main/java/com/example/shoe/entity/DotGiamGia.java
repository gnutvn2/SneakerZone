package com.example.shoe.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "dot_giam_gia")
public class DotGiamGia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name = "ma_dot_giam_gia")
    String maDotGiamGia;
    @Column(name = "ten_dot_giam_gia")
    String tenDotGiamGia;
    @Column(name = "gia_tri_giam")
    Integer giaTriGiam;
    @Column(name = "ngay_bat_dau")
    Date ngayBatDau;
    @Column(name = "ngay_ket_thuc")
    Date ngayKetThuc;
    @Column(name = "trang_thai")
    Boolean trangThai;
}
