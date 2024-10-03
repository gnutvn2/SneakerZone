package com.example.shoe.service;

import com.example.shoe.dto.request.ThuongHieuRequest;
import com.example.shoe.dto.response.ThuongHieuResponse;
import com.example.shoe.entity.ThuongHieu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
public interface ThuongHieuService {
    Page<ThuongHieu> getThuongHieu(Pageable pageable);
    ThuongHieu createThuongHieu(ThuongHieuRequest request);
    ThuongHieuResponse getThuongHieuId(Integer id);
    ThuongHieuResponse updateThuongHieu(Integer id, ThuongHieuRequest request);
    void deleteThuongHieu(Integer id);
    Page<ThuongHieu> searchThuongHieu(String keyword, Pageable pageable);
}
