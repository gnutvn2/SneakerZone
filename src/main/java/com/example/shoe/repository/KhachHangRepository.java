package com.example.shoe.repository;

import com.example.shoe.entity.KhachHang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang, Integer> {
    @Query("""
            SELECT kh FROM KhachHang kh
            WHERE kh.maKhachHang like %:keyword%
            OR kh.hoTen like %:keyword%
            OR kh.diaChi like %:keyword%
            OR kh.soDienThoai like %:keyword%
            OR kh.email like %:keyword%
            """)
    Page<KhachHang> searchKhachHang(String keyword, Pageable pageable);
}
