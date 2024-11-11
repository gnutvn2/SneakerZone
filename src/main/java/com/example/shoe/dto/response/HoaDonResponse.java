package com.example.shoe.dto.response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HoaDonResponse {
    Integer id;
    String maHoaDon;
    LocalDateTime ngayTao;
    String tenNhanVien;
    String tenKhachHang;
    Double tongTien;
    Double tienThanhToan;
    Double tienThua;
    String trangThai;
}
