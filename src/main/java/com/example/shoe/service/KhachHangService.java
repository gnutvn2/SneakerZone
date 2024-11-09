package com.example.shoe.service;

import com.example.shoe.dto.request.KhachHangRequest;
import com.example.shoe.dto.response.KhachHangResponse;
import com.example.shoe.entity.KhachHang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface KhachHangService {
    Page<KhachHangResponse> getAllKhachHang(Pageable pageable, String keyword);
    KhachHangResponse createKhachHang(KhachHangRequest request);
    KhachHangResponse getOneKhachHang(Integer khachHangId);
    KhachHangResponse updateKhachHang(Integer khachHangId, KhachHangRequest request);
    Boolean deleteKhachHang(Integer khachHangId);
    KhachHang getOrCreateKhachLe();
}
