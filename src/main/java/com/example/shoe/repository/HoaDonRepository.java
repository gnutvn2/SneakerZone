package com.example.shoe.repository;

import com.example.shoe.entity.HoaDon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, Integer> {
    Page<HoaDon> findAllByTrangThai(String trangThai, Pageable pageable);
}
