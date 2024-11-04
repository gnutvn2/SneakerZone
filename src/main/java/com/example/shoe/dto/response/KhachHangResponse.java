package com.example.shoe.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class KhachHangResponse {
    Integer id;
    String maKhachHang;
    String hoTen;
    Boolean gioiTinh;
    String soDienThoai;
    String email;
    String diaChi;
}
