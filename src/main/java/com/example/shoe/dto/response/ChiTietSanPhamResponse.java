package com.example.shoe.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChiTietSanPhamResponse {
    Integer id;
    String maChiTietSanPham;
    String tenChiTietSanPham;
    String hinhAnh;
    Integer soLuongTon;
    Double gia;
    Boolean trangThai;

    Integer sanPhamId;
    String sanPhamTen;

    Integer mauSacId;
    String mauSacTen;

    Integer sizeId;
    String sizeTen;

    Integer chatLieuId;
    String chatLieuTen;

    Integer deGiayId;
    String deGiayTen;
}
