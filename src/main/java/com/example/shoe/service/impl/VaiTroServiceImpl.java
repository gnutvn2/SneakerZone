package com.example.shoe.service.impl;

import com.example.shoe.dto.request.VaiTroRequest;
import com.example.shoe.dto.response.VaiTroResponse;
import com.example.shoe.entity.VaiTro;
import com.example.shoe.mapper.ShoeMapper;
import com.example.shoe.repository.VaiTroRepository;
import com.example.shoe.service.VaiTroService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VaiTroServiceImpl implements VaiTroService {
    VaiTroRepository vaiTroRepository;
    ShoeMapper shoeMapper;

    @Override
    public List<VaiTroResponse> getAllVaiTro() {
        List<VaiTro> vaiTro = vaiTroRepository.findAll();
        return vaiTro.stream()
                .map(shoeMapper::toVaiTroResponse)
                .collect(Collectors.toList());
    }

    @Override
    public VaiTroResponse createVaiTro(VaiTroRequest request) {
        VaiTro vaiTro = shoeMapper.toVaiTro(request);
        return shoeMapper.toVaiTroResponse(vaiTroRepository.save(vaiTro));
    }

    @Override
    public VaiTroResponse getOneVaiTro(Integer vaiTroId) {
        VaiTro vaiTro = vaiTroRepository.findById(vaiTroId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy vai trò"));
        return shoeMapper.toVaiTroResponse(vaiTro);
    }

    @Override
    public VaiTroResponse updateVaiTro(Integer vaiTroId, VaiTroRequest request) {
        VaiTro vaiTro = vaiTroRepository.findById(vaiTroId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy vai trò"));
        shoeMapper.toUpdateVaiTro(vaiTro, request);
        return shoeMapper.toVaiTroResponse(vaiTroRepository.save(vaiTro));
    }

    @Override
    public void deleteVaiTro(Integer vaiTroId) {
        if (!vaiTroRepository.existsById(vaiTroId)) {
            throw new RuntimeException("Không tìm thấy vai trò id: " + vaiTroId);
        }
        vaiTroRepository.deleteById(vaiTroId);
    }
}
