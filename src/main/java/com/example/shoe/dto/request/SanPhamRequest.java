package com.example.shoe.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class SanPhamRequest {
    @NotBlank(message = "Mã sản phẩm không được để trống!")
    String maSanPham;
    @NotBlank(message = "Tên sản phẩm không được để trống!")
    String tenSanPham;
    String moTa;
    @NotNull(message = "Vui lòng chọn ngày tạo!")
    Date ngayTao;
    Boolean trangThai;
    @NotNull(message = "Vui lòng chọn ID thương hiệu!")
    Integer thuongHieuId;
    @NotNull(message = "Vui lòng chọn ID danh mục!")
    Integer danhMucId;
    List<ChiTietSanPhamRequest> listChiTietSanPham;
}
