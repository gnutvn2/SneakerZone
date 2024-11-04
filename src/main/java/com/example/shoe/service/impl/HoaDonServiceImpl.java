package com.example.shoe.service.impl;

import com.example.shoe.dto.request.HoaDonRequest;
import com.example.shoe.dto.response.HoaDonResponse;
import com.example.shoe.entity.HoaDon;
import com.example.shoe.mapper.ShoeMapper;
import com.example.shoe.repository.HoaDonRepository;
import com.example.shoe.service.HoaDonService;
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

        hoaDon.setMaHoaDon(generatedMaHoaDon);
        hoaDon.setNgayTao(LocalDateTime.now());
        hoaDon.setTongTien(0.0);
        hoaDon.setTrangThai("Chưa thanh toán");

        HoaDon saveHoaDon = hoaDonRepository.save(hoaDon);
        return shoeMapper.toHoaDonResponse(saveHoaDon);
    }

    @Override
    public HoaDonResponse getOneHoaDon(Integer hoaDonId) {
        return null;
    }
}
