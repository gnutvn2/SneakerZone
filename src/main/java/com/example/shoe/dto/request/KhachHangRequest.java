package com.example.shoe.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class KhachHangRequest {
    @NotBlank(message = "Mã khách hàng không được để trống")
    String maKhachHang;
    @NotBlank(message = "Họ và tên không được để trống")
    String hoTen;
    Boolean gioiTinh;
    @NotBlank(message = "Số điện thoại không được để trống")
    String soDienThoai;
    String matKhau;
    @NotBlank(message = "Email không được để trống")
    String email;
    @NotBlank(message = "Địa chỉ không được để trống")
    String diaChi;
}
