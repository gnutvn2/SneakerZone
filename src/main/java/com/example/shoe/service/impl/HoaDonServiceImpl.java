package com.example.shoe.service.impl;

import com.example.shoe.dto.request.HoaDonRequest;
import com.example.shoe.dto.response.HoaDonResponse;
import com.example.shoe.entity.ChiTietHoaDon;
import com.example.shoe.entity.HoaDon;
import com.example.shoe.entity.KhachHang;
import com.example.shoe.entity.NhanVien;
import com.example.shoe.mapper.ShoeMapper;
import com.example.shoe.repository.ChiTietHoaDonRepository;
import com.example.shoe.repository.HoaDonRepository;
import com.example.shoe.repository.KhachHangRepository;
import com.example.shoe.repository.NhanVienRepository;
import com.example.shoe.service.HoaDonService;
import com.example.shoe.service.KhachHangService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class HoaDonServiceImpl implements HoaDonService {
    HoaDonRepository hoaDonRepository;
    NhanVienRepository nhanVienRepository;
    KhachHangRepository khachHangRepository;
    ChiTietHoaDonRepository chiTietHoaDonRepository;
    KhachHangService khachHangService;
    ShoeMapper shoeMapper;

    @Override
    public Page<HoaDonResponse> getAllHoaDonByTrangThai(String trangThai, Pageable pageable) {
        Page<HoaDon> hoaDon = hoaDonRepository.findAllByTrangThai(trangThai, pageable);
        return hoaDon.map(shoeMapper::toHoaDonResponse);
    }

    @Override
    public HoaDonResponse createHoaDon(HoaDonRequest request) {
        HoaDon hoaDon = shoeMapper.toHoaDon(request);
        String generatedMaHoaDon = RandomStringUtils.randomAlphanumeric(6);

        NhanVien nhanVien = nhanVienRepository.findById(1)
                .orElseThrow(() -> new RuntimeException("Nhân viên không tồn tại"));

        KhachHang khachHang;
        if (request.getKhachHangId() != null) {
            khachHang = khachHangRepository.findById(request.getKhachHangId())
                    .orElseThrow(() -> new RuntimeException("Khách hàng không tồn tại"));
        } else {
            khachHang = khachHangService.getOrCreateKhachLe();
        }

        hoaDon.setMaHoaDon(generatedMaHoaDon);
        hoaDon.setNgayTao(LocalDateTime.now());
        hoaDon.setTongTien(0.0);
        hoaDon.setTienThanhToan(0.0);
        hoaDon.setTienThua(0.0);
        hoaDon.setTrangThai("Chưa thanh toán");
        hoaDon.setNhanVien(nhanVien);
        hoaDon.setKhachHang(khachHang);

        HoaDon saveHoaDon = hoaDonRepository.save(hoaDon);

        HoaDonResponse response = shoeMapper.toHoaDonResponse(saveHoaDon);
        response.setTienThanhToan(0.0);
        response.setTienThua(0.0);

        return response;
    }

    @Override
    public HoaDonResponse getOneHoaDon(Integer hoaDonId) {
        HoaDon hoaDon = hoaDonRepository.findById(hoaDonId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hóa đơn có id: " + hoaDonId));
        return shoeMapper.toHoaDonResponse(hoaDon);
    }

    @Override
    public HoaDonResponse updateHoaDon(Integer hoaDonId, HoaDonRequest request) {
        HoaDon hoaDon = hoaDonRepository.findById(hoaDonId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hóa đơn có id: " + hoaDonId));

        if (request.getKhachHangId() != null) {
            KhachHang khachHang = khachHangRepository.findById(request.getKhachHangId())
                    .orElseThrow(() -> new RuntimeException("Khách hàng không tồn tại"));
            hoaDon.setKhachHang(khachHang);
        }

        if (request.getTienThanhToan() != null) {
            double tienThanhToan = request.getTienThanhToan();
            double tongTien = hoaDon.getTongTien();

            if (tienThanhToan < tongTien) {
                throw new RuntimeException("Tiền thanh toán không đủ để thanh toán hóa đơn.");
            }

            hoaDon.setTienThanhToan(tienThanhToan);

            double tienThua = tienThanhToan - tongTien;
            hoaDon.setTienThua(tienThua);
        } else {
            hoaDon.setTienThua(0.0);
        }

        if (hoaDon.getTienThanhToan() != null && hoaDon.getTienThanhToan() >= hoaDon.getTongTien()) {
            hoaDon.setTrangThai("Đã thanh toán");
        }

        if (request.getTrangThai() != null) {
            hoaDon.setTrangThai(request.getTrangThai());
        }

        HoaDon updatedHoaDon = hoaDonRepository.save(hoaDon);

        HoaDonResponse response = shoeMapper.toHoaDonResponse(updatedHoaDon);
        response.setTienThanhToan(updatedHoaDon.getTienThanhToan());
        response.setTienThua(updatedHoaDon.getTienThua());

        return response;
    }

    @Override
    public void deleteHoaDon(Integer hoaDonId) {
        HoaDon hoaDon = hoaDonRepository.findById(hoaDonId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hóa đơn có id: " + hoaDonId));
        if ("Đã thanh toán".equals(hoaDon.getTrangThai())) {
            throw new IllegalStateException("Không thể xóa hóa đơn đã thanh toán.");
        }
        hoaDonRepository.deleteById(hoaDonId);
    }
}
