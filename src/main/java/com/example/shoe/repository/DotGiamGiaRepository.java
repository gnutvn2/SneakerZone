package com.example.shoe.repository;

import com.example.shoe.entity.DotGiamGia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DotGiamGiaRepository extends JpaRepository<DotGiamGia, Integer> {
    @Query("""
            SELECT dgg
            FROM DotGiamGia dgg
            where dgg.maDotGiamGia like %:keyword%
            or dgg.tenDotGiamGia like %:keyword%
            """)
    Page<DotGiamGia> seacrh(@Param("keyword") String keyword, Pageable pageable);
}
