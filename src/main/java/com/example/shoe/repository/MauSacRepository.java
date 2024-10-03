package com.example.shoe.repository;

import com.example.shoe.entity.MauSac;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MauSacRepository extends JpaRepository<MauSac, Integer> {
    @Query("""
            select ms
            from MauSac ms
            where ms.maMauSac like %:keyword%
            or ms.tenMauSac like %:keyword%
            """)
    Page<MauSac> search(@Param("keyword") String keyword, Pageable pageable);
}
