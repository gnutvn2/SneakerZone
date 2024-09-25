package com.example.shoe.repository;

import com.example.shoe.entity.DotGiamGia;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DotGiamGiaRepository extends JpaRepository<DotGiamGia, Integer> {
    boolean existsByTenDotGiamGia(String tenDotGiamGia);
}
