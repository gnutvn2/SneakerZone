package com.example.shoe.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "chi_tiet_san_pham")
public class ChiTietSanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name = "ma_chi_tiet_san_pham")
    String maChiTietSanPham;
    @Column(name = "ten_chi_tiet_san_pham")
    String tenChiTietSanPham;
    @Column(name = "hinh_anh")
    String hinhAnh;
    @Column(name = "so_luong_ton")
    Integer soLuongTon;
    @Column(name = "gia")
    Double gia;
    @Column(name = "trang_thai")
    Boolean trangThai;
    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "san_pham_id")
    SanPham sanPham;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "mau_sac_id")
    MauSac mauSac;
    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "size_id")
    Size size;
    @ManyToOne
    @JoinColumn(name = "chat_lieu_id")
    @JsonManagedReference
    ChatLieu chatLieu;
    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "de_giay_id")
    DeGiay deGiay;
}
