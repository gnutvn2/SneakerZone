package com.example.shoe.service;

import com.example.shoe.dto.request.SanPhamRequest;
import com.example.shoe.dto.response.SanPhamResponse;
import com.example.shoe.entity.SanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SanPhamService {
    Page<SanPham> getSanPham(Boolean trangThai, Pageable pageable);
    SanPham createSanPham(SanPhamRequest request);
    SanPhamResponse getSanPhamId(Integer id);
    SanPhamResponse updateSanPham(Integer id, SanPhamRequest request);
    Boolean updateTrangThai(Integer id);
    Page<SanPham> searchSanPham(String keyword, Pageable pageable);
}
