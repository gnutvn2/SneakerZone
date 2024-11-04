package com.example.shoe.dto.response;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Setter
@Getter
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HoaDonResponse {
    Integer id;
    String maHoaDon;
    LocalDateTime ngayTao;
    Double tongTien;
    String trangThai;
    String tenNhanVien;
    String tenKhachHang;
}
