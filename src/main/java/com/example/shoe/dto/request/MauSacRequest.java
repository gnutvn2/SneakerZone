package com.example.shoe.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class MauSacRequest {
    @NotBlank(message = "Mã màu sắc không được để trống!")
    String maMauSac;
    @NotBlank(message = "Tên màu sắc không được để trống")
    String tenMauSac;
}
