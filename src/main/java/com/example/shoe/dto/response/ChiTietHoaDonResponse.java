package com.example.shoe.dto.response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChiTietHoaDonResponse {
    Integer id;
    Double gia;
    Integer soLuongMua;
    Double tongTien;
    String maChiTietSanPham;
    String tenChiTietSanPham;
    String maHoaDon;
}
