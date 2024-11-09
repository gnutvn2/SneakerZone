package com.example.shoe.dto.response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NhanVienResponse {
    Integer id;
    String maNhanVien;
    String hoTen;
    Boolean gioiTinh;
    String soDienThoai;
    String email;
    String diaChi;
    Boolean trangThai;
    String tenVaiTro;
}
