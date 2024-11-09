package com.example.shoe.mapper;

import com.example.shoe.dto.request.*;
import com.example.shoe.dto.response.*;
import com.example.shoe.entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.web.multipart.MultipartFile;

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

    // Mapper chi tiết sản phẩm
    @Mapping(source = "sanPhamId", target = "sanPham.id")
    @Mapping(source = "mauSacId", target = "mauSac.id")
    @Mapping(source = "sizeId", target = "size.id")
    @Mapping(source = "chatLieuId", target = "chatLieu.id")
    @Mapping(source = "deGiayId", target = "deGiay.id")
    @Mapping(source = "tenChiTietSanPham", target = "tenChiTietSanPham")
    @Mapping(source = "hinhAnh", target = "hinhAnh")
    ChiTietSanPham toChiTietSanPham(ChiTietSanPhamRequest request);

    @Mapping(source = "sanPham.id", target = "sanPhamId")
    @Mapping(source = "sanPham.tenSanPham", target = "sanPhamTen")
    @Mapping(source = "mauSac.tenMauSac", target = "mauSacTen")
    @Mapping(source = "size.tenSize", target = "sizeTen")
    @Mapping(source = "chatLieu.tenChatLieu", target = "chatLieuTen")
    @Mapping(source = "deGiay.tenDeGiay", target = "deGiayTen")
    @Mapping(source = "hinhAnh", target = "hinhAnh")
    ChiTietSanPhamResponse toChiTietSanPhamResponse(ChiTietSanPham chiTietSanPham);

    default String map(MultipartFile file) {
        if (file != null && !file.isEmpty()) {
            return file.getOriginalFilename();
        }
        return null;
    }

    //Mapper vai trò
    VaiTro toVaiTro(VaiTroRequest request);

    VaiTroResponse toVaiTroResponse(VaiTro vaiTro);

    void toUpdateVaiTro(@MappingTarget VaiTro vaiTro, VaiTroRequest request);

    //Mapper nhân viên
    @Mapping(source = "vaiTroId", target = "vaiTro.id")
    NhanVien toNhanVien(NhanVienRequest request);

    @Mapping(source = "vaiTro.tenVaiTro", target = "tenVaiTro")
    NhanVienResponse toNhanVienResponse(NhanVien nhanVien);

    @Mapping(target = "vaiTro.id", source = "vaiTroId")
    void toUpdateNhanVien(@MappingTarget NhanVien nhanVien, NhanVienRequest request);

    //Mapper khách hàng
    KhachHang toKhachHang(KhachHangRequest request);

    KhachHangResponse toKhachHangResponse(KhachHang khachHang);

    void toUpdateKhachHang(@MappingTarget KhachHang khachHang, KhachHangRequest request);

    //Mapper hóa đơn
    @Mapping(source = "nhanVienId", target = "nhanVien.id")
    @Mapping(source = "khachHangId", target = "khachHang.id")
    HoaDon toHoaDon(HoaDonRequest request);

    @Mapping(source = "nhanVien.hoTen", target = "tenNhanVien")
    @Mapping(source = "khachHang.hoTen", target = "tenKhachHang")
    HoaDonResponse toHoaDonResponse(HoaDon hoaDon);

    //Mapper chi tiết hóa đơn
    @Mapping(source = "chiTietSanPhamId", target = "chiTietSanPham.id")
    @Mapping(source = "hoaDonId", target = "hoaDon.id")
    ChiTietHoaDon toChiTietHoaDon(ChiTietHoaDonRequest request);

    @Mapping(source = "chiTietSanPham.maChiTietSanPham", target = "maChiTietSanPham")
    @Mapping(source = "chiTietSanPham.tenChiTietSanPham", target = "tenChiTietSanPham")
    @Mapping(source = "hoaDon.maHoaDon", target = "maHoaDon")
    ChiTietHoaDonResponse toChiTietHoaDonResponse(ChiTietHoaDon chiTietHoaDon);
}
