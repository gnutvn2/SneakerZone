package com.example.shoe.dto.response;

import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ThuongHieuResponse {
    Integer id;
    String maThuongHieu;
    String tenThuongHieu;
}
