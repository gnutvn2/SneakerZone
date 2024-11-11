package com.example.shoe.service.impl;

import com.example.shoe.dto.request.ChiTietHoaDonRequest;
import com.example.shoe.dto.response.ChiTietHoaDonResponse;
import com.example.shoe.entity.ChiTietHoaDon;
import com.example.shoe.entity.ChiTietSanPham;
import com.example.shoe.entity.HoaDon;
import com.example.shoe.mapper.ShoeMapper;
import com.example.shoe.repository.ChiTietHoaDonRepository;
import com.example.shoe.repository.ChiTietSanPhamRepository;
import com.example.shoe.repository.HoaDonRepository;
import com.example.shoe.service.ChiTietHoaDonService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChiTietHoaDonServiceImpl implements ChiTietHoaDonService {
    ChiTietHoaDonRepository chiTietHoaDonRepository;
    ChiTietSanPhamRepository chiTietSanPhamRepository;
    HoaDonRepository hoaDonRepository;
    ShoeMapper shoeMapper;

    @Override
    public List<ChiTietHoaDonResponse> getAllChiTietHoaDonByHoaDonId(Integer hoaDonId) {
        return chiTietHoaDonRepository.findAllByHoaDonId(hoaDonId).stream()
                .map(shoeMapper::toChiTietHoaDonResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ChiTietHoaDonResponse createChiTietHoaDon(ChiTietHoaDonRequest request) {
        HoaDon hoaDon = hoaDonRepository.findById(request.getHoaDonId())
                .orElseThrow(() -> new RuntimeException("Hóa đơn không tồn tại"));
        ChiTietSanPham chiTietSanPham = chiTietSanPhamRepository.findById(request.getChiTietSanPhamId())
                .orElseThrow(() -> new RuntimeException("Chi tiết sản phẩm không tồn tại"));

        if (chiTietSanPham.getSoLuongTon() < request.getSoLuongMua()) {
            throw new RuntimeException("Số lượng tồn kho không đủ");
        }

        ChiTietHoaDon existingChiTietHoaDon = chiTietHoaDonRepository
                .findByHoaDonIdAndChiTietSanPhamId(request.getHoaDonId(), request.getChiTietSanPhamId())
                .orElse(null);

        double gia = chiTietSanPham.getGia();
        double tongTien = gia * request.getSoLuongMua();

        if (existingChiTietHoaDon != null) {
            existingChiTietHoaDon.setSoLuongMua(existingChiTietHoaDon.getSoLuongMua() + request.getSoLuongMua());
            existingChiTietHoaDon.setTongTien(existingChiTietHoaDon.getSoLuongMua() * gia);

            chiTietSanPham.setSoLuongTon(chiTietSanPham.getSoLuongTon() - request.getSoLuongMua());
            chiTietSanPhamRepository.save(chiTietSanPham);
            chiTietHoaDonRepository.save(existingChiTietHoaDon);

            hoaDon.setTongTien(hoaDon.getTongTien() + tongTien);
            hoaDonRepository.save(hoaDon);

            return shoeMapper.toChiTietHoaDonResponse(existingChiTietHoaDon);
        } else {
            chiTietSanPham.setSoLuongTon(chiTietSanPham.getSoLuongTon() - request.getSoLuongMua());
            chiTietSanPhamRepository.save(chiTietSanPham);

            ChiTietHoaDon chiTietHoaDon = shoeMapper.toChiTietHoaDon(request);
            chiTietHoaDon.setHoaDon(hoaDon);
            chiTietHoaDon.setChiTietSanPham(chiTietSanPham);
            chiTietHoaDon.setGia(gia);
            chiTietHoaDon.setTongTien(tongTien);

            ChiTietHoaDon saveChiTietHoaDon = chiTietHoaDonRepository.save(chiTietHoaDon);

            hoaDon.setTongTien(hoaDon.getTongTien() + tongTien);
            hoaDonRepository.save(hoaDon);

            return shoeMapper.toChiTietHoaDonResponse(saveChiTietHoaDon);
        }
    }

    @Override
    public void deleteChiTietHoaDon(Integer chiTietHoaDonId) {
        ChiTietHoaDon chiTietHoaDon = chiTietHoaDonRepository.findById(chiTietHoaDonId)
                .orElseThrow(() -> new RuntimeException("Chi tiết hóa đơn không tồn tại"));

        ChiTietSanPham chiTietSanPham = chiTietHoaDon.getChiTietSanPham();

        chiTietSanPham.setSoLuongTon(chiTietSanPham.getSoLuongTon() + chiTietHoaDon.getSoLuongMua());
        chiTietSanPhamRepository.save(chiTietSanPham);

        HoaDon hoaDon = chiTietHoaDon.getHoaDon();
        hoaDon.setTongTien(hoaDon.getTongTien() - chiTietHoaDon.getTongTien());
        hoaDonRepository.save(hoaDon);

        chiTietHoaDonRepository.delete(chiTietHoaDon);
    }

    @Override
    public ChiTietHoaDonResponse updateSoLuong(Integer chiTietHoaDonId, Integer soLuongMua) {
        // Lấy chi tiết hóa đơn cần cập nhật
        ChiTietHoaDon chiTietHoaDon = chiTietHoaDonRepository.findById(chiTietHoaDonId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy chi tiết hóa đơn với ID: " + chiTietHoaDonId));

        // Lấy chi tiết sản phẩm và số lượng tồn kho
        ChiTietSanPham chiTietSanPham = chiTietHoaDon.getChiTietSanPham();
        int soLuongTon = chiTietSanPham.getSoLuongTon();

        int soLuongHienTai = chiTietHoaDon.getSoLuongMua();
        int soLuongThayDoi = soLuongMua - soLuongHienTai;

        if (soLuongThayDoi > soLuongTon) {
            throw new RuntimeException("Số lượng mua vượt quá số lượng tồn kho");
        }
        // Kiểm tra điều kiện số lượng hợp lệ
        if (soLuongMua < 1) {
            throw new RuntimeException("Số lượng mua phải lớn hơn hoặc bằng 1");
        }
        // Cập nhật số lượng tồn kho của sản phẩm
        chiTietSanPham.setSoLuongTon(soLuongTon - soLuongThayDoi);
        chiTietSanPhamRepository.save(chiTietSanPham);

        // Cập nhật chi tiết hóa đơn với số lượng mới và tính lại thành tiền
        chiTietHoaDon.setSoLuongMua(soLuongMua);
        chiTietHoaDon.setTongTien(soLuongMua * chiTietHoaDon.getGia());

        // Lưu lại chi tiết hóa đơn đã cập nhật
        ChiTietHoaDon updateChiTiet = chiTietHoaDonRepository.save(chiTietHoaDon);

        // Tính lại tổng tiền của hóa đơn
        HoaDon hoaDon = chiTietHoaDon.getHoaDon();  // Lấy hóa đơn từ chi tiết hóa đơn
        double tongTienHoaDon = hoaDon.getChiTietHoaDons().stream()
                .mapToDouble(ChiTietHoaDon::getTongTien)
                .sum();

        // Cập nhật tổng tiền cho hóa đơn
        hoaDon.setTongTien(tongTienHoaDon);
        hoaDonRepository.save(hoaDon);  // Lưu lại hóa đơn với tổng tiền mới

        // Trả về kết quả cập nhật chi tiết hóa đơn
        return shoeMapper.toChiTietHoaDonResponse(updateChiTiet);
    }




}
