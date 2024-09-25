package com.example.shoe.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class DeGiayRequest {
    @NotBlank(message = "Mã đế giày không được để trống!")
    String maDeGiay;
    @NotBlank(message = "Tên đế giày không được để trống!")
    String tenDeGiay;
}
