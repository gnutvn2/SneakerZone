package com.example.shoe.service;

import com.example.shoe.dto.request.MauSacRequest;
import com.example.shoe.dto.response.MauSacResponse;
import com.example.shoe.entity.MauSac;

import java.util.List;

public interface MauSacService {
    List<MauSac> getMauSac();
    MauSac createMauSac(MauSacRequest request);
    MauSacResponse getMauSacId(Integer id);
    MauSacResponse updateMauSac(Integer id, MauSacRequest request);
    void deleteMauSac(Integer id);
}
