package com.example.shoe.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "san_pham")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name = "ma_san_pham")
    String maSanPham;
    @Column(name = "ten_san_pham")
    String tenSanPham;
    @Column(name = "mo_ta")
    String moTa;
    @Temporal(TemporalType.DATE)//Lay ngay khong lay gio
    @Column(name = "ngay_tao")
    Date ngayTao;
    @Column(name = "trang_thai")
    Boolean trangThai;
    @JoinColumn(name = "thuong_hieu_id")
    @ManyToOne
    ThuongHieu thuongHieu;
    @JoinColumn(name = "danh_muc_id")
    @ManyToOne
    DanhMuc danhMuc;
}
