package com.example.shoe.dto.request;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChiTietSanPhamRequest {

    @NotBlank(message = "Mã chi tiết sản phẩm không được để trống")
    String maChiTietSanPham;
    @NotBlank(message = "Tên chi tiết sản phẩm không được để trống")
    String tenChiTietSanPham;

    MultipartFile  hinhAnh;

    @NotNull(message = "Số lượng tồn không được để trống")
    @Min(value = 0, message = "Số lượng tồn phải lớn hơn hoặc bằng 0")
    Integer soLuongTon;

    @NotNull(message = "Giá không được để trống")
    @DecimalMin(value = "0.0", inclusive = false, message = "Giá phải lớn hơn 0")
    Double gia;

    @NotNull(message = "Trạng thái không được để trống")
    Boolean trangThai;

    @NotNull(message = "ID sản phẩm không được để trống")
    Integer sanPhamId;

    @NotNull(message = "Màu sắc không được để trống")
    Integer mauSacId;

    @NotNull(message = "Size không được để trống")
    Integer sizeId;

    @NotNull(message = "Chất liệu không được để trống")
    Integer chatLieuId;

    @NotNull(message = "Đế giày không được để trống")
    Integer deGiayId;
}
