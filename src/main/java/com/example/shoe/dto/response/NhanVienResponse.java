package com.example.shoe.dto.response;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Data
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
