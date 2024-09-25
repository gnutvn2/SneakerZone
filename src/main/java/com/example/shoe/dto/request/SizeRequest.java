package com.example.shoe.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class SizeRequest {
    @NotBlank(message = "Mã size không được để trống!")
    String maSize;
    @NotBlank(message = "Tên size không được để trống!")
    String tenSize;
}
