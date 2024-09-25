package com.example.shoe.service;

import com.example.shoe.dto.request.SizeRequest;
import com.example.shoe.dto.response.SizeResponse;
import com.example.shoe.entity.Size;

import java.util.List;

public interface SizeService {
    List<Size> getSize();
    Size createSize(SizeRequest request);
    SizeResponse getSizeId(Integer id);
    SizeResponse updateSize(Integer id, SizeRequest request);
    void deleteSize(Integer id);
}
