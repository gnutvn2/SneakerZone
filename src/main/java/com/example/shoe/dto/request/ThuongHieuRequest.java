package com.example.shoe.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ThuongHieuRequest {
    @NotBlank(message = "Mã thương hiệu không được để trống")
    @Pattern(regexp = "^[a-zA-Z0-9]*$", message = "Mã thương hiệu chỉ được chứa chữ cái và số!")
    @Size(max = 10, message = "Mã danh mục không vượt quá 10 ký tự")
    String maThuongHieu;
    @NotBlank(message = "Tên thương hiệu không được để trống")
    @Pattern(regexp = "^[a-zA-Z0-9]*$", message = "Mã thương hiệu chỉ được chứa chữ cái và số!")
    String tenThuongHieu;
}
