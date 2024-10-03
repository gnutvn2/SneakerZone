package com.example.shoe.service.impl;

import com.example.shoe.dto.request.DeGiayRequest;
import com.example.shoe.dto.response.DeGiayResponse;
import com.example.shoe.entity.DeGiay;
import com.example.shoe.mapper.ShoeMapper;
import com.example.shoe.repository.DeGiayRepository;
import com.example.shoe.service.DeGiayService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DeGiayServiceImpl implements DeGiayService {
    DeGiayRepository deGiayRepository;
    ShoeMapper shoeMapper;

    @Override
    public Page<DeGiay> getDeGiay(Pageable pageable) {
        return deGiayRepository.findAll(pageable);
    }

    @Override
    public DeGiay createDeGiay(DeGiayRequest request) {
        DeGiay deGiay = shoeMapper.toDeGiay(request);
        return deGiayRepository.save(deGiay);
    }

    @Override
    public DeGiayResponse getDeGiayId(Integer id) {
        DeGiay deGiay = deGiayRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Không tìm thấy id" + id));
        return shoeMapper.toDeGiayResponse(deGiay);
    }

    @Override
    public DeGiayResponse updateDeGiay(Integer id, DeGiayRequest request) {
        DeGiay deGiay = deGiayRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Không tìm thấy id" + id));
        shoeMapper.toUpdateDeGiay(deGiay, request);
        return shoeMapper.toDeGiayResponse(deGiayRepository.save(deGiay));
    }

    @Override
    public void deleteDeGiay(Integer id) {
        if (!deGiayRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy id " + id);
        }
        deGiayRepository.deleteById(id);
    }

    @Override
    public Page<DeGiay> searchDeGiay(String keyword, Pageable pageable) {
        return deGiayRepository.search(keyword, pageable);
    }
}
