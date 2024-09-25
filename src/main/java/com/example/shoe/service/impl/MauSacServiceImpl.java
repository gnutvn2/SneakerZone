package com.example.shoe.service.impl;

import com.example.shoe.dto.request.MauSacRequest;
import com.example.shoe.dto.response.MauSacResponse;
import com.example.shoe.entity.MauSac;
import com.example.shoe.mapper.ShoeMapper;
import com.example.shoe.repository.MauSacRepository;
import com.example.shoe.service.MauSacService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class MauSacServiceImpl implements MauSacService {
    MauSacRepository mauSacRepository;
    ShoeMapper shoeMapper;

    @Override
    public List<MauSac> getMauSac() {
        return mauSacRepository.findAll();
    }

    @Override
    public MauSac createMauSac(MauSacRequest request) {
        if (mauSacRepository.existsByTenMauSac(request.getTenMauSac())) {
            throw new RuntimeException("Tên màu sắc này đã tồn tại. Vui lòng nhập tên màu khác!");
        }
        MauSac mauSac = shoeMapper.toMauSac(request);
        return mauSacRepository.save(mauSac);
    }

    @Override
    public MauSacResponse getMauSacId(Integer id) {
        MauSac mauSac = mauSacRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy id: " + id));
        return shoeMapper.toMauSacResponse(mauSac);
    }

    @Override
    public MauSacResponse updateMauSac(Integer id, MauSacRequest request) {
        MauSac mauSac = mauSacRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy id: " + id));
        shoeMapper.toUpdateMauSac(mauSac, request);
        return shoeMapper.toMauSacResponse(mauSac);
    }

    @Override
    public void deleteMauSac(Integer id) {
        if (!mauSacRepository.existsById(id)){
            throw new RuntimeException("Không tìm thấy id " + id + "màu sắc muốn xóa!");
        }
        mauSacRepository.deleteById(id);
    }
}
