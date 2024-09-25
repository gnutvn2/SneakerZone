package com.example.shoe.service.impl;

import com.example.shoe.dto.request.DotGiamGiaRequest;
import com.example.shoe.dto.response.DotGiamGiaResponse;
import com.example.shoe.entity.DotGiamGia;
import com.example.shoe.mapper.ShoeMapper;
import com.example.shoe.repository.DotGiamGiaRepository;
import com.example.shoe.service.DotGiamGiaService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class DotGiamGiaServiceImpl implements DotGiamGiaService {
    DotGiamGiaRepository dotGiamGiaRepository;
    ShoeMapper shoeMapper;

    @Override
    public List<DotGiamGia> getDotGiamGia() {
        return dotGiamGiaRepository.findAll();
    }

    @Override
    public DotGiamGia createDotGiamGia(DotGiamGiaRequest request) {
        if (dotGiamGiaRepository.existsByTenDotGiamGia(request.getTenDotGiamGia())){
            throw new RuntimeException("Đợt giảm giá này đã tồn tại. Vui lòng nhập tên đợt giảm giá khác!");
        }
        DotGiamGia dotGiamGia = shoeMapper.toDotGiamGia(request);
        return dotGiamGiaRepository.save(dotGiamGia);
    }

    @Override
    public DotGiamGiaResponse getDotGiamGiaId(Integer id) {
        DotGiamGia dotGiamGia = dotGiamGiaRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Không tìm thấy id: " + id));
        return shoeMapper.toDotGiamGiaResponse(dotGiamGia);
    }

    @Override
    public DotGiamGiaResponse updateDotGiamGia(Integer id, DotGiamGiaRequest request) {
        DotGiamGia dotGiamGia = dotGiamGiaRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Không tìm thấy id: " + id));
        shoeMapper.toUpdateDotGiamGia(dotGiamGia, request);
        return shoeMapper.toDotGiamGiaResponse(dotGiamGiaRepository.save(dotGiamGia));
    }

    @Override
    public void deleteDotGiamGiamGia(Integer id) {
        if (!dotGiamGiaRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy id " + id);
        }
        dotGiamGiaRepository.deleteById(id);
    }
}
