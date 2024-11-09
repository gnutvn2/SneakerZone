package com.example.shoe.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NhanVienRequest {
    @NotBlank(message = "Mã nhân viên không được để trống")
    String maNhanVien;
    @NotBlank(message = "Họ và tên nhân viên không được để trống")
    String hoTen;
    Boolean gioiTinh;
    @NotBlank(message = "Số điện thoại nhân viên không được để trống")
    String soDienThoai;
    @NotBlank(message = "Email nhân viên không được để trống")
    @Pattern(
            regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$",
            message = "Email không hợp lệ"
    )
    String email;
    String matKhau;
    @NotBlank(message = "Địa chỉ không được để trống")
    String diaChi;
    Boolean trangThai;
    Integer vaiTroId;
}
