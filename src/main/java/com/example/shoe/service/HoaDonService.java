package com.example.shoe.service;

import com.example.shoe.dto.request.HoaDonRequest;
import com.example.shoe.dto.response.HoaDonResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HoaDonService {
    Page<HoaDonResponse> getAllHoaDonByTrangThai(String trangThai, Pageable pageable);
    HoaDonResponse createHoaDon(HoaDonRequest request);
    HoaDonResponse getOneHoaDon(Integer hoaDonId);
}
