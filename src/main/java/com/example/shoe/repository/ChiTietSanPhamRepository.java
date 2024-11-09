package com.example.shoe.repository;

import com.example.shoe.entity.ChiTietSanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChiTietSanPhamRepository extends JpaRepository<ChiTietSanPham, Integer> {

    @Query("""
            SELECT ctsp
            FROM ChiTietSanPham ctsp
            WHERE ctsp.sanPham.id = :sanPhamId
            """)
    Page<ChiTietSanPham> findBySanPhamId(@Param("sanPhamId") Integer sanPhamId, Pageable pageable);

    Optional<ChiTietSanPham> findByIdAndSanPhamId(Integer chiTietSanPhamId, Integer sanPhamId);

    @Query("""
            SELECT ctsp FROM ChiTietSanPham ctsp
            WHERE ctsp.sanPham.id = :sanPhamId
            AND (
                ctsp.maChiTietSanPham LIKE %:keyword%
                OR ctsp.tenChiTietSanPham LIKE %:keyword%
                OR (ctsp.mauSac IS NOT NULL AND ctsp.mauSac.tenMauSac LIKE %:keyword%)
                OR (ctsp.size IS NOT NULL AND ctsp.size.tenSize LIKE %:keyword%)
                OR (ctsp.deGiay IS NOT NULL AND ctsp.deGiay.tenDeGiay LIKE %:keyword%)
                OR (ctsp.chatLieu IS NOT NULL AND ctsp.chatLieu.tenChatLieu LIKE %:keyword%)
            )
            """)
    Page<ChiTietSanPham> searchChiTietSanPhamBySanPhamId(
            @Param("sanPhamId") Integer sanPhamId,
            @Param("keyword") String keyword,
            Pageable pageable);

    @Query("""
        SELECT ctsp FROM ChiTietSanPham ctsp
        WHERE ctsp.trangThai = :trangThai
        AND (
            ctsp.tenChiTietSanPham LIKE %:keyword% 
            OR ctsp.mauSac.tenMauSac LIKE %:keyword%
            OR ctsp.size.tenSize LIKE %:keyword%
            OR ctsp.chatLieu.tenChatLieu LIKE %:keyword%
            OR ctsp.deGiay.tenDeGiay LIKE %:keyword%
        )
    """)
    Page<ChiTietSanPham> findByTrangThai(
            @Param("trangThai") Boolean trangThai,
            @Param("keyword") String keyword,
            Pageable pageable);

}

