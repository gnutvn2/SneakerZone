package com.example.shoe.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HoaDonRequest {
    String maHoaDon;
    LocalDateTime ngayTao;
    Double tongTien;
    Double tienThanhToan;
    Double tienThua;
    String trangThai;
    Integer nhanVienId;
    Integer khachHangId;
}
