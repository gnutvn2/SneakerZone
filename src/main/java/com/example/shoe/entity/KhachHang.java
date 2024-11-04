package com.example.shoe.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "khach_hang")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class KhachHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name = "ma_khach_hang")
    String maKhachHang;
    @Column(name = "ho_ten")
    String hoTen;
    @Column(name = "gioi_tinh")
    Boolean gioiTinh;
    @Column(name = "so_dien_thoai")
    String soDienThoai;
    @Column(name = "mat_khau")
    String matKhau;
    @Column(name = "email")
    String email;
    @Column(name = "dia_chi")
    String diaChi;
}
