package com.example.shoe.repository;

import com.example.shoe.entity.ThuongHieu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ThuongHieuRepository extends JpaRepository<ThuongHieu, Integer> {
    @Query("""
        select th
        from ThuongHieu th
        where (th.maThuongHieu like %:keyword%)
        or (th.tenThuongHieu like %:keyword%)
        """)
    Page<ThuongHieu> searchThuongHieu(String keyword, Pageable pageable);
}
