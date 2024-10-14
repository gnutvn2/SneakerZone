package com.example.shoe.service;

import com.example.shoe.dto.request.SanPhamRequest;
import com.example.shoe.dto.response.SanPhamResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SanPhamService {
    Page<SanPhamResponse> getSanPhamByStatus(Boolean trangThai, Pageable pageable);

    SanPhamResponse createSanPham(SanPhamRequest request);

    SanPhamResponse getSanPhamById(Integer id);

    SanPhamResponse updateSanPham(Integer id, SanPhamRequest request);

   void deleteSanPham(Integer id);

    Page<SanPhamResponse> searchSanPham(String keyword, Boolean trangThai, Pageable pageable);
}
