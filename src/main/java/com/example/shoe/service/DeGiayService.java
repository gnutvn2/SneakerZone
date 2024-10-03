package com.example.shoe.service;

import com.example.shoe.dto.request.DeGiayRequest;
import com.example.shoe.dto.response.DeGiayResponse;
import com.example.shoe.entity.DeGiay;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DeGiayService {
    Page<DeGiay> getDeGiay(Pageable pageable);
    DeGiay createDeGiay(DeGiayRequest request);
    DeGiayResponse getDeGiayId(Integer id);
    DeGiayResponse updateDeGiay(Integer id, DeGiayRequest request);
    void deleteDeGiay(Integer id);
    Page<DeGiay> searchDeGiay(String keyword, Pageable pageable);
}
