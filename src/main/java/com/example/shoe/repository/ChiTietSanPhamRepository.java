package com.example.shoe.repository;

import com.example.shoe.entity.ChiTietSanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChiTietSanPhamRepository extends JpaRepository<ChiTietSanPham, Integer> {
    //Tim kiem chi tiet san pham
    @Query("""
            SELECT ctsp FROM ChiTietSanPham ctsp
            WHERE ctsp.maChiTietSanPham like %:keyword%
            or ctsp.tenChiTietSanPham like %:keyword%
            or ctsp.sanPham.tenSanPham like %:keyword%
            or ctsp.mauSac.tenMauSac like %:keyword%
            or ctsp.size.tenSize like %:keyword%
            or ctsp.deGiay.tenDeGiay like %:keyword%
            or ctsp.chatLieu.tenChatLieu like %:keyword%
            """)
    Page<ChiTietSanPham> searchChiTietSanPham(@Param("keyword") String keyword, Pageable pageable);

    // Lọc sản phẩm chi tiết
    @Query("SELECT c FROM ChiTietSanPham c WHERE (:sanPhamId IS NULL OR c.sanPham.id = :sanPhamId) " +
            "AND (:sizeId IS NULL OR c.size.id = :sizeId) " +
            "AND (:mauSacId IS NULL OR c.mauSac.id = :mauSacId) " +
            "AND (:chatLieuId IS NULL OR c.chatLieu.id = :chatLieuId) " +
            "AND (:deGiayId IS NULL OR c.deGiay.id = :deGiayId) " +
            "AND (:giaMin IS NULL OR c.gia >= :giaMin) " +
            "AND (:giaMax IS NULL OR c.gia <= :giaMax)")
    Page<ChiTietSanPham> locChiTietSanPham(@Param("sanPhamId") Integer sanPhamId,
                                              @Param("sizeId") Integer sizeId,
                                              @Param("mauSacId") Integer mauSacId,
                                              @Param("chatLieuId") Integer chatLieuId,
                                              @Param("giaMin") Double giaMin,
                                              @Param("giaMax") Double giaMax,
                                              @Param("deGiayId") Integer deGiayId,
                                              Pageable pageable);
}
