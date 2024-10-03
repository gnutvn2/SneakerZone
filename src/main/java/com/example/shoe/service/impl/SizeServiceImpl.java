package com.example.shoe.service.impl;

import com.example.shoe.dto.request.SizeRequest;
import com.example.shoe.dto.response.SizeResponse;
import com.example.shoe.entity.Size;
import com.example.shoe.mapper.ShoeMapper;
import com.example.shoe.repository.SizeRepository;
import com.example.shoe.service.SizeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SizeServiceImpl implements SizeService {
    SizeRepository sizeRepository;
    ShoeMapper shoeMapper;

    @Override
    public Page<Size> getSize(Pageable pageable) {
        return sizeRepository.findAll(pageable);
    }

    @Override
    public Size createSize(SizeRequest request) {
        Size size = shoeMapper.toSize(request);
        return sizeRepository.save(size);
    }

    @Override
    public SizeResponse getSizeId(Integer id) {
        Size size = sizeRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Không tìm thấy size id: " + id));
        return shoeMapper.toSizeResponse(size);
    }

    @Override
    public SizeResponse updateSize(Integer id, SizeRequest request) {
        Size size = sizeRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Không tìm thấy size id: " + id));
        shoeMapper.toUpdateSize(size, request);
        return shoeMapper.toSizeResponse(sizeRepository.save(size));
    }

    @Override
    public void deleteSize(Integer id) {
        if (!sizeRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy size id: " +id);
        }
        sizeRepository.deleteById(id);
    }

    @Override
    public Page<Size> searchSize(String keyword, Pageable pageable) {
        return sizeRepository.search(keyword, pageable);
    }
}
