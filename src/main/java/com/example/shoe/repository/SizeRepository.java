package com.example.shoe.repository;

import com.example.shoe.entity.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SizeRepository extends JpaRepository<Size, Integer> {
    @Query("""
                SELECT s
                from Size s
                where s.maSize like %:keyword%
                or s.tenSize like %:keyword%
            """)
    Page<Size> search(@Param("keyword") String keyword, Pageable pageable);
}
