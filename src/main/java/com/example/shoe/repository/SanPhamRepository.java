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

    @Query("""
            select sp
            from SanPham sp
            where sp.maSanPham like %:keyword%
            or sp.tenSanPham like %:keyword%
            or sp.danhMuc.tenDanhMuc like %:keyword%
            or sp.thuongHieu.tenThuongHieu like %:keyword%
            """)
    Page<SanPham> search(@Param("keyword") String keyword, Pageable pageable);

}
