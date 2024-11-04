package com.example.shoe.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "chi_tiet_hoa_don")
public class ChiTietHoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name = "gia")
    Double gia;
    @Column(name = "so_luong_mua")
    Integer soLuongMua;
    @Column(name = "tong_tien")
    Double tongTien;
    @ManyToOne
    @Column(name = "chi_tiet_san_pham_id")
    ChiTietSanPham chiTietSanPham;
    @ManyToOne
    @Column(name = "hoa_don_id")
    HoaDon hoaDon;
}
