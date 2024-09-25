package com.example.shoe.service;

import com.example.shoe.dto.request.DeGiayRequest;
import com.example.shoe.dto.response.DeGiayResponse;
import com.example.shoe.entity.DeGiay;

import java.util.List;

public interface DeGiayService {
    List<DeGiay> getDeGiay();
    DeGiay createDeGiay(DeGiayRequest request);
    DeGiayResponse getDeGiayId(Integer id);
    DeGiayResponse updateDeGiay(Integer id, DeGiayRequest request);
    void deleteDeGiay(Integer id);
}
