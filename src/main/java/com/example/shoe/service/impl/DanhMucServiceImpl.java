package com.example.shoe.service.impl;

import com.example.shoe.dto.request.DanhMucRequest;
import com.example.shoe.dto.response.DanhMucResponse;
import com.example.shoe.entity.DanhMuc;
import com.example.shoe.mapper.ShoeMapper;
import com.example.shoe.repository.DanhMucRepository;
import com.example.shoe.service.DanhMucService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor

public class DanhMucServiceImpl implements DanhMucService {

    DanhMucRepository danhMucRepository;
    ShoeMapper shoeMapper;

    @Override
    public Page<DanhMuc> getDanhMuc(Pageable pageable) {
        return danhMucRepository.findAll(pageable);
    }

    @Override
    public DanhMuc createDanhMuc(DanhMucRequest request) {
        if (danhMucRepository.existsByMaDanhMuc(request.getMaDanhMuc())) {
            throw new RuntimeException("Mã danh mục đã tồn tại!");
        }
        DanhMuc danhMuc = shoeMapper.toDanhMuc(request);
        return danhMucRepository.save(danhMuc);
    }

    @Override
    public DanhMucResponse getDanhMucId(Integer id) {
        DanhMuc danhMuc = danhMucRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục có id vừa nhập"));
        return shoeMapper.toDanhMucResponse(danhMuc);
    }

    @Override
    public DanhMucResponse updateDanhMuc(Integer id, DanhMucRequest request) {
        DanhMuc danhMuc = danhMucRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục có id vừa nhập"));
        shoeMapper.toUpdateDanhMuc(danhMuc, request);
        return shoeMapper.toDanhMucResponse(danhMucRepository.save(danhMuc));
    }

    @Override
    public void deleteDanhMuc(Integer id) {
        if (!danhMucRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy danh mục có id muốn xóa");
        }
        danhMucRepository.deleteById(id);
    }

    @Override
    public Page<DanhMuc> searchDanhMuc(String keyword, Pageable pageable) {
        return danhMucRepository.search(keyword, pageable);
    }


}
