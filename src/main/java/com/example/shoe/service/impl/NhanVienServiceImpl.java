package com.example.shoe.service.impl;

import com.example.shoe.dto.request.NhanVienRequest;
import com.example.shoe.dto.response.NhanVienResponse;
import com.example.shoe.entity.NhanVien;
import com.example.shoe.entity.VaiTro;
import com.example.shoe.mapper.ShoeMapper;
import com.example.shoe.repository.NhanVienRepository;
import com.example.shoe.repository.VaiTroRepository;
import com.example.shoe.service.NhanVienService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NhanVienServiceImpl implements NhanVienService {
    NhanVienRepository nhanVienRepository;
    VaiTroRepository vaiTroRepository;
    ShoeMapper shoeMapper;

    @Override
    public List<NhanVienResponse> getAllNhanVien(Boolean trangThai) {
        List<NhanVien> nhanVien;
        if (trangThai != null) {
            nhanVien = nhanVienRepository.findByTrangThai(trangThai);
        } else {
            nhanVien = nhanVienRepository.findAll();
        }
        return nhanVien.stream()
                .map(shoeMapper::toNhanVienResponse)
                .collect(Collectors.toList());
    }

    @Override
    public NhanVienResponse createNhanVien(NhanVienRequest request) {
        String generatedPassword = RandomStringUtils.randomAlphanumeric(8);
        request.setMatKhau(generatedPassword);
        NhanVien nhanVien = shoeMapper.toNhanVien(request);
        if (request.getVaiTroId() != null) {
            VaiTro vaiTro = vaiTroRepository.findById(request.getVaiTroId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy vai trò"));
            nhanVien.setVaiTro(vaiTro);
        }
        return shoeMapper.toNhanVienResponse(nhanVienRepository.save(nhanVien));
    }

    @Override
    public NhanVienResponse getOneNhanVien(Integer nhanVienId) {
        NhanVien nhanVien = nhanVienRepository.findById(nhanVienId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên"));
        return shoeMapper.toNhanVienResponse(nhanVien);
    }

    @Override
    public NhanVienResponse updateNhanVien(Integer nhanVienId, NhanVienRequest request) {
        NhanVien nhanVien = nhanVienRepository.findById(nhanVienId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên"));
        if (request.getMatKhau() == null || request.getMatKhau().isEmpty()) {
            request.setMatKhau(nhanVien.getMatKhau());
        }

        VaiTro vaiTro = vaiTroRepository.findById(request.getVaiTroId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy vai trò với ID: " + request.getVaiTroId()));
        nhanVien.setVaiTro(vaiTro);

        shoeMapper.toUpdateNhanVien(nhanVien, request);
        return shoeMapper.toNhanVienResponse(nhanVienRepository.save(nhanVien));
    }

    @Override
    public Boolean changeStatus(Integer nhanVienId) {
        NhanVien nhanVien = nhanVienRepository.findById(nhanVienId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên"));
        nhanVien.setTrangThai(!nhanVien.getTrangThai());
        nhanVienRepository.save(nhanVien);
        return nhanVien.getTrangThai();
    }

}
