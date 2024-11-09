package com.example.shoe.service.impl;

import com.example.shoe.dto.request.KhachHangRequest;
import com.example.shoe.dto.response.KhachHangResponse;
import com.example.shoe.entity.KhachHang;
import com.example.shoe.mapper.ShoeMapper;
import com.example.shoe.repository.KhachHangRepository;
import com.example.shoe.service.KhachHangService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class KhachHangServiceImpl implements KhachHangService {
    KhachHangRepository khachHangRepository;
    ShoeMapper shoeMapper;

    @Override
    public Page<KhachHangResponse> getAllKhachHang(Pageable pageable, String keyword) {
        if (keyword != null && !keyword.isEmpty()) {
            return khachHangRepository.searchKhachHang(keyword, pageable)
                    .map(shoeMapper::toKhachHangResponse);
        }
        return khachHangRepository.findAll(pageable)
                .map(shoeMapper::toKhachHangResponse);
    }

    @Override
    public KhachHangResponse createKhachHang(KhachHangRequest request) {
        String generatedPassword = RandomStringUtils.randomAlphanumeric(8);
        request.setMatKhau(generatedPassword);
        KhachHang khachHang = shoeMapper.toKhachHang(request);
        return shoeMapper.toKhachHangResponse(khachHangRepository.save(khachHang));
    }

    @Override
    public KhachHangResponse getOneKhachHang(Integer khachHangId) {
        KhachHang khachHang = khachHangRepository.findById(khachHangId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng có id: " + khachHangId));
        return shoeMapper.toKhachHangResponse(khachHang);
    }

    @Override
    public KhachHangResponse updateKhachHang(Integer khachHangId, KhachHangRequest request) {
        KhachHang khachHang = khachHangRepository.findById(khachHangId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng có id: " + khachHangId));
        if (request.getMatKhau() == null || request.getMatKhau().isEmpty()) {
            request.setMatKhau(khachHang.getMatKhau());
        }
        shoeMapper.toUpdateKhachHang(khachHang, request);
        return shoeMapper.toKhachHangResponse(khachHangRepository.save(khachHang));
    }

    @Override
    public Boolean deleteKhachHang(Integer khachHangId) {
        if (!khachHangRepository.existsById(khachHangId)) {
            throw new RuntimeException("Không tìm thấy khách hàng");
        }
        khachHangRepository.deleteById(khachHangId);
        return true;
    }

    public KhachHang getOrCreateKhachLe() {
        return khachHangRepository.findByHoTen("Khách lẻ")
                .orElseGet(() -> {
                    KhachHang khachLe = new KhachHang();
                    khachLe.setMaKhachHang("N/A");
                    khachLe.setHoTen("Khách lẻ");
                    khachLe.setGioiTinh(true);
                    khachLe.setSoDienThoai("N/A");
                    khachLe.setMatKhau("N/A");
                    khachLe.setEmail("khachLe@gmail.com");
                    khachLe.setDiaChi("N/A");
                    return khachHangRepository.save(khachLe);
                });
    }

}
