package com.example.shoe.service;

import com.example.shoe.dto.request.DanhMucRequest;
import com.example.shoe.dto.response.DanhMucResponse;
import com.example.shoe.entity.DanhMuc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DanhMucService {
    public Page<DanhMuc> getDanhMuc(Pageable pageable);
    public DanhMuc createDanhMuc(DanhMucRequest request);
    public DanhMucResponse getDanhMucId(Integer id);
    public DanhMucResponse updateDanhMuc(Integer id, DanhMucRequest request);
    public void deleteDanhMuc(Integer id);
    public Page<DanhMuc> searchDanhMuc(String keyword, Pageable pageable);
    
}
