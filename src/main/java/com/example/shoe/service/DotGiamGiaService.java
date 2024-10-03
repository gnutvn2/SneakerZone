package com.example.shoe.service;

import com.example.shoe.dto.request.DotGiamGiaRequest;
import com.example.shoe.dto.response.DotGiamGiaResponse;
import com.example.shoe.entity.DotGiamGia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface DotGiamGiaService {
    Page<DotGiamGia> getDotGiamGia(Pageable pageable);
    DotGiamGia createDotGiamGia(DotGiamGiaRequest request);
    DotGiamGiaResponse getDotGiamGiaId(Integer id);
    DotGiamGiaResponse updateDotGiamGia(Integer id, DotGiamGiaRequest request);
    void deleteDotGiamGiamGia(Integer id);
    Page<DotGiamGia> searchDotGiamGia(String keyword, Pageable pageable);
}
