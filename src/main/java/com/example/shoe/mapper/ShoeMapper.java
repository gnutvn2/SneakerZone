package com.example.shoe.mapper;

import com.example.shoe.dto.request.*;
import com.example.shoe.dto.response.*;
import com.example.shoe.entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ShoeMapper {
    //Mapper chất liệu
    ChatLieu toChatLieu(ChatLieuRequest request);
    ChatLieuResponse toChatLieuResponse(ChatLieu chatLieu);
    void toUpdateChatLieu(@MappingTarget ChatLieu chatLieu, ChatLieuRequest request);


    //Mapper danh mục
    DanhMuc toDanhMuc(DanhMucRequest request);
    DanhMucResponse toDanhMucResponse(DanhMuc danhMuc);
    void toUpdateDanhMuc(@MappingTarget DanhMuc danhMuc, DanhMucRequest request);


    //Mapper đế giày
    DeGiay toDeGiay(DeGiayRequest request);
    DeGiayResponse toDeGiayResponse(DeGiay deGiay);
    void toUpdateDeGiay(@MappingTarget DeGiay deGiay, DeGiayRequest request);


    //Mapper màu sắc
    MauSac toMauSac(MauSacRequest request);
    MauSacResponse toMauSacResponse(MauSac mauSac);
    void toUpdateMauSac(@MappingTarget MauSac mauSac, MauSacRequest request);


    //Mapper thương hiệu
    ThuongHieu toThuongHieu(ThuongHieuRequest request);
    ThuongHieuResponse toThuongHieuResponse(ThuongHieu thuongHieu);
    void toUpdateThuongHieu(@MappingTarget ThuongHieu thuongHieu, ThuongHieuRequest request);


    //Mapper size
    Size toSize(SizeRequest request);
    SizeResponse toSizeResponse(Size size);
    void toUpdateSize(@MappingTarget Size size, SizeRequest request);


    //Mapper sản phẩm
    @Mapping(source = "thuongHieuId", target = "thuongHieu.id")
    @Mapping(source = "danhMucId", target = "danhMuc.id")
    SanPham toSanPham(SanPhamRequest request);
    SanPhamResponse toSanPhamResponse(SanPham sanPham);
    @Mapping(target = "thuongHieu.id", source = "thuongHieuId")
    @Mapping(target = "danhMuc.id", source = "danhMucId")
    void toUpdateSanPham(@MappingTarget SanPham sanPham, SanPhamRequest request);


    //Mapper chi tiết sản phẩm
    @Mapping(source = "sanPhamId", target = "sanPham.id")
    @Mapping(source = "mauSacId", target = "mauSac.id")
    @Mapping(source = "sizeId", target = "size.id")
    @Mapping(source = "chatLieuId", target = "chatLieu.id")
    @Mapping(source = "deGiayId", target = "deGiay.id")
    @Mapping(source = "tenChiTietSanPham", target = "tenChiTietSanPham")
    ChiTietSanPham toChiTietSanPham(ChiTietSanPhamRequest request);
    ChiTietSanPhamResponse toChiTietSanPhamResponse(ChiTietSanPham chiTietSanPham);
    @Mapping(source = "sanPhamId", target = "sanPham.id")
    @Mapping(source = "mauSacId", target = "mauSac.id")
    @Mapping(source = "sizeId", target = "size.id")
    @Mapping(source = "chatLieuId", target = "chatLieu.id")
    @Mapping(source = "deGiayId", target = "deGiay.id")
    @Mapping(source = "tenChiTietSanPham", target = "tenChiTietSanPham")
    void toUpdateChiTietSanPham(@MappingTarget ChiTietSanPham chiTietSanPham, ChiTietSanPhamRequest request);
}
