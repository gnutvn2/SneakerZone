package com.example.shoe.service.impl;

import com.example.shoe.dto.request.ThuongHieuRequest;
import com.example.shoe.dto.response.ThuongHieuResponse;
import com.example.shoe.entity.ThuongHieu;
import com.example.shoe.mapper.ShoeMapper;
import com.example.shoe.repository.ThuongHieuRepository;
import com.example.shoe.service.ThuongHieuService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ThuongHieuServiceImpl implements ThuongHieuService {
    ThuongHieuRepository thuongHieuRepository;
    ShoeMapper shoeMapper;

    @Override
    public Page<ThuongHieu> getThuongHieu(Pageable pageable) {
        return thuongHieuRepository.findAll(pageable);
    }

    @Override
    public ThuongHieu createThuongHieu(ThuongHieuRequest request) {
        ThuongHieu thuongHieu = shoeMapper.toThuongHieu(request);
        return thuongHieuRepository.save(thuongHieu);
    }

    @Override
    public ThuongHieuResponse getThuongHieuId(Integer id) {
        ThuongHieu thuongHieu = thuongHieuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thương hiệu có id vừa nhập!"));
        return shoeMapper.toThuongHieuResponse(thuongHieu);
    }

    @Override
    public ThuongHieuResponse updateThuongHieu(Integer id, ThuongHieuRequest request) {
        ThuongHieu thuongHieu = thuongHieuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thương hiệu có id vừa nhập!"));
        shoeMapper.toUpdateThuongHieu(thuongHieu, request);
        return shoeMapper.toThuongHieuResponse(thuongHieuRepository.save(thuongHieu));
    }

    @Override
    public void deleteThuongHieu(Integer id) {
        if (!thuongHieuRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy id thương hiệu muốn xóa!");
        }
        thuongHieuRepository.deleteById(id);
    }

    @Override
    public Page<ThuongHieu> searchThuongHieu(String keyword, Pageable pageable) {
        return thuongHieuRepository.searchThuongHieu(keyword, pageable);
    }
}
