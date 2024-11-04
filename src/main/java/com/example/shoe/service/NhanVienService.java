package com.example.shoe.service;

import com.example.shoe.dto.request.NhanVienRequest;
import com.example.shoe.dto.response.NhanVienResponse;
import java.util.List;

public interface NhanVienService {
    List<NhanVienResponse> getAllNhanVien(Boolean trangThai);
    NhanVienResponse createNhanVien(NhanVienRequest request);
    NhanVienResponse getOneNhanVien(Integer nhanVienId);
    NhanVienResponse updateNhanVien(Integer nhanVienId, NhanVienRequest request);
    Boolean changeStatus(Integer nhanVienId);
}
