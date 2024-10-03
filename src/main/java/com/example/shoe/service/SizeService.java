package com.example.shoe.service;

import com.example.shoe.dto.request.SizeRequest;
import com.example.shoe.dto.response.SizeResponse;
import com.example.shoe.entity.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SizeService {
    Page<Size> getSize(Pageable pageable);
    Size createSize(SizeRequest request);
    SizeResponse getSizeId(Integer id);
    SizeResponse updateSize(Integer id, SizeRequest request);
    void deleteSize(Integer id);
    Page<Size> searchSize(String keyword, Pageable pageable);
}
