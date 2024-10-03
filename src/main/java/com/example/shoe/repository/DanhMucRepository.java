package com.example.shoe.repository;

import com.example.shoe.entity.DanhMuc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface DanhMucRepository extends JpaRepository<DanhMuc, Integer> {

    boolean existsByMaDanhMuc(String maDanhMuc);
    @Query("""
            select dm
            from DanhMuc dm
            where dm.maDanhMuc like %:keyword%
            or dm.tenDanhMuc like  %:keyword%
            """)
    Page<DanhMuc> search(@Param("keyword") String keyword, Pageable pageable);
}
