package com.example.shoe.service;

import com.example.shoe.dto.request.ChiTietSanPhamRequest;
import com.example.shoe.dto.response.ChiTietSanPhamResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface ChiTietSanPhamService {
    Page<ChiTietSanPhamResponse> getAllChiTietSanPhamBySanPhamId(Integer sanPhamId, Pageable pageable);

    ChiTietSanPhamResponse getChiTietSanPhamByIdAndSanPhamId(Integer chiTietSanPhamId, Integer sanPhamId);

    ChiTietSanPhamResponse createChiTietSanPhamBySanPhamId(Integer sanPhamId,ChiTietSanPhamRequest request);

    ChiTietSanPhamResponse updateChiTietSanPhamBySanPhamId(
            Integer sanPhamId,
            Integer ChiTietSanPhamId,
            ChiTietSanPhamRequest request,
            MultipartFile hinhAnh);

    void deleteChiTietSanPhamBySanPhamId(Integer sanPhamId, Integer chiTietSanPhamId);

    Page<ChiTietSanPhamResponse> searchChiTietSanPham(Integer sanPhamId, String keyword, Pageable pageable);
    Page<ChiTietSanPhamResponse> getAll(Boolean trangThai, String keyword, Pageable pageable);
}
