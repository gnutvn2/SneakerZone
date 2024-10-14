package com.example.shoe.dto.response;

import com.example.shoe.entity.DanhMuc;
import com.example.shoe.entity.ThuongHieu;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SanPhamResponse {
    Integer id;
    String maSanPham;
    String tenSanPham;
    String moTa;
    Date ngayTao;
    Boolean trangThai;
    DanhMuc danhMuc;
    ThuongHieu thuongHieu;
}
