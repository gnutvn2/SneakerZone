package com.example.shoe.service;

import com.example.shoe.dto.request.DotGiamGiaRequest;
import com.example.shoe.dto.response.DotGiamGiaResponse;
import com.example.shoe.entity.DotGiamGia;

import java.util.List;

public interface DotGiamGiaService {
    List<DotGiamGia> getDotGiamGia();
    DotGiamGia createDotGiamGia(DotGiamGiaRequest request);
    DotGiamGiaResponse getDotGiamGiaId(Integer id);
    DotGiamGiaResponse updateDotGiamGia(Integer id, DotGiamGiaRequest request);
    void deleteDotGiamGiamGia(Integer id);
}
