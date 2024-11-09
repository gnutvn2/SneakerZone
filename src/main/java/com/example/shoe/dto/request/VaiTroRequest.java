package com.example.shoe.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VaiTroRequest {
    @NotBlank(message = "Mã vai trò không được để trống")
    String maVaiTro;
    @NotBlank(message = "Tên vai trò không được để trống")
    String tenVaiTro;
}
