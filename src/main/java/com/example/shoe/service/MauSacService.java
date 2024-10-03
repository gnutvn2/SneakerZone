package com.example.shoe.service;

import com.example.shoe.dto.request.MauSacRequest;
import com.example.shoe.dto.response.MauSacResponse;
import com.example.shoe.entity.MauSac;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MauSacService {
    Page<MauSac> getMauSac(Pageable pageable);
    MauSac createMauSac(MauSacRequest request);
    MauSacResponse getMauSacId(Integer id);
    MauSacResponse updateMauSac(Integer id, MauSacRequest request);
    void deleteMauSac(Integer id);
    Page<MauSac> searchMauSac(String keyword, Pageable pageable);
}
