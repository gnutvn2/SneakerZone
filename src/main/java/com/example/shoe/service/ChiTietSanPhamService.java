package com.example.shoe.service;

import com.example.shoe.dto.request.ChiTietSanPhamRequest;
import com.example.shoe.dto.response.ChiTietSanPhamResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ChiTietSanPhamService {
    Page<ChiTietSanPhamResponse> getAllChiTietSanPhamBySanPhamId(Integer id, Pageable pageable);

    ChiTietSanPhamResponse getChiTietSanPhamById(Integer id);

    ChiTietSanPhamResponse createChiTietSanPham(ChiTietSanPhamRequest request);

    ChiTietSanPhamResponse updateChiTietSanPham(Integer id, ChiTietSanPhamRequest request);

    void deleteChiTietSanPham(Integer id);

    Page<ChiTietSanPhamResponse> searchChiTietSanPham(String keyword, Pageable pageable);
}
