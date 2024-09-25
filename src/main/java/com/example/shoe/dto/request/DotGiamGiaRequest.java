package com.example.shoe.dto.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class DotGiamGiaRequest {
    @NotBlank(message = "Mã đợt giảm giá không được để trống")
    String maDotGiamGia;
    @NotBlank(message = "Tên đợt giảm giá không được để trống")
    String tenDotGiamGia;
    @NotNull(message = "Giá trị giảm không được để trống")
    Integer giaTriGiam;
    @NotNull(message = "Ngày bắt đầu không được để trống")
    Date ngayBatDau;
    @NotNull(message = "Ngày kết thúc không được để trống")
    Date ngayKetThuc;
    @NotNull(message = "Trạng thái không được để trống")
    Boolean trangThai;
}
