package com.example.shoe.service;

import com.example.shoe.dto.request.VaiTroRequest;
import com.example.shoe.dto.response.VaiTroResponse;

import java.util.List;

public interface VaiTroService {
    List<VaiTroResponse> getAllVaiTro();
    VaiTroResponse createVaiTro(VaiTroRequest request);
    VaiTroResponse getOneVaiTro(Integer vaiTroId);
    VaiTroResponse updateVaiTro(Integer vaiTroId, VaiTroRequest request);
    void deleteVaiTro(Integer vaiTroId);
}
