package com.example.shoe.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "nhan_vien")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NhanVien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name = "ma_nhan_vien")
    String maNhanVien;
    @Column(name = "ho_ten")
    String hoTen;
    @Column(name = "gioi_tinh")
    Boolean gioiTinh;
    @Column(name = "so_dien_thoai")
    String soDienThoai;
    @Column(name = "email")
    String email;
    @Column(name = "mat_khau")
    String matKhau;
    @Column(name = "dia_chi")
    String diaChi;
    @Column(name = "trang_thai")
    Boolean trangThai;
    @ManyToOne
    @JoinColumn(name = "vai_tro_id")
    VaiTro vaiTro;
}
