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


}
