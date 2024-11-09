package com.example.shoe.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChiTietHoaDonRequest {
    Double gia;
    Integer soLuongMua;
    Double tongTien;
    Integer chiTietSanPhamId;
    Integer hoaDonId;
}
