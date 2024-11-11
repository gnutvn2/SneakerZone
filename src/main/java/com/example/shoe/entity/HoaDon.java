package com.example.shoe.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "hoa_don")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name = "ma_hoa_don")
    String maHoaDon;
    @Column(name = "ngay_tao")
    LocalDateTime ngayTao;
    @Column(name = "tong_tien")
    Double tongTien;
    @Column(name = "tien_thanh_toan")
    Double tienThanhToan;
    @Column(name = "tien_thua")
    Double tienThua;
    @Column(name = "trang_thai")
    String trangThai;
    @ManyToOne
    @JoinColumn(name = "nhan_vien_id")
    NhanVien nhanVien;
    @ManyToOne
    @JoinColumn(name = "khach_hang_id")
    KhachHang khachHang;

    @OneToMany(mappedBy = "hoaDon")
    @JsonBackReference
    List<ChiTietHoaDon> chiTietHoaDons;
    public void updateTongTien() {
        if (chiTietHoaDons != null) {
            for (ChiTietHoaDon chiTiet : chiTietHoaDons) {
                chiTiet.updateTongTien();
            }
            this.tongTien = this.chiTietHoaDons.stream()
                    .mapToDouble(ChiTietHoaDon::getTongTien)
                    .sum();
        } else {
            this.tongTien = 0.0;
        }
    }
    public void updateTienThua() {
        this.tienThua = this.tienThanhToan - this.tongTien;
    }
}
