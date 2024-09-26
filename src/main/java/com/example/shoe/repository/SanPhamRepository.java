package com.example.shoe.repository;

import com.example.shoe.entity.SanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, Integer> {

    @Query("SELECT sp FROM SanPham sp WHERE sp.trangThai = :trangThai")
    Page<SanPham> hienThi(@Param("trangThai") Boolean trangThai, Pageable pageable);
    Page<SanPham> findByTrangThai(Boolean trangThai, Pageable pageable);

}
