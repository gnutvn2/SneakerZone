package com.example.shoe.service;

import com.example.shoe.dto.request.ChiTietHoaDonRequest;
import com.example.shoe.dto.response.ChiTietHoaDonResponse;

import java.util.List;

public interface ChiTietHoaDonService {
    List<ChiTietHoaDonResponse> getAllChiTietHoaDonByHoaDonId(Integer hoaDonId);
    ChiTietHoaDonResponse createChiTietHoaDon(ChiTietHoaDonRequest request);
    void deleteChiTietHoaDon(Integer chiTietHoaDonId);
}
