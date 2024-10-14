package com.example.shoe.service;

import com.example.shoe.dto.request.ChiTietSanPhamRequest;
import com.example.shoe.dto.response.ChiTietSanPhamResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ChiTietSanPhamService {
    Page<ChiTietSanPhamResponse> getAllChiTietSanPham(Pageable pageable);

    ChiTietSanPhamResponse getChiTietSanPhamById(Integer id);

    ChiTietSanPhamResponse createChiTietSanPham(ChiTietSanPhamRequest request);

    ChiTietSanPhamResponse updateChiTietSanPham(Integer id, ChiTietSanPhamRequest request);

    void deleteChiTietSanPham(Integer id);

    Page<ChiTietSanPhamResponse> searchChiTietSanPham(String keyword, Pageable pageable);

    Page<ChiTietSanPhamResponse> filterChiTietSanPham(String maChiTietSanPham,
                                                      Optional<Integer> sanPhamId,
                                                      Optional<Integer> sizeId,
                                                      Optional<Integer> mauSacId,
                                                      Optional<Integer> chatLieuId,
                                                      Optional<Double> giaMin,
                                                      Optional<Double> giaMax,
                                                      Optional<Integer> deGiayId,
                                                      Pageable pageable);

}
