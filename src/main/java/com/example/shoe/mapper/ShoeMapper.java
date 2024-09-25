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

    //Mapper đợt giảm giá
    DotGiamGia toDotGiamGia(DotGiamGiaRequest request);
    DotGiamGiaResponse toDotGiamGiaResponse(DotGiamGia dotGiamGia);
    void toUpdateDotGiamGia(@MappingTarget DotGiamGia dotGiamGia, DotGiamGiaRequest request);


    /*
    //Mapper sản phẩm
    @Mapping(source = "thuongHieuId", target = "thuongHieu.id"):

    source = "thuongHieuId": Đây là tên của trường trong SanPhamRequest.
    target = "thuongHieu.id": Đây là thuộc tính mà bạn muốn ánh xạ trong đối tượng SanPham.
    Thay vì gán ID trực tiếp, bạn ánh xạ nó vào thuộc tính id của đối tượng ThuongHieu trong SanPham.
    @Mapping(source = "danhMucId", target = "danhMuc.id"):

    source = "danhMucId": Tên của trường trong SanPhamRequest.
    target = "danhMuc.id": Tên thuộc tính trong đối tượng SanPham mà bạn muốn ánh xạ.
     */
    @Mapping(source = "thuongHieuId", target = "thuongHieu.id")
    @Mapping(source = "danhMucId", target = "danhMuc.id")
    SanPham toSanPham(SanPhamRequest request);

    SanPhamResponse toSanPhamResponse(SanPham sanPham);

    /*
    @Mapping(target = "thuongHieu.id", source = "thuongHieuId"):

    target = "thuongHieu.id": Địa chỉ thuộc tính trong đối tượng SanPham mà bạn muốn cập nhật.
    source = "thuongHieuId": Tên của trường trong SanPhamRequest.
    @Mapping(target = "danhMuc.id", source = "danhMucId"):

    target = "danhMuc.id": Địa chỉ thuộc tính trong đối tượng SanPham mà bạn muốn cập nhật.
    source = "danhMucId": Tên của trường trong SanPhamRequest.
     */
    @Mapping(target = "thuongHieu.id", source = "thuongHieuId")
    @Mapping(target = "danhMuc.id", source = "danhMucId")
    void toUpdateSanPham(@MappingTarget SanPham sanPham, SanPhamRequest request);
}
