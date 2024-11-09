package com.example.shoe.repository;

import com.example.shoe.entity.ChiTietHoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChiTietHoaDonRepository extends JpaRepository<ChiTietHoaDon, Integer> {
    List<ChiTietHoaDon> findAllByHoaDonId(Integer hoaDonId);

    @Query("SELECT c FROM ChiTietHoaDon c WHERE c.hoaDon.id = :hoaDonId AND c.chiTietSanPham.id = :chiTietSanPhamId")
    Optional<ChiTietHoaDon> findByHoaDonIdAndChiTietSanPhamId(
            @Param("hoaDonId") Integer hoaDonId,
            @Param("chiTietSanPhamId") Integer chiTietSanPhamId
    );
}
