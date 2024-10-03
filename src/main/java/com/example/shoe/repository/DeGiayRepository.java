package com.example.shoe.repository;

import com.example.shoe.entity.DeGiay;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DeGiayRepository extends JpaRepository<DeGiay, Integer> {
    @Query("""
            select dg
            from DeGiay dg
            where dg.tenDeGiay like %:keyword%
            or dg.tenDeGiay like %:keyword%
            """)
    Page<DeGiay> search(@Param("keyword") String keyword, Pageable pageable);
}
