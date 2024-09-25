package com.example.shoe.dto.response;

import com.example.shoe.entity.DanhMuc;
import com.example.shoe.entity.ThuongHieu;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class SanPhamResponse {
    Integer id;
    String maSanPham;
    String tenSanPham;
    String moTa;
    Date ngayTao;
    Boolean trangThai;
    ThuongHieu thuongHieu;
    DanhMuc danhMuc;
}
