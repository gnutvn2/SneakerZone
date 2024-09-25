package com.example.shoe.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class DotGiamGiaResponse {
    Integer id;
    String maDotGiamGia;
    String tenDotGiamGia;
    Integer giaTriGiam;
    Date ngayBatDau;
    Date ngayKetThuc;
    Boolean trangThai;
}
