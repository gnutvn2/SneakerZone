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

    //Get product by status active
    @Query("""
            SELECT sp FROM SanPham sp
            WHERE sp.trangThai = true
            """)
    Page<SanPham> findActiveProducts(Pageable pageable);

    //Get product by status inactive
    @Query("""
            SELECT sp FROM SanPham sp
            WHERE sp.trangThai = false
            """)
    Page<SanPham> findInactiveProducts(Pageable pageable);

    //Search products by keyword
    @Query("""
            SELECT sp
            FROM SanPham sp
            WHERE (:trangThai IS NULL OR sp.trangThai = :trangThai)
            AND (:keyword IS NULL OR :keyword = ''
            OR sp.maSanPham LIKE %:keyword%
            OR sp.tenSanPham LIKE %:keyword%
            OR sp.danhMuc.tenDanhMuc LIKE %:keyword%
            OR sp.thuongHieu.tenThuongHieu LIKE %:keyword%)
            """)
    Page<SanPham> search(@Param("keyword") String keyword, @Param("trangThai") Boolean trangThai, Pageable pageable);



}
