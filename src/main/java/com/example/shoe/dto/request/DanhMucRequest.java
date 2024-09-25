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
public class DanhMucRequest {
    @NotBlank(message = "Mã danh mục không được để trống")
    @Pattern(regexp = "^[a-zA-Z0-9]*$", message = "Mã danh mục chỉ được chứa chữ cái và số!")
    @Size(max = 10, message = "Mã danh mục không vượt quá 10 ký tự")
    String maDanhMuc;
    @NotBlank(message = "Tên danh mục không được để trống")
    String tenDanhMuc;
}
